const express = require('express')
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true
};
const bodyParser = require('body-parser')

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
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Data Fetching Routers
app.use(
    GetSpecificData, GetDataNames, 
    SignIn, SignOut, SignUp, 
    UpdateUser, DeleteUser, 
    CheckUserInfo
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
