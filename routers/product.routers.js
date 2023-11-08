const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/product.controller')

router.post('/addProduct', controller.addProduct)
router.get('/getProduct', controller.getProduct)
router.get('/getProductById/:id', controller.getProductId)
router.put('/updateProduct', controller.updateProduct)
router.delete('/deleteProduct', controller.deleteProduct)

module.exports = router