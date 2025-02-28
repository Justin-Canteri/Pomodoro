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
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const start = document.getElementById('start');
const stop = document.getElementById('stop');

let min = 0; // Cambia esto según el tiempo inicial que quieras
let sec = 10;
let minDes = 0;
let secDes = 5;
let interval;  

seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

const mostrarTiempoTranscurrido = () => {
    if (sec === 0) {
        if (min === 0) {            

            minDes = 0;
            secDes = 5;
            seconds.innerHTML = `${minDes.toString().padStart(2, '0')}:${secDes.toString().padStart(2, '0')}`;
            clearInterval(interval);// Detener cuando llega a 00:00
            interval = setInterval(mostrarTiempoTranscurridoDescanso, 1000); 
             //en este punto todo se termina, aqui debe iniciar el descanso 
        }
        min--;    // Restar un minuto
        sec = 59; // Reiniciar los segundos
    } else {
        sec--;
    }

    seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

const mostrarTiempoTranscurridoDescanso = () =>{
    //cuando temrina mostrarTiempoTranscurrido se activa mostrarTiempoTranscurridoDescanso y viceversa
    if (secDes === 0) {
        if (minDes === 0) {             

            min = 0;
            sec = 10;
            seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
            clearInterval(interval);
            interval = setInterval(mostrarTiempoTranscurrido, 1000); // Detener cuando llega a 00:00
             //en este punto todo se termina, aqui debe iniciar el descanso 
        }
        minDes--;    // Restar un minuto
        secDes = 59; // Reiniciar los segundos
    } else {
        secDes--;
    }

    seconds.innerHTML = `${minDes.toString().padStart(2, '0')}:${secDes.toString().padStart(2, '0')}`;
};

// Iniciar temporizador
const ini = () => {
    if (!interval) { 
        interval = setInterval(mostrarTiempoTranscurrido, 1000);
    }
};

// Detener temporizador
const det = () => {
    clearInterval(interval);//cancela la acción repetitiva especificada por el ID del intervalo
    interval = null;
};

const res = () =>{ 
    min = 0;
    sec = 10;
    seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    clearInterval(interval);
    interval = null;

}

/*
const end = Date.now() + 5*1000; //Aqui tomamos el tiempo de cuando queremos que el contador termine (En 60 segundos a partir de ahora)
numTimer.innerHTML = Math.floor((end - Date.now()) / 1000);
function mostrarTiempoTranscurrido() {
  const tiempoTranscurrido = Math.floor((end - Date.now()) / 1000);
  if(tiempoTranscurrido >= 0)
    {   
        numTimer.innerHTML = tiempoTranscurrido;
        //Programamos para que se revise de nuevo el tiempo transcurrido en 500ms
        setTimeout(mostrarTiempoTranscurrido, 1000); //1000
    } else {
        alert('fin del contador')
    }
    //else: Sino no programamos nada, es como si detuvieramos el timer
}
    */