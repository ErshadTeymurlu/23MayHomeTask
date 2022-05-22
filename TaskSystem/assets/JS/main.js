let taskInput = document.querySelector(".col-md-8 input");
let addBtn = document.querySelector(".add-btn");
let deleteBtn = document.querySelector(".delete-btn");
let taskList = document.querySelector(".list-group");
let checkboxSelect = document.getElementById("select-all");

if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", "[]");
}
let tasks = JSON.parse(localStorage.getItem("tasks")); //All the tasks is in here

let AfterRefresh = function () {
    if (tasks.length != 0) {
        for (let i = 0; i < tasks.length; i++) {
            let task = document.createElement("li");
            task.className = "list-group-item";
            task.append(tasks[i]);
            taskList.prepend(task);
        }
    }
}

AfterRefresh();  // Creting elements  again using localstorage after refresh happens

let addFunc = function(){
    if (taskInput.value.trim() !== "") {
        tasks.push(taskInput.value);
        let task = document.createElement("li");
        task.className = "list-group-item";
        task.append(tasks[tasks.length - 1]);
        taskList.prepend(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
    }
    else {
        alert("Please write a title for the task!");
    }
}

// Add tasks
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addFunc();
});

// Delete tasks
deleteBtn.addEventListener("click", () => {
    let li = document.querySelectorAll(".list-group-item.active");
    if (tasks.length != 0) {
        li.forEach(e => e.remove());
        for (let i = 0; i < li.length; i++) {
            tasks.splice(tasks.findIndex(el => el == li[i].innerHTML), 1);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    else {
        alert("There is nothing to delete!");
    }
});


//Select tasks by clicking
document.addEventListener("click", function (e) {
    if (e.target.hasAttribute("class")) {
        if (e.target.getAttribute("class").includes("active")) {
            e.target.classList.remove("active");
        }
        else {
            e.target.classList.add("active");
        }
    }
});

checkboxSelect.addEventListener("change", function(e) {
    let li = document.querySelectorAll(".list-group-item");
    if(e.target.checked){
        li.forEach(element=>element.classList.add("active"));
    }
    else{
        li.forEach(element=>element.classList.remove("active"));
    }
})

//Add by pressing enter
document.addEventListener("keyup",(event)=>{
    if(event.keyCode == "13"){
        addFunc();
    }
})