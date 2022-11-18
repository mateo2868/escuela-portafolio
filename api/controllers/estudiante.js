const connect = require("../connection")

const create = (req, res) => {
    const {nombres, apellidos, grado, grupo, correo, ubicacion} = req.body;
    console.log(
        `INSERT INTO estudiantes ( nombres, apellidos, grado, grupo, correo, ubicacion ) VALUES(
            '${nombres},' '${apellidos}', ${grado}, '${grupo}', '${correo}', '${ubicacion}'
        )`
    )
    connect.query(
        `INSERT INTO estudiantes ('apellidos', 'grado', 'grupo', 'correo', 'ubicacion', 'nombres')
        VALUES ('${apellidos}', '${grado}', '${grupo}', '${correo}', '${correo}', '${ubicacion}');`,
        function(err, results, fields) {
            res.json({msg: 'ok'})
        }
    );
}

const getById = (req, res) => {
    const {id} = req.params;
    connect.query(
        `SELECT * FROM estudiantes WHERE id = ${id}`,
        function(err, results, fields) {
            res.json(results[0])
        }
    );
}

const getAll = (req, res) => {
    connect.query(
        `SELECT * FROM estudiantes`,
        function(err, results, fields) {
            res.json(results);
        }
    );
}

const getAllCurso = (req, res) => {
    const  {id_estudiante} = req.params;
    connect.query(
        `SELECT * FROM cursos_estudiante where id_estudiante = ${id_estudiante}`,
        function(err, results, fields) {
            res.json(results);
        }
    );
}


const createCursoE = (req, res) => {
    const { curso_estudiante } = req.body;
    connect.query(
        `DELETE FROM cursos_estudiante WHERE id_estudiante = ${id_estudiante}`,
        function(err, results, fields) {
            for (let i = 0; i < curso_estudiante.length; i++) {
                connect.query(
                    `INSERT INTO cursos_estudiante (id_estudiante, id_curso) VALUES (${curso_estudiante[i].id_estudiante}, ${curso_estudiante[i].id_curso});`,
                    (err, results, fields) => {
                        if (curso_estudiante[i].length == (i + 1)) {
                            res.json({msg: 'ok'})
                        }
                    }
                );
            }
        }
    );
}

const update = (req, res) => {
    const {nombres, apellidos, grado, grupo, correo, ubicacion, id} = req.body;
    connect.query(
        `UPDATE estudiantes set nombres = '${nombres}', apellidos = '${apellidos}', grado = ${grado}, grupo = '${grupo}', correo = '${correo}',
         ubicacion = '${ubicacion}' WHERE id = ${id}`,
        function(err, results, fields) {
            res.json({msg: 'ok'})
        }
    );
}

const destroy = (req, res) => {
    const {id} = req.params;
    connect.query(
        `DELETE FROM estudiantes WHERE id = ${id}`,
        function(err, results, fields) {
            res.json({msg: 'ok'})
            console.log(err)
        }
    );
}
module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy,

    getAllCurso,
    createCursoE
}