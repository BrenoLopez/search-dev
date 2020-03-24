const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://semanaomnistack10:semanaomnistack10@cluster0-dinyx.mongodb.net/week10?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
app.use(cors());
app.use(express.json());  
app.use(routes);


app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});