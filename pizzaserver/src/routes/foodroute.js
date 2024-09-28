import express from 'express';
import { authMiddleware, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

// Protected route example
router.get('/orders', authMiddleware, authorize('view', 'Order'), (req, res) => {
    // Logic to fetch orders from the database
    res.json({ message: 'Orders fetched successfully', user: req.user });
});

router.post('/orders', authMiddleware, authorize('manage', 'Order'), (req, res) => {
    // Logic to create an order
    res.json({ message: 'Order created successfully' });
});

export default router;