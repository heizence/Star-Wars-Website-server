const express = require('express')
const cors = require('cors');
const corsOptions = {
    //origin: 'https://swapibydoheon.herokuapp.com', // for deploy
    origin: 'http://localhost:3000',    // for test
    optionsSuccessStatus: 200
}
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

// swapi data
const GetData = require('./routers/Data/GetData')

// user
const SignIn = require('./routers/User/SignIn')
const SignOut = require('./routers/User/SignOut')
const SignUp = require('./routers/User/SignUp')
const UpdateUser = require('./routers/User/UpdateUser')
const DeleteUser = require('./routers/User/DeleteUser')
const CheckUserInfo = require('./routers/User/CheckUserInfo')

// write article, comment, reply
const Write = require('./routers/commonFunctions/Write')

// update like or dislike
const ModifyLikeOrDislike = require('./routers/commonFunctions/UpdateLikeOrDislike')

// board articles
const GetArticle = require('./routers/BoardArticle/GetArticle')
const ModifyArticle = require('./routers/BoardArticle/ModifyArticle')
const DeleteArticle = require('./routers/BoardArticle/DeleteArticle')
const UpdateViews = require('./routers/BoardArticle/UpdateViews')

// comments
const GetComment = require('./routers/BoardComment/GetComment')
const ModifyComment = require('./routers/BoardComment/ModifyComment')
const DeleteComment = require('./routers/BoardComment/DeleteComment')

// replies
const GetReply = require('./routers/BoardReply/GetReply')
const ModifyReply = require('./routers/BoardReply/ModifyReply')
const DeleteReply = require('./routers/BoardReply/DeleteReply')

app.set('port', port)
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Data Fetching Routers
app.use(
    GetData, 
    SignIn, SignOut, SignUp, 
    UpdateUser, DeleteUser, 
    CheckUserInfo,

    Write, ModifyLikeOrDislike,
    GetArticle, ModifyArticle, DeleteArticle, UpdateViews, 
    GetComment, ModifyComment, DeleteComment, 
    GetReply, ModifyReply, DeleteReply, 
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
