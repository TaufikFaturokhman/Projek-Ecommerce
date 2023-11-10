const { product_image, product_variants, product_variant_values, products } = require('../models');
const prisma = require('../libs/prisma');

module.exports = {
    addProduct: async (req, res) => {
        try {
            const process = await products.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    condition: req.body.condition,
                    weight: parseFloat(req.body.weight),
                    price: parseFloat(req.body.price),
                    discountPrice: parseFloat(req.body.discountPrice),
                    taxPrice: parseFloat(req.body.taxPrice),
                    stockQuantity: parseInt(req.body.stockQuantity),
                    category_id: parseInt(req.body.category_id)
                }
            });

            return res.status(200).json({ success: "Product Added Successfully" });
        } catch (err) {
            console.error(`Error adding product : ${err}`);
            return res.status(500).json({
                error: `An error occurred while adding the product`
            });
        }
    },
    getProduct: async (req, res) => {
        try {
            const data = await products.findMany();

            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (err) {
            console.error(`Error getting data product : ${err}`);
            return res.status(500).json({
                error: `An error occurred while getting data product`
            });
        }
    },
    getProductId: async (req, res) => {
        try {
            const data = await products.findFirst({
                where: {
                    id: parseInt(req.body.id)
                }
            });
            if (data) {
                return res.status(200).json({
                    success: true,
                    data: data
                });
            }
            return res.status(500).json({
                success: false,
            });
        } catch (err) {
            console.error(`Error getting data product by id : ${err}`);
            return res.status(500).json({
                error: `An error occurred while getting data product by id`
            });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const process = await products.delete({
                where: {
                    id: id
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to delete data"
                });
            }
            return res.status(500).json({
                succes: false
            });
        } catch (err) {
            console.error(`Error deleting the data product : ${err}`);
            return res.status(500).json({
                error: `An error occurred while deleting the data product`
            });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const process = await products.update({
                where: {
                    id: id
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    condition: req.body.condition,
                    weight: parseFloat(req.body.condition),
                    price: parseFloat(req.body.price),
                    discountPrice: parseFloat(req.body.discountPrice),
                    taxPrice: parseFloat(req.body.taxPrice),
                    stockQuantity: parseInt(req.body.stockQuantity),
                    category_id: parseInt(req.body.category_id)
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to updating the data"
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product : ${err}`);
            return res.status(500).json({
                error: `An error occurred while updating the data product`
            });
        }
    },
    addVariant: async (req, res) => {
        try {
            const process = await product_variants.create({
                data: {
                    name: req.body.name,
                    product_id: parseInt(req.body.product_id)
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to updating data product variant",
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error adding the data product variant : ${err}`);
            return res.status(500).json({
                error: `An error occurred while adding the data product variant`
            });
        }
    },
    getVariant: async (req, res) => {
        try {
            const data = product_variants.findMany({})
            if (data) {
                return res.status(200).json({
                    success: true,
                    data: data
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error getting the data product variant : ${err}`);
            return res.status(500).json({
                error: `An error occurred while getting the data product variant`
            });
        }
    },
    getVariantById: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const data = await product_variants.findFirst({
                where: {
                    id: id
                }
            });
            if (data) {
                return res.status(200).json({
                    success: true,
                    data: data
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error getting the data product variant by id : ${err}`);
            return res.status(500).json({
                error: `An error occurred while getting the data product variant by id`
            });
        }
    },
    updateVariant: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const process = await product_variants.update({
                where: {
                    id: id
                },
                data: {
                    name: req.body.name,
                    product_id: parseInt(req.body.product_id)
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to updating the data Product Variant"
                });
            }
            res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product variant: ${err}`);
            return res.status(500).json({
                error: `An error occurred while updating the data product variant `
            });
        }
    },
    deleteVariant: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const process = await product_variants.delete({
                where: {
                    id: id
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success deleting the product variant"
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error deleting the data product variant: ${err}`);
            return res.status(500).json({
                error: `An error occurred while deleting the data product variant `
            });
        }
    },
    addProductVariantValue: async (req, res) => {
        try {
            const productVariantValues = await product_variant_values.create({
                data: {
                    value: req.body.value,
                    price: parseFloat(req.body.price),
                    stockQuantity: parseInt(req.body.stockQuantity),
                    product_variant_id: parseInt(req.body.product_variant_id)
                }
            });
            return res.status(200).json({ success: 'Product Variant Value Added Successfully' });
        } catch (err) {
            console.error(`Error adding product variant value: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while adding the product variant value'
            });
        }
    },

    getProductVariantValues: async (req, res) => {
        try {
            const productVariantValues = await product_variant_values.findMany();
            return res.status(200).json({ success: true, data: productVariantValues });
        } catch (err) {
            console.error(`Error getting product variant values: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while getting product variant values'
            });
        }
    },

    getProductVariantValueById: async (req, res) => {
        try {
            const productVariantValueId = parseInt(req.params.id);
            const productVariantValue = await product_variant_values.findUnique({
                where: { id: productVariantValueId }
            });
            if (productVariantValue) {
                return res.status(200).json({ success: true, data: productVariantValue });
            } else {
                return res.status(404).json({ success: false, message: 'Product Variant Value not found' });
            }
        } catch (err) {
            console.error(`Error getting product variant value by ID: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while getting product variant value by ID'
            });
        }
    },

    updateProductVariantValue: async (req, res) => {
        try {
            const productVariantValueId = parseInt(req.params.id);
            const updatedProductVariantValue = await product_variant_values.update({
                where: { id: productVariantValueId },
                data: {
                    value: req.body.value,
                    price: parseFloat(req.body.price),
                    stockQuantity: parseInt(req.body.stockQuantity),
                    product_variant_id: parseInt(req.body.product_variant_id)
                }
            });
            if (updatedProductVariantValue) {
                return res.status(200).json({ success: 'Product Variant Value successfully updated' });
            } else {
                return res.status(404).json({ success: false, message: 'Product Variant Value not found' });
            }
        } catch (err) {
            console.error(`Error updating product variant value: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while updating the product variant value'
            });
        }
    },

    deleteProductVariantValue: async (req, res) => {
        try {
            const productVariantValueId = parseInt(req.params.id);
            const deletedProductVariantValue = await product_variant_values.delete({
                where: { id: productVariantValueId }
            });
            if (deletedProductVariantValue) {
                return res.status(200).json({ success: 'Product Variant Value successfully deleted' });
            } else {
                return res.status(404).json({ success: false, message: 'Product Variant Value not found' });
            }
        } catch (err) {
            console.error(`Error deleting product variant value: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while deleting the product variant value'
            });
        }
    },
    uploadImages: async (req, res) => {
        try {
            const process = await product_image.create({
                data: {
                    path: req.body.path,
                    product_id: parseInt(req.body.product_id)
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to add product image"
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error adding the product image : ${err}`);
            return res.status(500).json({
                error: `An error occurred while adding the product image`
            });
        }
    },

    getImages: async (req, res) => {
        try {
            const productImages = await product_image.findMany();
            return res.status(200).json({ success: true, data: productImages });
        } catch (err) {
            console.error(`Error getting product images: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while getting product images'
            });
        }
    },

    getImagesId: async (req, res) => {
        try {
            const productImageId = parseInt(req.params.id);
            const productImage = await product_image.findUnique({
                where: { id: productImageId }
            });
            if (productImage) {
                return res.status(200).json({ success: true, data: productImage });
            } else {
                return res.status(404).json({ success: false, message: 'Product Image not found' });
            }
        } catch (err) {
            console.error(`Error getting product image by ID: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while getting product image by ID'
            });
        }
    },

    updateImages: async (req, res) => {
        try {
            const productImageId = parseInt(req.params.id);
            const updatedProductImage = await product_image.update({
                where: { id: productImageId },
                data: {
                    path: req.body.path,
                    product_id: parseInt(req.body.product_id)
                }
            });
            if (updatedProductImage) {
                return res.status(200).json({ success: 'Product Image successfully updated' });
            } else {
                return res.status(404).json({ success: false, message: 'Product Image not found' });
            }
        } catch (err) {
            console.error(`Error updating product image: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while updating the product image'
            });
        }
    },

    deleteImages: async (req, res) => {
        try {
            const productImageId = parseInt(req.params.id);
            const deletedProductImage = await product_image.delete({
                where: { id: productImageId }
            });
            if (deletedProductImage) {
                return res.status(200).json({ success: 'Product Image successfully deleted' });
            } else {
                return res.status(404).json({ success: false, message: 'Product Image not found' });
            }
        } catch (err) {
            console.error(`Error deleting product image: ${err}`);
            return res.status(500).json({
                error: 'An error occurred while deleting the product image'
            });
        }
    }
};

