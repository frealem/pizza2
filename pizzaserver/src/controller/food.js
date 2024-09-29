const db = require("../libs/db");

// create foods
const CreateFood= async (req, res) => {
    const { name, topping,image,price } = req.body;
    const created_by=req.user.id;
    try {
        console.log('createdby is:',created_by)
        const result = await db.query('INSERT INTO foods (name,topping,image,price,created_by) VALUES ($1, $2,$3, $4,$5) RETURNING *', [name,topping,image,price,created_by]);
        res.status(200).json(result.rows[0]);
       
    }
     catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }}

    // get one foods
const GetFood= async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM foods WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
   
}

const GetAllFood=async (req, res) => {
    const { sortBy, createdBy } = req.query;

    try {
        const orderBy = sortBy ? `ORDER BY created_at ${sortBy}` : '';
        const filterBy = createdBy ? `WHERE created_by = '${createdBy}'` : '';
        const result = await db.query(`SELECT * FROM foods ${filterBy} ${orderBy}`);
        res.status(200).json(result.rows); 
    } catch (error) {
      res.status(500).json({ error: error.message })
    } 
}

const UpdateFood=async (req, res) => {
    const { id } = req.params;
    const { name, topping, price, image } = req.body;

    try {
        const result = await db.query(
            'UPDATE foods SET name = $1, topping = $2, price = $3, image = $4 WHERE id = $5 RETURNING *',
            [name, topping, price, image, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeleteFood=async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM foods WHERE id = $1', [id]);
       res.status(204).json('successfully deleted!');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
   
    await db.query('DELETE FROM foods WHERE id = $1', [id]);
    res.sendStatus(204);
}
    
   

module.exports={CreateFood,GetFood,GetAllFood,UpdateFood,DeleteFood}