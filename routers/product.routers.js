const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/product.controller')

router.post('/addProduct', controller.addProduct)
router.get('/getProduct', controller.getProduct)
router.get('/getProductById/:id', controller.getProductId)
router.put('/updateProduct', controller.updateProduct)
router.delete('/deleteProduct', controller.deleteProduct)

router .post('/addVariant',controller.addVariant)
router.get('/getVariant', controller.getVariant)
router.get('/getVariantById/:id', controller.getVariantById)
router.put('/updateVariant', controller.updateVariant)
router.delete('/deleteVariant', controller.deleteVariant)

module.exports = router