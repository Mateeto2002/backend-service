const TipoProyecto = require('../models/tipoProyecto')
const { request, response} = require('express')

// crear
const createTipoProyecto = async (req = request, 
    res = response) => {
        try{
            const { nombre } = req.body
            //validando usuario
            const tipoProyectoBD = await TipoProyecto.findOne({nombre})
            if(tipoProyectoBD){
                return res.status(400).json({msg: 'ya existe nombre de tipo de proyecto'})
            }
            const data = {
              nombre
            }
            const tipoProyecto = new TipoProyecto(data)
    
            await tipoProyecto.save()
            
            return res.status(201).json(tipoProyecto)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }

}

const getTipoProyecto = async (req = request, 
    res = response) => {
        try{
            const tipoProyectosBD = await TipoProyecto.find()
            return res.json(tipoProyectosBD)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateTipoEquipoByID = async (req = request,
    res = response) => {
        try{
            const { id } = req.params
            const { nombre } = req.body
            const fechaActualizacion = new Date()
            const data = {
                nombre,
                fechaActualizacion
            }
            const tipoProyecto  = 
                await TipoProyecto.findByIdAndUpdate(id, data, {new: true})
            return res.status(201).json(tipoProyecto)
        }catch(e){
            console.log(e)
            return res.status(500).json({msj: 'Error'}) 
        }

}

const deleteTipoProyectoByID = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        
        const tipoProyecto = await TipoProyecto.findByIdAndDelete(id);

        if (!tipoProyecto) {
            return res.status(404).json({ msg: 'Tipo de proyecto no encontrado' });
        }

        return res.status(200).json({ msg: 'Tipo de proyecto eliminado correctamente' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}

module.exports = { 
    createTipoProyecto, 
    getTipoProyecto,
    updateTipoEquipoByID,
    deleteTipoProyectoByID
}