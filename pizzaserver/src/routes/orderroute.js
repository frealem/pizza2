const { CreateOrder, GetAllOrders, UpdateOrder } = require('../controller/orders');
const {authMiddleware,authorize}=require('../middleware/middleware')

const express=require('express')

const router = express.Router();

// food create route

router.post('/', authMiddleware,CreateOrder);
router.get('/', authMiddleware, authorize('read'),GetAllOrders);

router.patch('/:id', authMiddleware, authorize('update'),UpdateOrder);
module.exports=router;