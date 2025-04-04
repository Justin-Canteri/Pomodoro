let taskList = document.getElementById("Task");



// Cargar todas las tareas al inicio
obtenerTodo();

async function addTask() {
    let taskInputEl = document.getElementById('inputana');
    let taskInput = taskInputEl.value.trim();

    if (taskInput !== '') {
        const respuesta = await fetch("/saveTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: taskInput, task: taskInput }) // ID = texto, podés cambiar esto si querés ID diferente
        });

        if (respuesta.ok) {
            obtenerTodo();
        } else {
            const data = await respuesta.json();
            alert(data.error || "Error al guardar la tarea");
        }
    } else {
        alert('No funca compa');
    }

    taskInputEl.value = ""; // Limpiar input
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
                <input type="checkbox" />
                <span onclick="toggleComplete(this)" data-id="${id}">${data[id]}</span>
                <button class="delete-btn" onclick="eliminarTexto('${id}', this)">X</button>
                <button class="edit-btn" onclick="editTask('${id}', '${data[id]}')">✏️</button>
                
                
            `;
            taskList.appendChild(p);
        }
    }
}

async function eliminarTexto(id, button) {
    let li = button.parentElement;
    li.remove();

    const respuesta = await fetch(`/eliminar/${id}`, {
        method: "DELETE"
    });

    const data = await respuesta.json();
    document.getElementById("mensaje").textContent = data.error || data.mensaje;
    
}

function editTask(id, text) {
    let taskInput = document.getElementById('inputana');
    taskInput.value = text;

    // Eliminar la tarea para poder editar y guardarla como nueva
    eliminarTexto(id, taskInput); // cuidado: puede eliminar antes de escribir
}

function toggleComplete(span) {
    span.classList.toggle("completed");
}

