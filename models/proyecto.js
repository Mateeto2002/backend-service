const { Schema, model} = require('mongoose')
const Etapa = require('../models/etapa')
const Cliente = require('../models/cliente')
const Universidad = require('../models/universidad')
const TipoProyecto = require('../models/tipoProyecto')


const ProyectoSchema = Schema({

    numero: {type: String, require: true},
    titulo: { type: String, require: true },
    fecha_iniciacion: { type: String, require: true}, 
    fecha_entrega: { type: String, require: true},
    valor: { type: String, require: true},
    fecha_creacion: { type: Date, require: true}, 
    fecha_actualizacion: { type: Date, require: true},

    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', require: true },
    tipo_proyecto: { type: Schema.Types.ObjectId, ref: 'TipoProyecto', require: true },
    universidad: { type: Schema.Types.ObjectId, ref: 'Universidad', require: true },
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa', require: true }

})

module.exports = model('Proyecto', ProyectoSchema)
