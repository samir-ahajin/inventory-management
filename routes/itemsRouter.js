const {Router} = require('express')
const itemsRouter = Router();


itemsRouter.post('/add',(req,res)=>{
  const { product_name, quantity } = req.body;
  console.log(product_name,quantity);
})
itemsRouter.post('/update',(req,res)=>{
  const { user, text } = req.body;
})
module.exports = itemsRouter;