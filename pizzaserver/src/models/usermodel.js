const db = require("../libs/db");

const createUser=async(email,password,role,phone,location,action)=>{
    const result=await db.query(
        'INSERT INTO users (email,password,role,phone,location,action) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[email,password,role,phone,location,action]
    );
    return result.rows[0]
}

const findUserByEmail=async(email)=>{
    const result=await db.query('SELECT * FROM users WHERE email=$1',[email])
    return result.rows[0]
}


const getAllUsers = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
};

const updateUsers = async (id, userData) => {
    const { name, email, role, phone, location, action } = userData;
    const result = await db.query(
        'UPDATE users SET name=$1, email=$2, role=$3, phone=$4, location=$5, action=$6 WHERE id=$7 RETURNING *',
        [name, email, role, phone, location, action, id]
    );
    return result.rows[0];
};

const deleteUsers = async (id) => {
    const result = await db.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
};


module.exports={createUser,findUserByEmail,getAllUsers,updateUsers,deleteUsers}
