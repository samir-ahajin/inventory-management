
const db = require('../db/queries');
const uploadImage = require('../db/uploadImagetoUrl');
const fs = require('fs');

module.exports = {
    itemAddPost:async(req,res)=>{
        const { product_name, quantity, category, price, image } = req.body;
        // console.log(product_name, quantity, category, price, image);

        // console.log('BODY:', req.body);  // Should have product_name, etc.
        // console.log('FILE:', req.file);  // Should contain file info


        const filePath = req.file?.path;
        
        const final_url = await uploadImage(filePath);
        // console.log("Final URL:", final_url);
 
        const prod = {
        product_name:product_name, 
        product_category:category,
        product_price:price || 0,
        quantity:quantity || 0,
        product_image_url:final_url,
        from_company:'test',// company from the user table 
        added_by:1//id of the current user
        }
        console.log(prod);

       try {
            if (final_url) {
                const addItem = await db.insertNewProduct(prod);
                // console.log("Item added:", addItem);

                // Delete the uploaded image
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Failed to delete original file:', err);
                    } else {
                        console.log('Original file deleted.');
                    }
                });
            }

             res.json({ success: true, message: '✅ Item added successfully!' });

        } catch (error) {
            // console.error('Error adding item:', error);

            res.status(500).json({ success: false, message: '❌ Failed to add item.' });
        }
    
    }
        ,
    itemUpdatePost:(req,res)=>{
    },
    itemSearchPost:async(req,res)=>{
  
        const { search } = req.body;
       

        try {
             const searchResult = await db.getValue(search);

            console.log('Search results:', searchResult);

            // ✅ Render EJS partial only, WITHOUT layout
            res.render('partials/searchList', { searchResult, layout: false }, (err, html) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Rendering error');
            }
            res.send(html); // ✅ Send only the HTML for the result list
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Search failed');
        }


        },
}
