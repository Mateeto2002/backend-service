const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()

const { mongoConn } = require('./databases/configuration')
mongoConn()
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))

const tipoProyecto = require('./routes/tipoProyecto')
const universidad = require('./routes/universidad')
const cliente = require('./routes/cliente')
const etapa = require('./routes/etapa')


// middlewares
app.use('/api/tiposproyectos', tipoProyecto)
app.use('/api/universidad', universidad)
app.use('/api/cliente', cliente)
app.use('/api/etapa', etapa)


module.exports = app