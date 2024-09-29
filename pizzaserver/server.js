const express = require('express');
const cors = require('cors');
const authrouter=require('./src/routes/authroute')
const foodrouter=require('./src/routes/foodroute')
const orderRouter=require('./src/routes/orderroute')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/user',authrouter)
app.use('/api/food',foodrouter)
app.use('/api/order',orderRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});