const {z} =require('zod')

const foodSchema=z.object({
    name:z.string(),
    topping:z.string(),
    price:z.string(),
    image:z.string(),
})

module.exports=foodSchema