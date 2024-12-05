const Proyecto = require('../models/proyecto')
const { request, response } = require('express')
const Etapa = require('../models/etapa')
const Cliente = require('../models/cliente')
const Universidad = require('../models/universidad')
const TipoProyecto = require('../models/tipoProyecto')



const createProyecto = async (req = request,
    res = response) => {
    try {

        const { numero, titulo, fecha_iniciacion, fecha_entrega, valor, cliente, tipo_proyecto, universidad, etapa } = req.body;


        const clienteDB = await Cliente.findOne({
            _id: cliente

        });
        if (!clienteDB) {
            return res.status(400).json({ msg: 'cliente invalido' })
        }

        const tipo_proyectoDB = await TipoProyecto.findOne({
            _id: tipo_proyecto._id

        })
        if (!tipo_proyectoDB) {
            return res.status(400).json({ msg: 'Tipo de proyecto invalido' })
        }
        // validando estado
        const universidadDB = await Universidad.findOne({
            _id: universidad._id

        })
        if (!universidadDB) {
            return res.status(400).json({ msg: 'Universidad invalida' })
        }

        const etapaDB = await Etapa.findOne({
            _id: etapa._id

        })
        if (!etapaDB) {
            return res.status(400).json({ msg: 'Etapa invalida' })
        }

        const data = {
            numero,
            titulo,
            fecha_iniciacion,
            fecha_entrega,
            valor,
            cliente: clienteDB._id,
            tipo_proyecto: tipo_proyectoDB._id,
            universidad: universidadDB._id,
            etapa: etapaDB._id
        }

        const proyecto = new Proyecto(data)

        await proyecto.save()

        return res.status(201).json(proyecto)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyecto = async (req = request,
    res = response) => {
    try {

        const proyectos = await Proyecto.find()
            .populate('cliente', 'nombre email')
            .populate('tipo_proyecto', 'nombre')
            .populate('universidad', 'nombre')
            .populate('etapa', 'nombre');

        if (proyectos.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron proyectos' });
        }

        return res.json(proyectos)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


const updateProyectoByID = async (req = request, res = response) => {
    try {
        const { id } = req.params;  // El ID del proyecto que se actualizará
        const { numero, titulo, fecha_iniciacion, fecha_entrega, valor, cliente, tipo_proyecto, universidad, etapa } = req.body;

        // Buscar el proyecto por ID
        const proyectoDB = await Proyecto.findById(id);

        if (!proyectoDB) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Validar cliente
        const clienteDB = await Cliente.findOne({ _id: cliente });
        if (!clienteDB) {
            return res.status(400).json({ msg: 'Cliente invalido' });
        }

        // Validar tipo de proyecto
        const tipoProyectoDB = await TipoProyecto.findOne({ _id: tipo_proyecto });
        if (!tipoProyectoDB) {
            return res.status(400).json({ msg: 'Tipo de proyecto invalido' });
        }

        // Validar universidad
        const universidadDB = await Universidad.findOne({ _id: universidad });
        if (!universidadDB) {
            return res.status(400).json({ msg: 'Universidad invalida' });
        }

        // Validar etapa
        const etapaDB = await Etapa.findOne({ _id: etapa });
        if (!etapaDB) {
            return res.status(400).json({ msg: 'Etapa invalida' });
        }

        // Actualizar los datos del proyecto
        const data = {
            numero,
            titulo,
            fecha_iniciacion,
            fecha_entrega,
            valor,
            cliente,
            tipo_proyecto,
            universidad,
            etapa,
            fecha_actualizacion: new Date()  // Actualizar la fecha de actualización
        };

        // Actualizar el proyecto en la base de datos
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json(proyectoActualizado);
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general: ' + e.message
        });
    }
};

const deleteProyectoByID = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const proyectoBD = await Proyecto.findById(id)

        if (!proyectoBD) {
            return res.status(404).json({ msg: 'Proyecto no existente ' })
        }

        await Proyecto.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Proyecto eliminado exitosamente' })

    } catch (e) {
        return res.status(500).json({
            msg: 'Error general: ' + e
        });
    }
}



module.exports = { createProyecto, getProyecto, updateProyectoByID, deleteProyectoByID }