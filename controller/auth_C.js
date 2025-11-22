const db = require('../config/db_config');

async function addUser(req, res) {
    try {
        let { name, email, userName } = req.body;
        let pass = req.pass; 

        const [existing] = await db.query("SELECT id FROM users WHERE email = ? OR userName = ?", [email, userName]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const [result] = await db.query(
            "INSERT INTO users (name, email, userName, pass) VALUES (?, ?, ?, ?)",
            [name, email, userName, pass]
        );

        res.status(201).json({ 
            message: "User added successfully", 
            userId: result.insertId 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    addUser
};
