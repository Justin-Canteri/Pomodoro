const addTask = () => {

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




//FUNCTION TIMER 
const numTimer = document.getElementById('Timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');



const end = Date.now() + 60*1000; //Aqui tomamos el tiempo de cuando queremos que el contador termine (En 60 segundos a partir de ahora)

function mostrarTiempoTranscurrido() {
  const tiempoTranscurrido = Math.floor((end - Date.now()) / 1000);
  if(tiempoTranscurrido > 0)
  {
    numTimer.innerHTML = tiempoTranscurrido;
     //Programamos para que se revise de nuevo el tiempo transcurrido en 500ms
     setTimeout(mostrarTiempoTranscurrido, 500);
  } //else: Sino no programamos nada, es como si detuvieramos el timer
}