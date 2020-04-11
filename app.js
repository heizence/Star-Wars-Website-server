const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
const port = 3001

const GetSpecificData = require('./routers/GetSpecificData')
const GetDataNames = require('./routers/GetDataNames')

app.set('port', port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Data Fetching Routers
app.use(GetSpecificData, GetDataNames)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
