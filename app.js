const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

app.use(express.json());

app.use(
      session({
        secret: "D53gxl41G",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 5},   
      })
    );
    
//TIMER
//post Timer
app.post('/save', (req,res) =>{
    const {minFocus,minBreak} = req.body;
    req.session.minFocus = minFocus;
    req.session.minBreak = minBreak;
    res.json({ message: 'Datos guardados en la sesión' });
});

//get Timer 
app.get('/get', (req,res) => {
    if (req.session.minFocus && req.session.minBreak) {
        res.json({ minFocus: req.session.minFocus, minBreak: req.session.minBreak});
    } else{
        res.json({ minFocus: 30, minBreak: 5 });
    }
});

//------------------------------------------------------------------------------------------//

//post tasks con un id
app.post('/saveTask', (req, res) => {
    const { id, task } = req.body;

    if (!id || !task) {
        return res.status(400).json({ error: 'Se requiere id y texto' });
    }

    if (!req.session.task) {
        req.session.task = {};
    }

    if (req.session.task[id]) {
        return res.status(409).json({ error: 'El ID ya existe, usa otro' });
    }

    req.session.task[id] = task;
    res.json({ mensaje: 'Texto guardado correctamente' });
});

//obtener task ( de a una )
app.get('/getTask/:id', (req, res) => {
    const id = req.params.id;

    if (!req.session.task) {
        req.session.task = {};
    }

    if (!req.session.task[id]) {
        return res.status(404).json({ error: 'Texto no encontrado' });
    }

    res.json({ taskInput: req.session.task[id] }); // Asegura que coincida con el frontend
});

//obtener todas las task
app.get('/get-all', (req,res) =>{
    res.json(req.session.task);
})

app.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;

    if (!req.session.task || !req.session.task[id]) {
        return res.status(404).json({ error: 'Texto no encontrado' });
    }

    delete req.session.task[id];
    res.json({ mensaje: 'Texto eliminado correctamente' });
});


app.put('/actualizar/:id', (req, res) => {
    const id = req.params.id;
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: 'Se requiere un nuevo texto' });
    }

    if (!req.session.task || !req.session.task[id]) {
        return res.status(404).json({ error: 'Texto no encontrado' });
    }

    req.session.task[id] = task;
    res.json({ mensaje: 'Texto actualizado correctamente' });
});


app.post('/saveTime', (req,res) =>{
    const {time} = req.body;
    req.session.time = time;
    res.json({ message: 'Datos guardados en la sesión' });
});

//get Timer 
app.get('/getTime', (req,res) => {
    if (req.session.time) {
        res.json({ time: req.session.time});
    }else{
        res.json({ time:'Time work' });
    }
});

//sever 

app.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/login',(req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));  