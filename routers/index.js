const express = require('express'),
    router = express.Router(),
    cartRouter = require('./cart.routers')

router.use('/cart', userRouter);

module.exports = router