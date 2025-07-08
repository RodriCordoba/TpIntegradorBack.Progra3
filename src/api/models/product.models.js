import connection from "../database/db.js";

const selectAllProducts = async () => {
    let sql = `SELECT * FROM products`;

    return await connection.query(sql);
}

const selectProductFromId = async (id) => {
    let sql  = `SELECT * FROM products where id = ?`;

    return await connection.query(sql, [id]);
}

const insertNewProduct = async (category, image, name, price) => {
    let sql = `INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)`;

    return await connection.query(sql, [category, image, name, price]);
}

const updateProduct = async (id, category, image, name, price) => {
    let sql = `
        UPDATE products
        SET name = ?, image = ?, price = ?, category = ?
        WHERE id = ?
    `;
    return await connection.query(sql, [name, image, price, category, id]);
}

const deleteProduct = async (id) => {
    let sql = `DELETE FROM products WHERE id = ?`;

    return await connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}