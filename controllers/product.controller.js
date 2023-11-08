const {product_image,product_variants,product_variant_values,products} =  require('../models');

module.exports ={
    addProduct : async (req,res) => {
        try{
            const process = await products.create({
                data:{
                    name:req.body.name,
                    description: req.body.description,
                    condition : req.body.condition,
                    weight : parseFloat(req.body.condition),
                    price : parseFloat(req.body.price),
                    discountPrice : parseFloat(req.body.discountPrice),
                    taxPrice : parseFloat(req.body.taxPrice),
                    stockQuantity : parseInt(req.body.stockQuantity),
                    category_id : parseInt(req.body.category_id)
                }
            })

            return res.status(200).json({success: "Product Added Successfully"})
        }
        catch (err){
            console.error (`Error adding product : ${err}`)
            return res.status(500).json({
                error:`An error occured while adding the product`
            })
        }
    }
}