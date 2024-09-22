const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=require('../schema/userschema');
const {createUser,findUserByEmail}=require('../models/usermodel')

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
      const user = await createUser(validatedData.email, hashedPassword, role,validatedData.phone,action);
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

module.exports= {registerUser,loginUser};