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

app.post('/save', (req,res) =>{
    const {minFocus,minBreak} = req.body;
    req.session.minFocus = minFocus;
    req.session.minBreak = minBreak;
    res.json({ message: 'Datos guardados en la sesión' });
});

app.get('/get', (req,res) => {
    if (req.session.minFocus && req.session.minBreak) {
        res.json({ minFocus: req.session.minFocus, minBreak: req.session.minBreak});
    } else{
        res.json({ minFocus: 30, minBreak: 5 });
    }
});

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