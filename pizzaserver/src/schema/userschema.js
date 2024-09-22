const {z} =require('zod')

const userSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    role:z.enum(['superadmin','manager','customer']).optional(),
    phone:z.string(),
    location:z.string(),
    action:z.boolean().optional()
})

module.exports=userSchema