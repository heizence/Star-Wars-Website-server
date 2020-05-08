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

// board articles
const GetArticle = require('./routers/BoardArticle/GetArticle')
const WriteArticle = require('./routers/BoardArticle/WriteArticle')
const ModifyArticle = require('./routers/BoardArticle/ModifyArticle')
const DeleteArticle = require('./routers/BoardArticle/DeleteArticle')
const UpdateArticle = require('./routers/BoardArticle/UpdateViews')

// comments
const GetComment = require('./routers/BoardComment/GetComment')
const WriteComment = require('./routers/BoardComment/WriteComment')
const ModifyComment = require('./routers/BoardComment/ModifyComment')
const DeleteComment = require('./routers/BoardComment/DeleteComment')
const UpdateComment = require('./routers/BoardComment/UpdateViews')

// replies
const GetReply = require('./routers/BoardReply/GetReply')
const WriteReply = require('./routers/BoardReply/WriteReply')
const ModifyReply = require('./routers/BoardReply/ModifyReply')
const DeleteReply = require('./routers/BoardReply/DeleteReply')
const UpdateReply = require('./routers/BoardReply/UpdateViews')

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
    GetArticle, WriteArticle, ModifyArticle, DeleteArticle, UpdateArticle, 
    GetComment, WriteComment, ModifyComment, DeleteComment, UpdateComment,
    GetReply, WriteReply, ModifyReply, DeleteReply, UpdateReply,
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
