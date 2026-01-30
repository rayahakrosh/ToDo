let greating = "Hello ";
greating += localStorage.getItem('name') || "Guest";
document.getElementById('greating').innerHTML = greating;

let allCategories = [];
let allTasks = [];

async function getTasks() {
    try {
        let response = await fetch('/tasks');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        allTasks = data;
        createTable(data);
    } catch (err) {
        console.error(err);
    }
}

async function getCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        
        allCategories = []; 
        for (let c of data) {
            allCategories[c.id] = c;
        }
        createSelect(data);
    } catch (err) {
        console.error(err);
    }
}

function createTable(data) {
    let txt = "";
    for (let obj of data) {
        if (obj) {
            let isChecked = obj.is_done ? "checked" : "";
            let rowClass = obj.is_done ? "class='rowClass'" : "";
            let catName = allCategories[obj.category_id] ? allCategories[obj.category_id].name : '--';
            
            txt += `<tr ${rowClass}>`;
            txt += `<td><input type="checkbox" ${isChecked} onchange="taskDone(${obj.id},this)"></td>`;
            txt += `<td>${obj.text}</td>`;
            txt += `<td>${catName}</td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="taskToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
}

function createSelect(data) {
    let txt = `<option value="0">All Categories / None</option>`;
    for (let obj of data) {
        if (obj) {
            txt += `<option value="${obj.id}">${obj.name}</option>`;
        }
    }
    document.getElementById('mySelect').innerHTML = txt;
}

function sortTable() {
    let val = document.getElementById('mySelect').value;
    if (val == 0) {
        createTable(allTasks);
    } else {
        let sorted = allTasks.filter(task => task.category_id == val);
        createTable(sorted);
    }
}

async function taskDone(id, elm) {
    let is_done = elm.checked ? 1 : 0;
    try {
        await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_done })
        });
        getTasks();
    } catch (err) {
        alert(err);
    }
}

async function taskToEdit(id) {
    try {
        let response = await fetch(`/tasks/${id}`);
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        } else {
            document.getElementById('id').value = data.id;
            document.getElementById('text').value = data.text;
            document.getElementById('mySelect').value = data.category_id || 0;
        }
    } catch (err) {
        alert(err);
    }
}

async function editTask(id) {
    try {
        let text = document.getElementById('text').value;
        let category_id = document.getElementById('mySelect').value;
        
        await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, category_id: category_id == 0 ? null : category_id })
        });
        
        resetForm();
        getTasks();
    } catch (err) {
        alert(err);
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        editTask(id);
    } else {
        addTask();
    }
}

async function addTask() {
    try {
        let text = document.getElementById('text').value;
        let catId = document.getElementById('mySelect').value;
        
        if(!text) return alert("Please enter task text");

        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, catId: catId == 0 ? null : catId })
        });
        
        resetForm();
        getTasks();
    } catch (err) {
        alert(err);
    }
}

async function deleteTask(id) {
    if(!confirm("Are you sure you want to delete this task?")) return;
    try {
        let response = await fetch(`/tasks/${id}`, { method: 'DELETE' });
        if(!response.ok) {
            let data = await response.json();
            alert(data.message);
        }
        getTasks();
    } catch (err) {
        alert(err);
    }
}

function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('text').value = "";
    document.getElementById('mySelect').value = 0;
}

async function init() {
    await getCategories(); 
    await getTasks();
}

init();