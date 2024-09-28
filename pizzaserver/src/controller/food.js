const db = require("../libs/db");

// create foods
const createfood= async (req, res) => {
    const { name, topping,image,price } = req.body;
    const result = await db.query('INSERT INTO foods (name,topping,image,price) VALUES ($1, $2) RETURNING *', [name,topping,image,price]);
    res.json(result.rows[0]);
}

module.exports={createfood}