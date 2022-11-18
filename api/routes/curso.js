const { check } = require('express-validator')
const { create, destroy, getAll, update, getById } = require('../controllers/curso')
const { validateFields } = require('../middlewares/validateFields')

module.exports = app => {
  app.post('/curso', [
    check('nombre_curso', 'Nombre es obligatorio').not().isEmpty(), check('creditos', 'Creditos es obligatorio').not().isEmpty(),
    validateFields
  ], create)

  app.get('/curso', [], getAll)
  app.get('/curso/:id', [], getById)
  app.put('/curso', [
    check('nombre_curso', 'Nombre es obligatorio').not().isEmpty(), check('creditos', 'Creditos es obligatorio').not().isEmpty(),
    validateFields
  ], update)
  app.delete('/curso/:id', [], destroy)


}
