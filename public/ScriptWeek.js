const addTask = (day) => {
    let taskInput = document.getElementById(`inputana${day}`);
    let taskList = document.getElementById(`Task${day}`); // Corregido para que coincida con el ID del HTML

    if (taskInput.value !== '') {
        let p = document.createElement('p');
        p.innerHTML = `
        <input type="checkbox" onclick="toggleComplete(this.nextElementSibling)"/>
        <span id='${taskInput.value}' onclick="toggleComplete(this)">${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
        <button class="edit-btn" onclick="editTask(this, '${day}')">✏️</button>`;
        
        taskList.appendChild(p);
        taskInput.value = '';
    } else {
        alert('Por favor, escribe una tarea.');
    }
};

const toggleComplete = (task) => {
    task.classList.toggle("completed");
};

const deleteTask = (button) => {
    let p = button.parentElement;
    p.remove();
};

const editTask = (button, day) => {
    let taskInput = document.getElementById(`inputana${day}`);
    let span = button.previousElementSibling.previousElementSibling; // Obtener el <span> correspondiente
    taskInput.value = span.textContent; // Copiar el texto al input para editar
    deleteTask(button); // Eliminar la tarea para que se pueda reescribir
};
