const pool = require('./pool')

async function getList(category){
    const {rows} = await pool.query('SELECT * FROM products WHERE LOWER(product_category) = LOWER($1) OR LOWER($1) = LOWER(\'ALL\')',[category])
    return rows
}

async function getValue(value){
    const {rows} = await pool.query(`
        SELECT * FROM products
        WHERE 
            ($1 ~ '^[0-9]+$' AND id = $1::INT)
            OR
            ($1 !~ '^[0-9]+$' AND product_name ILIKE '%' || $1 || '%')
`, [value]);
}
async function getCategories(){
    const {rows} = await pool.query(`
        SELECT INITCAP(product_category) AS category FROM 
        products GROUP BY product_category ORDER BY product_category ASC`)
    return rows;
}
module.exports = {
        getList,
        getValue,
        getCategories
}