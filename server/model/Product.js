import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: String,
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;