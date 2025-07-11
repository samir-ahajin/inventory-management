const {Router} = require('express');
const productRouter = Router();
const productController = require('../controllers/productsController')

productRouter.get("/partial",productController.getProductsList);

module.exports = productRouter;
