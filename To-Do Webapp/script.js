let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveBtn = document.getElementById("saveTask");
saveBtn.addEventListener("click", addTask);

function saveToStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const dueTime = document.getElementById("dueTime").value;

    if(title === ""){
        alert("Please enter task title");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        dueTime,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(task);
    saveToStorage();
    renderTasks();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("dueTime").value = "";
}

function renderTasks(){
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {

        const div = document.createElement("div");
        div.className = "task-box";

        div.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.description || ""}</p>
            ${task.dueDate ? `<small>Due: ${task.dueDate} ${task.dueTime || ""}</small>` : ""}
            <small>Created: ${task.createdAt}</small>
            ${task.completedAt ? `<small>Completed: ${task.completedAt}</small>` : ""}
            <div class="task-buttons">
                ${!task.completed ? 
                    `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` 
                    : ""}
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if(task.completed){
            div.classList.add("completed");
            completedList.appendChild(div);
        }else{
            pendingList.appendChild(div);
        }
    });
}

function completeTask(id){
    tasks = tasks.map(task => {
        if(task.id === id){
            task.completed = true;
            task.completedAt = new Date().toLocaleString();
        }
        return task;
    });

    saveToStorage();
    renderTasks();
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    saveToStorage();
    renderTasks();
}

function editTask(id){
    const task = tasks.find(task => task.id === id);

    const newTitle = prompt("Edit Title:", task.title);
    const newDesc = prompt("Edit Description:", task.description);

    if(newTitle !== null) task.title = newTitle;
    if(newDesc !== null) task.description = newDesc;

    saveToStorage();
    renderTasks();
}

renderTasks();
