const { check } = require('express-validator')
const { create, destroy, getAllCurso, update, getAll, getById, createCursoE} = require('../controllers/estudiante')
const { validateFields } = require('../middlewares/validateFields')

module.exports = app => {
  app.post('/estudiante', [
    check('nombres', 'Nombre es obligatorio').isString(),
    check('apellidos', 'Apellidos es obligatorio').isString(),
    check('grado', 'grado es obligatorio').isNumeric(),
    check('grupo', 'grupo es obligatorio').isString(),
    check('correo', 'Correo es obligatorio').isEmail(),
    check('ubicacion', 'Ubicacion es obligatorio').isString(),
    validateFields
  ], create)
  app.get('/estudiante', [], getAll)
  app.get('/estudiante/:id', [], getById)
  app.put('/estudiante', [
    check('nombres', 'Nombres es obligatorio').isString(),
    check('apellidos', 'Apellidos es obligatorio').isString(),
    check('grado', 'Grado es obligatorio').isNumeric(),
    check('grupo', 'Grupo es obligatorio').isString(),
    check('correo', 'Correo es obligatorio').isEmail(),
    check('ubicacion', 'Ubicacion es obligatorio').isString(),
    validateFields
  ], update)
  app.delete('/estudiante/:id', [], destroy)


  app.post('/estudiante/cursos', [
    check('id_estudiante', 'Estudiante es obligatorio').isNumeric(),
    check('id_curso', 'Curso es obligatorio').isNumeric(),
    validateFields
  ], createCursoE)
  app.get('/estudiante/cursos/:id_estudiante', [], getAllCurso)

}
