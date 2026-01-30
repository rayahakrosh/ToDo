const { getAll, add, getOne, remove, update } = require('../model/categories_M.js');
const tasksModel = require('../models/tasks_M.js'); 

async function getAllCategories(req, res) {
    try {
        let categories = await getAll(req.user.id);
        if (categories.length == 0) {
            return res.status(400).json({ message: "אין נתונים" })
        }
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

async function addCategory(req, res) {
    try {
        let name = req.body.name;
        let userId = req.user.id;

        let categoryId = await add({ name, userId });
        if (!categoryId) {
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "נוסף בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getCategory(req, res) {
    try {
        let category = await getOne(req.id, req.user.id);
        if (!category) {
            return res.status(400).json({ message: `category is not found!` })
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

async function deleteCategory(req, res) {
    try {
        const catId = req.id;
        const userId = req.user.id;
        await tasksModel.removeByCategoryId(catId, userId);

        let affectedRows = await remove(catId, userId);
        
        if (!affectedRows) {
            return res.status(400).json({ message: `Category ${catId} not found!` })
        }
        
        res.status(200).json({ message: "Category and associated tasks deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }
}

async function updateCategory(req, res) {
    try {
        let catId = req.id;
        let userId = req.user.id;
        let newName = req.body.name;
        let affectedRows = await update(catId, userId, newName);
        if (!affectedRows) {
            return res.status(400).json({ message: `Category ${req.id} not found!` })
        }
        res.status(200).json({ message: "updated!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}