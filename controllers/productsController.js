const db = require('../db/queries')

    
module.exports = {
    getProductsList: async(req, res) => {
    const category = req.query.category || "all";
    const filtered = await db.getList(category);
  
    res.render("partials/products", {
        layout: false,
        products: filtered
    });
}
}