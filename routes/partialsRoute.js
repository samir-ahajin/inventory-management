const {Router} = require('express')
const partialRouter = Router();
const partialController = require('../controllers/partialsController')


partialRouter.get("/dashboard", partialController.getDashboardPage );

partialRouter.get("/items", partialController.getItemsPage);


partialRouter.get("/products", partialController.getProductsPage);

module.exports = partialRouter;
