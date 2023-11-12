const express = require('express');
    const router = express.Router();
    const multer = require ('multer')();
    const controller = require('../controllers/product.controller');
    const controller2 = require('../controllers/product.controller.AIO')
//one endpoint but one handle to make data product,product_variant,product_variant_values,product_images
router.post('/addProduct1',multer.single('image')  , controller2.addProduct);
router.get('/getProduct1', controller2.getProduct);
router.get('/getProductById1/:id', controller2.getDataById);
router.put('/editProduct1/:id', controller2.editProduct);


//single handle to make data product,product_variant,product_variant_values,product_images
router.post('/addProduct', controller.addProduct);
router.get('/getProduct', controller.getProduct);
router.get('/getProductId/:id', controller.getProductId);
router.put('/updateProduct/:id', controller.updateProduct);
router.delete('/deleteProduct/:id', controller.deleteProduct);

router.post('/addVariant', controller.addVariant);
router.get('/getVariant', controller.getVariant);
router.get('/getVariantById/:id', controller.getVariantById);
router.put('/updateVariant/:id', controller.updateVariant);
router.delete('/deleteVariant/:id', controller.deleteVariant);

router.post('/addProductVariantValue', controller.addProductVariantValue);
router.get('/getProductVariantValues', controller.getProductVariantValues);
router.get('/getProductVariantValueById/:id', controller.getProductVariantValueById);
router.put('/updateProductVariantValue/:id', controller.updateProductVariantValue);
router.delete('/deleteProductVariantValue/:id', controller.deleteProductVariantValue);

router.post('/uploadImages',multer.single('image') ,controller.uploadImages);
router.get('/getImages', controller.getImages);
router.get('/getImagesId/:id', controller.getImagesId);
router.put('/updateImages/:id', controller.updateImages);
router.delete('/deleteImages/:id', controller.deleteImages);

router.post('/addCategories', controller.addCategories)
router.get('/getCategories', controller.getCategories)

module.exports = router;
