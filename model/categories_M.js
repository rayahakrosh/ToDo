const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT id,name FROM categories`;
    let [rows] = await db.query(sql);    
    return rows;
}

async function add({name,userId}){
    let sql = `INSERT INTO categories (name,user_id) VALUES (?,?)`;
    let [result] = await db.query(sql,[name,userId]); 
    return result.insertId;
}

async function getOne(id){
    let sql = `SELECT id,name FROM categories WHERE id = ?`;
    let [rows] = await db.query(sql,[id]);    
    return rows[0];
}

async function remove(id){
    let sql = `DELETE FROM categories WHERE id = ?`;
    let [result] = await db.query(sql,[id]);    
    return result.affectedRows;
}

module.exports = {
    getAll,
    add,
    getOne,
    remove
}
