const {
  product_image,
  product_variants,
  product_variant_values,
  products,
  categories,
} = require("../models");
const prisma = require("../libs/prisma");
const imageKit = require("../libs/imageKit");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        condition,
        weight,
        price,
        discountPrice,
        taxPrice,
        stockQuantity,
        category_id,
      } = req.body;
      const variants = JSON.parse(req.body.variants);
      //upload images
      const convertToString = req.file.buffer.toString("base64");

      const uploadFile = await imageKit.upload({
        fileName: req.file.originalname,
        file: convertToString,
      });

      // Create product
      const createdProduct = await prisma.product.create({
        data: {
          name,
          description,
          condition,
          weight: parseFloat(weight),
          price: parseFloat(price),
          discountPrice: parseFloat(discountPrice),
          taxPrice: parseFloat(taxPrice),
          stockQuantity: parseInt(stockQuantity),
          category_id: parseInt(category_id),
          productVariants: {
            create: variants.map((variant) => ({
              name: variant.name,
              variantValues: {
                create: variant.values.map((value) => ({
                  value: value.value,
                  price: value.price,
                  stockQuantity: value.stockQuantity,
                })),
              },
            })),
          },
          images: {
            create: {
              path: uploadFile.url.toString(),
            },
          },
        },
        include: {
          productVariants: {
            include: {
              variantValues: true,
            },
          },
          images: true,
        },
      });

      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          productVariants: {
            include: {
              variantValues: true,
            },
          },
          images: true,
        },
      });

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  editProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const {
        name,
        description,
        condition,
        weight,
        price,
        discountPrice,
        taxPrice,
        stockQuantity,
        category_id,
        variants,
      } = req.body;

      // Delete existing variants and variant values
      await prisma.productVariantValue.deleteMany({
        where: {
          productVariant: {
            product: { id: productId },
          },
        },
      });

      await prisma.productVariant.deleteMany({
        where: {
          product: { id: productId },
        },
      });

      // Update product details
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          condition,
          weight,
          price,
          discountPrice,
          taxPrice,
          stockQuantity,
          category_id,
          productVariants: {
            create: variants.map((variant) => ({
              name: variant.name,
              variantValues: {
                create: variant.values.map((value) => ({
                  value: value.value,
                  price: value.price,
                  stockQuantity: value.stockQuantity,
                })),
              },
            })),
          },
        },
        include: {
          productVariants: {
            include: {
              variantValues: true,
            },
          },
          images: true,
        },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getDataById: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          productVariants: {
            include: {
              variantValues: true,
            },
          },
          images: true,
        },
      });

      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteData : async(req,res)=>{
    try {
      const productId = parseInt(req.params.id);
  
      // Delete product along with its variants and variant values
      await prisma.productVariantValue.deleteMany({
        where: {
          productVariant: {
            product: { id: productId },
          },
        },
      });
  
      await prisma.productVariant.deleteMany({
       where:{
        product : { id: productId }
       }
      });
      
      await prisma.productImage.deleteMany({
        where: {
          product: { id: productId },
        },
      });

      await prisma.product.delete({
        where: { id: productId },
      });
  
      res.status(200).json({success:"data was successfully deleted"}); // 204 No Content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
