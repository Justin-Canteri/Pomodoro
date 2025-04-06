//FUNCTION TIMER
const seconds = document.getElementById('seconds');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const state = document.getElementById('status');
const MinWork = document.getElementById('MinWork');


let inputUserMin = 30; // Input user to work cambiar 
let inputUserMinDes = 5; //input user to break cambiar

let interval;  
let secDes =0;
let sec = 0;
let min = inputUserMin;
let minDes = inputUserMinDes;
let MinutesWoekeados = 0;


 if(fetch('/get')){
    Obtener();
    };
    
ObtainWork();

//send minutes work
async function MinWorks() {
    MinutesWoekeados = MinutesWoekeados + (inputUserMin - min);
    await fetch('/saveTime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: `${MinutesWoekeados} minutes` })
    });
    ObtainWork()
}

async function ObtainWork() {
    const res = await fetch('/getTime');
    const data = await res.json();
    MinWork.innerHTML = data['time'];
};

async function Obtener() {
    const res = await fetch('/get');
    const data = await res.json();
    inputUserMin = data['minFocus']; 
    inputUserMinDes = data['minBreak'];
    reset(); 

};


document.getElementById('form').onsubmit = async (e) => {     //onsubmit hace que cuando se envie el form se activa todo el getElemntById
    e.preventDefault();
    
    const minFocus = document.getElementById('minFocus').value;
    const minBreak = document.getElementById('minBreak').value;
//aun await para que se ejecute el codigo mientras sigue el DOM 
        await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minFocus, minBreak })
    });
    Obtener();
};

seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
state.innerHTML = 'Time to focus!';
const mostrarTiempoTranscurrido = () => {
    if (sec === 0) {
        if (min === 0) {     
            clearInterval(interval);// Detener cuando llega a 00:00     
            MinWorks()  
            minDes = inputUserMinDes;
            secDes = 0;
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
            sec = 0;
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

const reset = () =>{ 
    min = inputUserMin;
    sec = 0;
    seconds.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    clearInterval(interval);
    state.innerHTML = 'Time to focus!';
    interval = null;
    return;
}

