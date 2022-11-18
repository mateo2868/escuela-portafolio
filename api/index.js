const express = require('express')
const cors = require('cors')

app = express()

app.use(cors())
app.options('*', cors());

// lectura y parseo del body
app.use(express.json({limit: '150mb'}))
app.use(express.urlencoded({limit: '150mb', extended: true}));

// Directorio publico
app.use(express.static('public'))

require('./routes/index')(app)

app.listen(8080, () => {
    console.log('Servidor corriendo en puerto', 8080)
})
