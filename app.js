const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

app.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/config',(req, res, next) =>{
    res.sendFile(path.join(__dirname, 'views', 'Config.html'))
})