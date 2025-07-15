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
async function updateProduct(prod) {
    console.log("Updating product with data:", prod);
  const query = `
WITH existing AS (
  SELECT 1
  FROM products
  WHERE 
    id = $1 AND
    product_name = $2 AND
    product_category = $3 AND
    price = $4 AND
    quantity = $5 AND
    (image_sample = $6 OR $6 IS NULL)
),
updated AS (
  UPDATE products
  SET 
    product_name = $2,
    product_category = $3,
    price = $4,
    quantity = $5,
    updated_by = 1,
    updated_date = CURRENT_TIMESTAMP,
    image_sample = COALESCE($6, image_sample)
  WHERE id = $1 AND NOT EXISTS (SELECT 1 FROM existing)
  RETURNING 'updated' AS status
)
SELECT * FROM updated
UNION
SELECT 'no updates' AS status WHERE NOT EXISTS (SELECT 1 FROM updated);
`;
const res = await pool.query(query, [prod.id,prod.product_name, prod.category, prod.price, prod.quantity, prod.image_url]);

const status = res.rows[0].status;
if (status === 'updated') {
  return true; // Indicating that the product was updated
} else {
  return false;
}
}
module.exports = {
        getList,
        getValue,
        getCategories,
        insertNewProduct,
        updateProduct
}