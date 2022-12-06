import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import userRoutes from './routes/user.js';
import salesRoutes from './routes/sales.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';

import User from './model/User.js';
import Product from './model/Product.js';
import ProductStat from './model/ProductStat.js';
import Transaction from './model/Transaction.js';
import OverallStat from './model/OverallStat.js';
import AffiliateStat from './model/AffiliateStat.js';

import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
} from './data/index.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }    
)
.then(() => {
    app.listen(PORT, () => console.log(`Running on port: http://localhost:${PORT}`))
})
.catch((error) => console.log(`${error} did not connect.`));