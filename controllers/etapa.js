const Etapa = require('../models/etapa')
const { request, response} = require('express')


const createEtapa = async (req = request, 
    res = response) => {
        try{
            const { nombre } = req.body
            //validando usuario
            const etapaBD = await Etapa.findOne({nombre})
            if(etapaBD){
                return res.status(400).json({msg: 'ya existe esta etapa'})
            }
            const data = {
              nombre
            }
            const etapa = new Etapa(data)
    
            await etapa.save()
            
            return res.status(201).json(etapa)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }

}

const getEtapa = async (req = request, 
    res = response) => {
        try{
            const etapaBD = await Etapa.find()
            return res.json(etapaBD)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}
const updateEtapaByID = async (req = request,
    res = response) => {
        try{
            const { id } = req.params
            const { nombre } = req.body
            const fechaActualizacion = new Date()
            const data = {
                nombre,
                
                fechaActualizacion
            }
            const etapa  = 
                await Etapa.findByIdAndUpdate(id, data, {new: true})
            return res.status(201).json(etapa)
        }catch(e){
            console.log(e)
            return res.status(500).json({msj: 'Error'}) 
        }

}

const deleteEtapaByID = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const etapa = await Etapa.findByIdAndDelete(id);

        if (!etapa) {
            return res.status(404).json({ msg: 'etapa no  encontrada' });
        }

        return res.status(200).json({ msg: 'Etapa eliminada correctamente' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Error general ' + e });
    }


}

module.exports = {
    createEtapa,
    getEtapa,
    updateEtapaByID,
    deleteEtapaByID
}