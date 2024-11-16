const Universidad = require('../models/universidad')
const { request, response} = require('express')

const createUniversidad = async (req = request, 
    res = response) => {
        try{
            const { nombre, direccion, telefono } = req.body
            //validando usuario
            const universidadBD = await Universidad.findOne({nombre})
            if(universidadBD){
                return res.status(400).json({msg: 'ya existe nombre de tipo de proyecto'})
            }
            const data = {
              nombre, direccion, telefono
            }
            const universidad = new Universidad(data)
    
            await universidad.save()
            
            return res.status(201).json(universidad)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }

}

const getUniversidad = async (req = request, 
    res = response) => {
        try{
            const universidadBD = await Universidad.find()
            return res.json(universidadBD)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}
const updateUniversidadByID = async (req = request,
    res = response) => {
        try{
            const { id } = req.params
            const { nombre, direccion, telefono } = req.body
            const fechaActualizacion = new Date()
            const data = {
                nombre,
                direccion,
                telefono,
                fechaActualizacion
            }
            const universidad  = 
                await Universidad.findByIdAndUpdate(id, data, {new: true})
            return res.status(201).json(universidad)
        }catch(e){
            console.log(e)
            return res.status(500).json({msj: 'Error'}) 
        }

}

const deleteUniversidadByID = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const universidad = await Universidad.findByIdAndDelete(id);

        if (!universidad) {
            return res.status(404).json({ msg: 'Universidad no encontrada' });
        }

        return res.status(200).json({ msg: 'Universidad eliminada correctamente' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Error general ' + e });
    }

}

module.exports = {
    createUniversidad,
    getUniversidad,
    updateUniversidadByID,
    deleteUniversidadByID
}