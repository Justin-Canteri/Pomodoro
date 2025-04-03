let taskList = document.getElementById("Task");

if(fetch('/get-all')){  //retirar el No hay textos almacenados
    obtenerTodo();
    };

async function addTask() {
    let taskInput = document.getElementById('inputana').value;

    if (taskInput !== '') {
        const respuesta = await fetch("/saveTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: taskInput, task: taskInput }) // Corrige la estructura del JSON
        });

        if (respuesta.ok) {
            obtenerTodo();
        } else {
            console.error("Error al guardar la tarea");
        }
    } else {
        alert('no funca compa');
    }
    taskInput= ""; // se borra la entrada
}

async function obtenerTexto(taskInput) {

    const respuesta = await fetch(`/getTask/${taskInput}`);
    if (!respuesta.ok) {
        console.error("Error al obtener la task");
        return;
    }

    const data = await respuesta.json();

    let p = document.createElement('p');
    p.innerHTML = `
        <input type="checkbox" id="scales" name="scales" />
        <span id="${data.taskInput}" onclick="toggleComplete(this)">${data.taskInput}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
        <button class="edit-btn" onclick="editTask(this)">✏️</button>
    `;

    taskList.appendChild(p);
}

async function obtenerTodo() {
    const respuesta = await fetch("/get-all");
    const data = await respuesta.json();

    taskList.innerHTML = "";

    if (data.mensaje) {
        taskList.innerHTML = `<li>${data.mensaje}</li>`;
    } else {
        for (const id in data) {
            let p = document.createElement('p');
            p.innerHTML = `
            <input type="checkbox" id="scales" name="scales" />
            <span id="${id}" onclick="toggleComplete(this)">${data[id]}</span>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
            <button class="edit-btn" onclick="editTask(this)">✏️</button>`;
            taskList.appendChild(p);
        }
    }
}


//Editar la tarea
const toggleComplete = (task) => {
    task.classList.toggle("completed")  //aprieto el texto osesa es como al apretar el texto funciona como un checkbox
    alert('togleComlete')
    ;
    
};

const deleteTask = (button) => {
    let li = button.parentElement;
    li.remove();
};

const editTask = (button) => {
    let taskInput = document.getElementById('inputana');
    let span = button.previousElementSibling.previousElementSibling; // Obtener el <span> anterior al botón
    taskInput.value = span.textContent; // Asignar el texto del <span> al input
    deleteTask(button); // Eliminar la tarea actual para que se pueda editar
};
