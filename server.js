const express = require('express');
const app = express();
const path = require("path");

const expressLayouts = require("express-ejs-layouts");
require('dotenv').config();
//! IMPORTANT EVERYTIME YOU ADD A FILE WITH TAILWIND npm run build:css see package.json file


// Make uploads folder publicly accessible (optional)

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("layout", "layout");
const mainRouter = require('./routes/mainRouter')
const partialsRouter = require('./routes/partialsRoute')
const productRouter = require('./routes/productsRoute')
const itemRouter = require('./routes/itemsRouter');
//routers

app.use('/',mainRouter)



app.use('/partials',partialsRouter)
app.use('/products',productRouter)
app.use("/items",itemRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


