const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=require('../schema/userschema');
const {createUser,findUserByEmail, getAllUsers, updateUsers, deleteUsers}=require('../models/usermodel')

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const registerUser = async (req, res) => {
    try {
      const validatedData = userSchema.parse(req.body);
      const role = validatedData.role || 'customer'; 
      const action=validatedData.action || false;
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await createUser(validatedData.email, hashedPassword, role,validatedData.phone,validatedData.location,action);
      res.status(201).json({ user });
      console.log('successful registeration')

    } catch (error) {
      res.status(400).json({ error: error.errors });
      console.log(error)
    }
  };


  const loginUser = async (req, res) => {
    const user = await findUserByEmail(req.body.email);
    if (user && await verifyPassword(req.body.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
      console.log("successful login")
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  const getAllUser= async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}
const updateUser=async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
      const updatedUser = await updateUsers(id, userData);
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
  }
}
const deleteUser=async (req, res) => {
  const { id } = req.params;

    try {
        const deletedUser = await deleteUsers(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

module.exports= {registerUser,loginUser,getAllUser,updateUser,deleteUser};