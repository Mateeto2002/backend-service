const { Router } = require('express')
const { createCliente, getCliente, updateClienteByID, deleteClienteByID} =
 require('../controllers/cliente')

const router = Router()

// crear
router.post('/', createCliente)

// consultar todos
router.get('/', getCliente)

router.put('/:id', updateClienteByID)

router.delete('/:id', deleteClienteByID)

module.exports = router;