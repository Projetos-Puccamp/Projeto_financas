require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const server = express();
const routes = require('./routes');


server.use(cors());
server.use(bodyParser.json());


server.use(express.json());
//config da  sessao
server.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
    sameSite: 'strict',
    }
}));


server.use('/api', routes);


server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});

module.exports = server;