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
const seconds = document.getElementById('seconds');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const state = document.getElementById('status');


let inputUserMin = 30; // Input user to work
let inputUserMinDes = 5; //input user to break

let interval;  
let secDes =0;
let sec = 0;
let min = inputUserMin;
let minDes = inputUserMinDes;

const changeMin = (num) =>{
    inputUserMin = num;
    res();
};

const changeMinDes = (num) =>{
    inputUserMinDes = num;
    res();
};

seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
state.innerHTML = 'Time to focus!';
const mostrarTiempoTranscurrido = () => {
    if (sec === 0) {
        if (min === 0) {     
            clearInterval(interval);// Detener cuando llega a 00:00       
            minDes = inputUserMinDes;
            secDes = 5;
            state.innerHTML = 'Time to break!'
            seconds.innerHTML = `${minDes.toString().padStart(2, '0')}:${secDes.toString().padStart(2, '0')}`;
            interval = setInterval(mostrarTiempoTranscurridoDescanso, 1000); 
            return;
             //en este punto todo se termina, aqui debe iniciar el descanso 
        } else{
            min--;    // Restar un minuto
            sec = 59; // Reiniciar los segundos
        }
    } else {
        sec--;
    }

    seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

const mostrarTiempoTranscurridoDescanso = () =>{
    //cuando temrina mostrarTiempoTranscurrido se activa mostrarTiempoTranscurridoDescanso y viceversa
    if (secDes === 0) {
        if (minDes === 0) {
            clearInterval(interval);
            min = inputUserMin;
            sec = 5;
            state.innerHTML = 'Time to focus!';
            seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
            interval = setInterval(mostrarTiempoTranscurrido, 1000); // Detener cuando llega a 00:00
             //en este punto todo se termina, aqui debe iniciar el descanso 
             return;
        } else{
            minDes--;    // Restar un minuto
            secDes = 59; // Reiniciar los segundos
        }
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
    min = inputUserMin;
    sec = 0;
    seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    clearInterval(interval);
    state.innerHTML = 'Time to focus!';
    interval = null;

}

//Config
const dropConfig = document.getElementById("dropConfig");

const dropConfigFunc = () =>{
    if (dropConfig.style.visibility === "hidden") {

        dropConfig.style.visibility = "visible";
    } else {
        dropConfig.style.visibility = "hidden";
    }

}