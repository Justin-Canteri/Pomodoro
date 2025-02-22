const addTask = () => {
    let taskInput = document.getElementById('inputana');
    let taskList = document.getElementById("taskList");

    let li = document.createElement('li');
    li.innerHTML = `<span onclick="toggleComplete(this)">${taskInput}</span>
    <button class="delete-btn" onclick="deleteTask(this)">X</button>`;

    taskList.appendChild(li);
    taskInput.value = "";
}

const toggleComplete = (task) => {
    task.classList.toggle("completed");
}

const deleteTask = (button) => {
    let li = button.parentElement;
    li.remove();
}

document.getElementById('Timer').innerHTML ='30:00'; //lo que quiero hacer es