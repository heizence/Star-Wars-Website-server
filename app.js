const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
const port = 3001

const planet = require('./routers/Planet')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(planet, (req, res) => console.log('get planets!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
