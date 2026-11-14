let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedCount = JSON.parse(localStorage.getItem("count")) || 0;

// get input
const input = document.querySelector(".input-div input");
const btn = document.querySelector(".input-div button");
const count = document.querySelector(".count");

let inputVal = "";

btn.addEventListener('click', e => {
    e.preventDefault();

    inputVal = input.value.toLowerCase().trim();
    if (!inputVal) return;

    tasks.push({
        id: crypto.randomUUID(),
        name: inputVal,
    });
    input.value = "";
    input.focus();
    saveTodo();
    renderTasks();
});

// render tasks
const tasksDiv = document.querySelector(".tasks-div");

function renderTasks() {
    tasksDiv.innerHTML = "";

    count.textContent = completedCount;
    
    const frgmnt = document.createDocumentFragment();

    tasks.forEach(t => {
        const div = document.createElement("div");
        const task = document.createElement("span");
        const editInput = document.createElement("input");
        const checkbox = document.createElement("input");
        const edit = document.createElement("button");
        const save = document.createElement("button");
        const del = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.className = "chkbox";

        task.textContent = `${t.name.charAt(0).toUpperCase()}${t.name.slice(1)}`;
        edit.textContent = "Edit";
        save.textContent = "Save";
        del.textContent = "Delete";

        div.dataset.id = t.id;
        div.className = "task-div";
        task.className = "task"
        edit.className = "edit-btn";
        del.className = "del-btn";
        editInput.className = "edit-input hide";
        save.className = "save-btn hide";

        div.append(checkbox, task, editInput, save, edit, del);
        frgmnt.appendChild(div);
    });

    tasksDiv.appendChild(frgmnt);
}

renderTasks();

isEditing = false;

tasksDiv.addEventListener('click', e => {
    e.preventDefault();

    const taskDiv = e.target.closest(".task-div");
    if (!taskDiv) return;
    console.log(taskDiv);

    const id = taskDiv.dataset.id;

    if (e.target.classList.contains("del-btn")) {
        tasks = tasks.filter(t => t.id !== id);
        saveTodo();
        renderTasks();
    } else if (e.target.classList.contains("edit-btn")) {
        isEditing = true;
        const taskSpan = taskDiv.querySelector(".task");
        const editInput = taskDiv.querySelector(".edit-input");
        const editBtn = taskDiv.querySelector(".edit-btn");
        const saveBtn = taskDiv.querySelector(".save-btn");

        taskSpan.classList.toggle("hide", isEditing);
        editInput.classList.toggle("hide", !isEditing);
        editBtn.classList.toggle("hide", isEditing);
        saveBtn.classList.toggle("hide", !isEditing);

        editInput.value = taskSpan.textContent;
        editInput.focus();
    } else if (e.target.classList.contains("save-btn")) {
        const editInput = taskDiv.querySelector(".edit-input");
        const newName = editInput.value.toLowerCase().trim();
        if (!newName) return;

        const task = tasks.find(t => t.id === id);
        if (task) {
            task.name = newName;
        }
        saveTodo();
        renderTasks();
    } else if (e.classList.contains("chkbox")) {
        completedCount++;
        tasks = tasks.filter(t => t.id !== id);
        saveTodo();
        renderTasks();
    }
});

function saveTodo() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("count", JSON.stringify(completedCount));
}