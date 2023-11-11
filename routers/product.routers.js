const express = require('express');
    const router = express.Router();
    const multer = require ('multer')();
    const controller = require('../controllers/product.controller');

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
