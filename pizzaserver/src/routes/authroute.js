const express = require('express')
const { registerUser, loginUser, deleteUser, updateUser, getAllUser } = require('../controller/user')
const {authMiddleware,authorize}=require('../middleware/middleware')
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)

// Get all users (admin only)
router.get('/', authMiddleware,getAllUser)

// Update a user
router.put('/:id', authMiddleware, authorize('manage', 'User'),updateUser)

// Delete a user
router.delete('/:id', authMiddleware, authorize('manage', 'User'),deleteUser)


module.exports=router