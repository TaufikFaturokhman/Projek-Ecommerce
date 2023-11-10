const { carts } = require('../models')
const prisma = require('../libs/prisma')

module.exports = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            
            const products = await prisma.products.findUnique({
                where: { id: productId }
            })

            if(!products) {
                return res.status(404).json({
                    error: 'Product not found.' 
                })
            }

            const existingCartProduct = await prisma.cart.findUnique({
                where: { userId, productId }
                })
                
                if (existingCartProduct) {
                await prisma.cart.update({
                    where: { id: existingCartProduct.id },
                    data: { quantity: existingCartProduct.quantity + quantity }
                })
                } else {
                    await prisma.cart.create({
                        data: {
                        userId,
                        productId,
                        quantity
                        }
                    })
                }

                return res.status(200).json({ 
                    success: 'Product added to cart successfully.' 
                })

        } catch (error) {
            console.error('Error adding product to cart:', error)

            return res.status(500).json({
                error: 'An error occurred while adding the product to the cart.'
            })
        }
    },

    getUserCart: async (userId) => {
        try {
            const userId = req.params.userId;

            const cartItems = await prisma.cart.findMany({
                where: { userId },
                include: {
                product: true,
                }
            })

            return res.status(200).json(cartItems)

            } catch (error) {
                console.error('Error getting user cart:', error);
                return res.status(500).json({ 
                    error: 'An error occurred while getting your cart.' 
                })
            }
        },

    removeFromCart: async (userId, cartId) => {
        try {
            const userId = req.params.userId;
            const cartId = req.params.cartId;

            const cartProduct = await prisma.cart.findUnique({
                where: { id: cartId, userId },
            })

            if (!cartProduct) {
                return res.status(404).json({ 
                    error: 'Cart item not found.' 
                })
            }

            await prisma.cart.delete({
                where: { id: cartProduct.id },
            })

            return res.status(200).json({ 
                success: 'Product removed to cart.' 
            })

            } catch (error) {
                console.error('Error removing product from cart:', error);
            
                return res.status(500).json({ 
                    error: 'An error occurred while removing the product from the cart.' 
                })
            }
        },

        clearCart: async (userId) => {
            try {
                const userId = req.params.userId;

                await prisma.cart.deleteMany({
                    where: { userId },
                })

                return res.status(200).json({ 
                    success: 'Cart cleared successfully.' 
                })

            } catch (error) {
                console.error('Error clearing cart:', error)

                return res.status(500).json({ 
                    error: 'An error occurred while clearing the cart.' 
                })
            }
        }
    }

