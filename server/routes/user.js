import User from '../model/User.js';
import Product from '../model/Product.js';
import Transaction from '../model/Transaction.js';
import ProductStat from '../model/ProductStat.js';
import getCounrtyIso3 from 'country-iso-2-to-3';
import express from 'express';
const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();

        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product.doc,
                    stat,
                };
            })
        );

        res.status(200).json(productWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/customers', async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/transactions', async (req, res) => {
    try{
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };
            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
         .sort(sortFormatted)
         .skip(page * pageSize)
         .limit(pageSize)

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            transactions,
            total,
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.get('/geography', );

export default router;