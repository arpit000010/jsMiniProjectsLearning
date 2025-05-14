document.addEventListener("DOMContentLoaded", () => {
    let todoInput = document.getElementById("todo-input");
let addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTasks(task))

addTaskButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim();
    if (taskText === "") return ;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask); // render the new task
    todoInput.value=""; // to clear the input field
    console.log(tasks);

});

function renderTasks(task){ // whenever we load the page, i want to read all the tasks from local storage store them in the tasks array and render them
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if(task.completed){
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
    li.addEventListener("click", function (e) {
        if(e.target.tagName === 'BUTTON') return ;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    })

    li.querySelector('button').addEventListener("click", function (e) {
        e.stopPropagation(); // prevent the click event from bubbling up to the li
        tasks = tasks.filter(t=> t.id !== task.id);
        li.remove();
        saveTasks();
    })
    todoList.appendChild(li);

}



function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
})