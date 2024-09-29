const db = require("../libs/db");

// create order
const CreateOrder= async (req, res) => {
    const {food_id,status,quantity,total_price} = req.body;
    const customer_id=req.user.id;
    
    try {
        console.log('customer is:',customer_id)
        const result = await db.query('INSERT INTO orders (customer_id,food_id,status,quantity,total_price) VALUES ($1, $2,$3, $4,$5) RETURNING *', [customer_id,food_id,status,quantity,total_price]);
        res.status(200).json(result.rows[0]);
       
    }
     catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }}

    // get one orders

    const GetAllOrders = async (req, res) => {
        const currentUser = req.user.id;
    
        try {
            // Get all orders for the current user as a customer
            const customerOrders = await db.query('SELECT * FROM orders WHERE customer_id = $1', [currentUser]);
    
            // Get all foods created by the current user
            const foods = await db.query('SELECT id FROM foods WHERE created_by = $1', [currentUser]);
            
            let managerOrders = [];
            if (foods.rows.length > 0) {
                const foodIds = foods.rows.map(food => food.id);
                managerOrders = await db.query('SELECT * FROM orders WHERE food_id = ANY($1::int[])', [foodIds]);
            }
    
            // Combine results
            const allOrders = {
                customerOrders: customerOrders.rows,
                managerOrders: managerOrders.rows
            };
    
            // Send response
            res.status(200).json(allOrders);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
//  update the status
const UpdateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const currentUser = req.user.id;
    
    try {
        // Check if the order exists and get the created_by field
        const orderResult = await db.query('SELECT created_by FROM foods WHERE id = (SELECT food_id FROM orders WHERE id = $1)', [id]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const manager_id = orderResult.rows[0].created_by;

        // Check if the current user is the manager
        if (manager_id === currentUser) {
            const result = await db.query(
                'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
                [status, id]
            );
            res.json(result.rows[0]);
            console.log('Successful update');
        } else {
            res.status(403).json({ message: 'Unauthorized to update this order' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    
   

module.exports={CreateOrder,GetAllOrders,UpdateOrder}