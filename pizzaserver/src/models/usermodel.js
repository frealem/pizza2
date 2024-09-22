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

module.exports={createUser,findUserByEmail}