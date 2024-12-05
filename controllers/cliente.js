const Cliente = require('../models/cliente')
const { request, response} = require('express')

// crear
const createCliente = async (req = request, 
    res = response) => {
        try{
            const { nombre, email } = req.body
            //validando usuario
            const clienteBD = await Cliente.findOne({nombre})
            if(clienteBD){
                return res.status(400).json({msg: 'ya existe el cliente'})
            }
            const data = {
              nombre, email
            }
            const cliente = new Cliente(data)
    
            await cliente.save()
            
            return res.status(201).json(cliente)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }

}

const getCliente = async (req = request, 
    res = response) => {
        console.log("trabajando en peticion")
        try{
            const clienteBD = await Cliente.find()
            return res.json(clienteBD)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateClienteByID = async (req = request,
    res = response) => {
        try{
            const { id } = req.params
            const { nombre, email } = req.body
            const fechaActualizacion = new Date()
            const data = {
                nombre,
                email,
                fechaActualizacion
            }
            const cliente  = 
                await Cliente.findByIdAndUpdate(id, data, {new: true})
            return res.status(201).json(cliente)
        }catch(e){
            console.log(e)
            return res.status(500).json({msj: 'Error'}) 
        }

}

const deleteClienteByID = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const cliente = await Cliente.findByIdAndDelete(id);

        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }

        return res.status(200).json({ msg: 'Cliente eliminado correctamente' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}

module.exports = { 
    createCliente, 
    getCliente,
    updateClienteByID,
    deleteClienteByID
}