const {Router} = require('express')
const itemsRouter = Router();
const itemsController = require('../controllers/itemsController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: function (req, file, cb) {
    // Add timestamp + original name
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

itemsRouter.post('/add',upload.single('image'),itemsController.itemAddPost)
itemsRouter.post('/update',itemsController.itemUpdatePost)
itemsRouter.post('/search',itemsController.itemSearchPost)
module.exports = itemsRouter;