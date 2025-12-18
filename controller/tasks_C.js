const { getAll, add } = require('../model/tasks_M.js');

async function getAllTasks(req,res){
    try{
        let tasks = await getAll(req.user.id);
        if(tasks.length == 0){
            return res.status(400).json({message:"אין נתונים"})
        }
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

async function addTask(req,res){
    try{
        let title = req.body.title;
        let categoryId = req.body.categoryId;
        let userId = req.user.id;

        if(!title || !categoryId){
            return res.status(400).json({message:"חסרים נתונים"});
        }

        let taskId = await add({title, categoryId, userId});
        if(!taskId){
            return res.status(500).json({message:"Server error"});
        }

        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

module.exports = {
    getAllTasks,
    addTask
}
