const input = document.querySelector(".input-div input");
const btn = document.querySelector(".input-div button");

let inputVal = "";

btn.addEventListener('click', e => {
    e.preventDefault();

    inputVal = input.value.toLowerCase().trim();
    console.log(inputVal);
});