const express = require('express'),
    router = express.Router(),
    cartRouter = require('./cart.routers'),
    productRouter = require('./product.routers')

router.use('/cart', cartRouter);
router.use('/product', productRouter)

module.exports = router