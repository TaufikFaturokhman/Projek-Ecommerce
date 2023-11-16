const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/cart.controller')

router.post('/add-to-cart', controller.addToCart)
router.get('/my-cart', controller.getUserCart)   
router.get('/my-cart/:userId', controller.getUserCartById)   
router.post('/delete-from-mycart/:userId/:cartId', controller.removeFromCart)
router.delete('/clear-cart/:userId', controller.clearCart)

module.exports = router