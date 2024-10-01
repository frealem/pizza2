const cloudinary = require("../libs/cloudinaryConfig");
const db = require("../libs/db");

// create foods
 // Adjust path as needed

 const CreateFood = async (req, res) => {
    const { name, topping, price } = req.body; // topping will be a JSON string
    const created_by = req.user.id;

    try {
        // Check if images were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required.' });
        }

        // Array to hold image URLs
        const imageUrls = [];

        // Create an array of promises for uploading images
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: 'images' // Optional
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return reject(error); // Reject the promise on error
                    }
                    imageUrls.push(result.secure_url); // Push the secure URL to the array
                    resolve(); // Resolve the promise
                });

                // Create a stream to upload the image
                uploadStream.end(file.buffer); // Use buffer for in-memory files
            });
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // Insert food data into the database
        const result = await db.query(
            'INSERT INTO foods (name, topping, image, price, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, JSON.parse(topping), JSON.stringify(imageUrls), price, created_by] // Store toppings as a JSON array
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

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