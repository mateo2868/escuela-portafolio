const connect = require("../connection")

const create = (req, res) => {
    const {nombre_curso, creditos} = req.body;
    connect.query(
        `INSERT INTO cursos (nombre_curso, creditos) VALUES('${nombre_curso}', '${creditos}')`,
        function(err, results, fields) {
            res.json({msg: 'ok'})
        }
    );
}

const getById = (req, res) => {
    const {id} = req.params;
    connect.query(
        `SELECT * FROM cursos WHERE id = ${id}`,
        function(err, results, fields) {
            res.json(results[0])
        }
    );
}

const getAll = (req, res) => {
    connect.query(
        `SELECT * FROM cursos`,
        function(err, results, fields) {
            res.json(results);
        }
    );
}

const update = (req, res) => {
    const {nombre_curso, creditos, id} = req.body;
    connect.query(
        `UPDATE cursos set nombre_curso = '${nombre_curso}', creditos = ${creditos} WHERE id = ${id}`,
        function(err, results, fields) {
            res.json({msg: 'ok'})
        }
    );
}

const destroy = (req, res) => {
    const {id} = req.params;
    connect.query(
        `DELETE FROM cursos WHERE id = ${id}`,
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
    destroy
}