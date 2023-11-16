const { carts } = require('../models')
const prisma = require('../libs/prisma')

module.exports = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;

            const existingCartItem = await prisma.cart.findFirst({
                where: {
                    user_id: userId,
                    product_id: productId,
                },
            });            

            if (existingCartItem) {
                await prisma.cart.update({
                    where: {
                        id: existingCartItem.id,
                    },
                    data: {
                        quantity: existingCartItem.quantity + quantity,
                    },
                });
            } else {
                await prisma.cart.create({
                    data: {
                        user_id: userId,
                        product_id: productId,
                        quantity,
                    },
                });
            }
    
            return res.status(200).json({
                success: 'Product added to cart successfully.',
            });
        } catch (error) {
            console.error('Error adding product to cart:', error);
    
            return res.status(500).json({
                error: 'An error occurred while adding the product to the cart.',
            });
        }
    },

    getUserCart: async (req, res) => {
        try {
            const carts = await prisma.cart.findMany();
            res.json(carts);
        } catch (error) {
            console.error('Error getting user cart:', error);
            return res.status(500).json({ 
                error: 'An error occurred while getting your cart.' 
            })
        }
      },

    
    getUserCartById: async (req, res) => {
        try {
        const userId = req.params.userId; 
        const userCart = await prisma.cart.findMany({
            where: {
            user_id: parseInt(userId), 
            },
            include: {
                user: true,     
                product: true,   
            },
        });
    
        res.json(userCart);
        } catch (error) {
        console.error('Error getting user cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

