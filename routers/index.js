const express = require('express'),
    router = express.Router(),
    cartRouter = require('./cart.routers')

router.use('/cart', cartRouter);

module.exports = router