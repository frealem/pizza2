const {authMiddleware,authorize}=require('../middleware/middleware')
const {CreateFood, GetAllFood, GetFood, UpdateFood, DeleteFood}=require('../controller/food')
const express=require('express')

const router = express.Router();

// food create route

router.post('/', authMiddleware, authorize('create'),CreateFood);
router.get('/', authMiddleware, authorize('read'),GetAllFood);
router.get('/:id', authMiddleware, authorize('read'),GetFood);
router.put('/:id', authMiddleware, authorize('update'),UpdateFood);
router.delete('/:id', authMiddleware, authorize('delete'),DeleteFood);
module.exports=router;