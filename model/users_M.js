const pool = require('../config/db_config');

async function getAll() {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users');
        return rows; 
    } catch (err) {
        console.error('❌ Error fetching users:', err);
        throw err;
    }
}

module.exports = { getAll };
