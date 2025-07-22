

const db = require('../db/queries')

module.exports = {
    getDashboardPage:(req, res) => {
    res.render("partials/dashboard", { layout: false });
    } ,
    getItemsPage:(req, res) => {
     res.render("partials/items", { layout: false,success: false, message: null,searchData:null });
    },
    getProductsPage:async(req,res)=>{
     const selectedCategory = req.query.category || "all";
     const filteredProducts = await db.getList(selectedCategory);

     const categories = await db.getCategories();

    //  console.log(categories)

     res.render("pages/products", { layout: false , categories,
    selectedCategory,
    products: filteredProducts});
    }
}

