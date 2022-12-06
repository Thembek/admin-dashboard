import OverallStat from '../model/OverallStat.js';
import express from 'express';
const router = express.Router();

router.get('/sales', async (req, res) => {
    try{
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;