let tasks = [];

// get input
const input = document.querySelector(".input-div input");
const btn = document.querySelector(".input-div button");

let inputVal = "";

btn.addEventListener('click', e => {
    e.preventDefault();

    inputVal = input.value.toLowerCase().trim();
    if (!inputVal) return;

    tasks.push({
        id: crypto.randomUUID(),
        name: inputVal,
        completed: false,
    });
    input.value = "";
    input.focus();
    renderTasks();
});

// render tasks
const tasksDiv = document.querySelector(".tasks-div");

function renderTasks() {
    tasksDiv.innerHTML = "";
    
    const frgmnt = document.createDocumentFragment();

    tasks.forEach(t => {
        const div = document.createElement("div");
        const task = document.createElement("span");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        task.textContent = t.name;
        edit.textContent = "Edit";
        del.textContent = "Delete";

        div.dataset.id = t.id;
        div.className = "task-div";
        edit.className = "edit-btn";
        del.className = "del-btn";

        div.append(task, edit, del);
        frgmnt.appendChild(div);
    });

    tasksDiv.appendChild(frgmnt);
}

renderTasks();

tasksDiv.addEventListener('click', e => {
    e.preventDefault();

    const taskDiv = e.target.closest(".task-div");
    if (!taskDiv) return;

    const id = taskDiv.dataset.id;
});