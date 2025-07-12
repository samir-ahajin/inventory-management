const pool = require('./pool')

async function getList(category){
    const {rows} = await pool.query('SELECT * FROM products WHERE LOWER(product_category) = LOWER($1) OR LOWER($1) = LOWER(\'ALL\')',[category])
    return rows
}

async function getValue(value){
    console.log('Searching for:', value);
    const {rows} = await pool.query(`
        SELECT * FROM products
        WHERE 
            ($1 ~ '^[0-9]+$' AND id = $1::INT)
            OR
            ($1 !~ '^[0-9]+$' AND product_name ILIKE '%' || $1 || '%')
`, [value]);
return rows;
}
async function getCategories(){
    const {rows} = await pool.query(`
        SELECT INITCAP(product_category) AS category FROM 
        products GROUP BY product_category ORDER BY product_category ASC`)
    return rows;
}
async function insertNewProduct(prod) {
    const insertData = await pool.query(`
                INSERT INTO products (product_name, product_category, price, quantity, image_sample, from_company, added_by)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, product_name, product_category, price, quantity, image_sample
            `, [prod.product_name, prod.product_category, prod.product_price,prod.quantity
                , prod.product_image_url,prod.from_company, prod.added_by]);
    return insertData.rows[0];

}
module.exports = {
        getList,
        getValue,
        getCategories,
        insertNewProduct
}