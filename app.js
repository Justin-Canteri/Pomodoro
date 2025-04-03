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

app.get('/get-all', (req,res) =>{
    if (!req.session.task || Object.keys(req.session.task).length === 0) {
        return res.json({ mensaje: "No hay textos almacenados" });
    }
    res.json(req.session.task);
})

//sever 

app.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/week',(req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'week.html'))
});

app.get('/login',(req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));  