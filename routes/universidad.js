const { Router } = require('express')
const { createUniversidad, getUniversidad, updateUniversidadByID, deleteUniversidadByID } =
 require('../controllers/universidad')

const router = Router()

// crear
router.post('/', createUniversidad)

// consultar todos
router.get('/', getUniversidad)

router.put('/:id', updateUniversidadByID)

router.delete('/:id', deleteUniversidadByID)

module.exports = router;