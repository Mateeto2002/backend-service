const { Router } = require('express')
const { createProyecto, getProyecto, updateProyectoByID, deleteProyectoByID} =
 require('../controllers/proyecto')

const router = Router()

// crear
router.post('/', createProyecto)

// consultar todos
router.get('/', getProyecto)

router.put('/:id', updateProyectoByID)

router.delete('/:id', deleteProyectoByID)

module.exports = router;