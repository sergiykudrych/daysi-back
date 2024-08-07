const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const UserControllers = require('../controllers/user-controllers');
const ProductControllers = require('../controllers/product-controllers');
const ImageControllers = require('../controllers/image-controllers');

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), UserControllers.registration);

router.post('/login', UserControllers.login);
router.post('/logout', UserControllers.logout);

router.post('/refresh', UserControllers.refresh);

router.get('/products', ProductControllers.getProducts);
router.get('/product/:id', ProductControllers.getProduct);
router.post('/update-product', ProductControllers.updateProduct);
router.post('/create-product', ProductControllers.createProduct);
router.delete('/delete-product/:id', ProductControllers.removeProduct);

router.post('/translate-text', ProductControllers.translateText);

router.get('/photos/:filename', ImageControllers.getImages);
router.post('/upload', ImageControllers.uploadImage);

module.exports = router;
// const fileMiddleware = require('../middlewares/file-middleeare');
// router.post('/upload', fileMiddleware.array('images', 5), async (req, res, next) => {
//   try {
//     if (req.files && req.files.length > 0) {
//       res.json(req.files); // Відправити інформацію про файли назад
//     } else {
//       res.status(400).send('No files uploaded.');
//     }
//   } catch (error) {
//     next(error); // Передати помилку до обробника помилок
//   }
// });
