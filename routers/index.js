const express = require('express'),
    router = express.Router(),
    cartRouter = require('./cart.routers'),
    productRouter = require('./product.routers'),
    authUser = require('./authUser')

router.use('/cart', cartRouter);
router.use('/product', productRouter)
router.use('/auth', authUser)

module.exports = router