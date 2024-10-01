const { authMiddleware, authorize } = require('../middleware/middleware');
const { CreateFood, GetAllFood, GetFood, UpdateFood, DeleteFood } = require('../controller/food');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', authMiddleware, upload.array('images'), CreateFood);
router.get('/', authMiddleware, authorize('read'), GetAllFood);
router.get('/:id', authMiddleware, authorize('read'), GetFood);
router.put('/:id', authMiddleware, authorize('update'), UpdateFood);
router.delete('/:id', authMiddleware, authorize('delete'), DeleteFood);

module.exports = router;