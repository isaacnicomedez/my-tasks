const tasks = [];

const input = document.querySelector(".input-div input");
const btn = document.querySelector(".input-div button");

let inputVal = "";

btn.addEventListener('click', e => {
    e.preventDefault();

    inputVal = input.value.toLowerCase().trim();
    if (!inputVal) return;

    tasks.push(inputVal);
    input.value = "";
    input.focus();
    console.log(tasks);
});