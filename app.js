const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const app = express()
const port = 3001

const GetSpecificData = require('./routers/Data/GetSpecificData')
const GetDataNames = require('./routers/Data/GetDataNames')

const SignIn = require('./routers/User/SignIn')
const SignOut = require('./routers/User/SignOut')
const SignUp = require('./routers/User/SignUp')
const UpdateUser = require('./routers/User/UpdateUser')
const DeleteUser = require('./routers/User/DeleteUser')
const CheckUserInfo = require('./routers/User/CheckUserInfo')

app.set('port', port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}))
  
// Data Fetching Routers
app.use(
    GetSpecificData, GetDataNames, 
    SignIn, SignOut, SignUp, 
    UpdateUser, DeleteUser, 
    CheckUserInfo
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
