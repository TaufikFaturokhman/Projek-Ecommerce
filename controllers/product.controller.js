const {product_image,product_variants,product_variant_values,products} =  require('../models');
const prisma = require('../libs/prisma')

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
    },
    getProduct : async (req,res) => {
        try{
            const data = await products.findMany()
            
            return res.status(200).json({
                success : 'true',
                data: data
            })
        }
        catch (err){
            console.error (`Error get data product : ${err}`)
            return res.status(500).json({
                error:`An error occured while get data product`
            })
        }
    },
    getProductId : async (req,res) => {
        try{
            const data = await product.findFirst({
                where:{
                    id:parseInt(req.body.id)
                }
            })
            if (data){
                return res.status(200).json({
                    success:true,
                    data: data
                })
            }
            return res.status(500).json({
                success:false,
            })
        }
        catch (err){
            console.error (`Error get data product by id : ${err}`)
            return res.status(500).json({
                error:`An error occured while get data product by id`
            })
        }
    },
    deleteProduct : async (req,res) => {
        try{
            const id = parseInt(req.params.id)
            const process = product.delete({
                where:{
                    id:id
                }
            })
            if (process){
                return res.status(200).json({
                    success : "success to delete data"
                })
            }
            return res.status(500).json({
                succes:false
            })
        }
        catch (err){
            console.error (`Error deleting the data product : ${err}`)
            return res.status(500).json({
                error:`An error occured while deleting the data product`
            })
        }
    },
    updateProduct : async (req,res) => {
        try{
            const id = parseInt(req.params.id)
            const process = await prisma.product.update({
                where:{
                    id:id
                },
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
            if (process){
                return res.status(200).json({
                    success: "success to updating the data"
                })
            }
            return res.status(500).json({
                success: false
            })
        }
        catch (err){
            console.error (`Error updating the data product : ${err}`)
            return res.status(500).json({
                error:`An error occured while updating the data product`
            })
        }
    },
    addVariant : async (req,res) =>{
        try{
            const process = await product_variants.create({
                data:{
                    name : req.body.name,
                    product_id : parseInt(req.body.product_id)
                }
            })
            if (process){
                return res.status(200).json({
                    success: "success to updating data product variant",
                })
            }
            return res.status(500).json({
                success: false
            })
        }
        catch (err){
            console.error (`Error adding the data product variant : ${err}`)
            return res.status(500).json({
                error:`An error occured while adding the data product variant`
            })
        }
    },
    getVariant : async (req,res) =>{
        try{
            const data = product_variants.findMany({})
            if (data){
                return res.status(200).json({
                    success : true,
                    data : data
                })
            }
            return res.status(500).json({
                success : false
            })
        }
        catch(err){
            console.error (`Error getting the data product variant : ${err}`)
            return res.status(500).json({
                error:`An error occured while getting the data product variant`
            })
        }
    },
    getVariantById : async (req,res) =>{
        try{
            const id = parseInt(req.params.id)
            const data = await product_variants.findFirst({
                where:{
                    id:id
                }
            })
            if(data){
                return res.status(200).json({
                    success:true,
                    data: data
                })
            }
            return res.status(500).json({
                success:false
            })
        }
        catch(err){
            console.error (`Error getting the data product variant by id : ${err}`)
            return res.status(500).json({
                error:`An error occured while getting the data product variant by id`
            })
        }
    },
    updateVariant : async (req,res) => {
        try{
            const id = parseInt(req.params.id)
            const process = await product_variants.update({
                where:{
                    id:id
                },
                data:{
                    name : req.body.name,
                    product_id : parseInt(req.body.product_id)
                }
            })
            if(process){
                return res.status(200).json({
                    succeess: "succes to updating the data Product Variant"
                })
            }
            res.status(500).json({
                success : false
            })
        }
        catch (err){
            console.error (`Error updating the data product variant: ${err}`)
            return res.status(500).json({
                error:`An error occured while updating the data product variant `
            })
        }
    },
    deleteVariant : async(req,res) =>{
        try{
            const id = parseInt(req.params.id)
            const process = await product_variants.delete({
                where:{
                    id:id
                }
            })
            if(process){
                return res.status(200).json({
                    success: "success deleting the product variant"
                })
            }
            return res.status(500).json({
                success:false
            })
        }
        catch (err){
            console.error (`Error deleting the data product variant: ${err}`)
            return res.status(500).json({
                error:`An error occured while deleting the data product variant `
            })
        }
    }
}