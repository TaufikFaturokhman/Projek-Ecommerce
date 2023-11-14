const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/authController')

router.post('/addRole', controller.addRole)
router.post('/permissions', controller.createPermission)
router.post('/register', controller.createUser)
router.get('/login', controller.loginUser)
router.put('/updateUser', controller.updateUser)
router.get('/getUser', controller.getUser)
router.get('/getUserById/:id', controller.getUserById)



// router.post('/add-to-cart', controller.addToCart)
// router.get('/my-cart/:userId', controller.getUserCart)
// router.post('/delete-from-mycart/:userId/:cartId', controller.removeFromCart)
// router.delete('/clear-cart/:userId', controller.clearCart)

module.exports = router