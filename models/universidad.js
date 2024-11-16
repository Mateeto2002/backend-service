const {Schema, model} = require('mongoose')

const UniversidadSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    direccion: {
        type: String,
        require: [true, 'Direccion Requerida']
    },
    telefono: {
        type: String,
        require: [true, 'Telefono requerido'] 
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }

})

module.exports = model('Universidad', UniversidadSchema)