const { Router } = require('express')
const { createEtapa,  getEtapa, updateEtapaByID, deleteEtapaByID} =
 require('../controllers/etapa')

const router = Router()

// crear
router.post('/', createEtapa)

// consultar todos
router.get('/', getEtapa)

router.put('/:id', updateEtapaByID)

router.delete('/:id', deleteEtapaByID)

module.exports = router;