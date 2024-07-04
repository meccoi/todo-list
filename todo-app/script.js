let input = document.querySelector("input");
let button = document.querySelector("button");
let ul = document.querySelector("ul");


var taskContainer = getTask();


function SaveToLocalStorage(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    var task = input.value.trim();

    if(task === ''){
 
        document.querySelector(".inputContainer").classList.add("error");
        return;
    }else{
        document.querySelector(".inputContainer").classList.remove("error");
    }

    taskContainer.push(task);

    SaveToLocalStorage(taskContainer);


    let li = document.createElement("li");
    li.textContent = task;
    ul.appendChild(li);


    

    input.value = '';

    console.log(taskContainer);

    renderTask();
}

function getTask(){
    const task = localStorage.getItem("tasks");
    return task ? JSON.parse(task) : [];
}


function renderTask(){
    ul.innerHTML = ''; // Clear the list before rendering
    let tasks = getTask();

    tasks.forEach((key, index) => {
        let li = document.createElement("li");
        li.textContent = key;
        li.classList.add("flex", "justify-between", "items-center", "bg-gray-100", "p-2", "rounded-md", "mb-2");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("ui", "negative", "button");
        deleteBtn.textContent = "delete";
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            deleteTask(index);
        })
        ul.appendChild(li);
    })

 
}

function deleteTask(index){
    let status = confirm("Are you sure you want to do this?");
    if(status){
        taskContainer.splice(index, 1);
        SaveToLocalStorage(taskContainer);
        renderTask();
    }
}
button.addEventListener("click", function () {
    addTask();
});

renderTask();

document.addEventListener("keydown", function(event) {
    var taskInput = input.value.trim();
    if(taskInput.length === 1){
        document.querySelector(".inputContainer").classList.remove("error");
    }
    if (event.key === "Enter" && taskInput !== '') {
        addTask();
    }
    
});
