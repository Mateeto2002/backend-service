const { Router } = require('express')
const { createTipoProyecto, getTipoProyecto, updateTipoEquipoByID, deleteTipoProyectoByID } =
 require('../controllers/tipoProyecto')

const router = Router()

// crear
router.post('/', createTipoProyecto)

// consultar todos
router.get('/', getTipoProyecto)

router.put('/:id', updateTipoEquipoByID)

router.delete('/:id', deleteTipoProyectoByID)


module.exports = router;