async function addTask(){

    let taskInput = document.getElementById('inputana');
    let taskList = document.getElementById("Task");
    if (taskInput.value !== ''){
        let p = document.createElement('p');
        p.innerHTML = `<input type="checkbox" id="scales" name="scales" />
        <span id = '${taskInput.value}' onclick="toggleComplete(this)">${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
        <button class="edit-btn" onclick="editTask(this)">✏️</button>`; //span usa el espacio que necesita (no como p que usa toda una linea)

        taskList.appendChild(p);
        taskInput.value = '';
    } else {
        alert('no funca compa')
    }
};

const toggleComplete = (task) => {
    task.classList.toggle("completed")  //aprieto el texto osesa es como al apretar el texto funciona como un checkbox
    alert('togleComlete')
    ;
    
};

const deleteTask = (button) => {
    let li = button.parentElement;
    li.remove();
};

/*
const editTask = (task) =>{
    // tomar el taskInput de la etiqueta, plasmarlra en el input, borrar la etiqueta que se creo para luego agregar la editada 
    let taskInput = document.getElementById('inputana');
    taskInput.value = task.parentElement.;
    deleteTask(task);
};
*/

const editTask = (button) => {
    let taskInput = document.getElementById('inputana');
    let span = button.previousElementSibling.previousElementSibling; // Obtener el <span> anterior al botón
    taskInput.value = span.textContent; // Asignar el texto del <span> al input
    deleteTask(button); // Eliminar la tarea actual para que se pueda editar
};

