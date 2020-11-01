const express = require('express');
const morgan = require('morgan');
const cors=require('cors');
const { mongoose } = require('../database');

const server=express();

//MIDLEWARES
server.use(morgan('dev')); //Visualizar resultado de peticiones en servidor.
server.use(express.json());
server.use(cors({origin:'*'})); //Permitir acceso desde react.

//ROUTERS
server.use(require('../routers/maqRoutes'));

module.exports=server;