const Router = require('router')
const router = Router()
const Auth = require('../commonFunctions/Auth')

router.post('/board/write', async (req, res) => {
    console.log('Write Article Request\n', req.body, '\n')

    /* 
    category must be one of three of these : newArticle, newComment, newReply
    title is only applied when category is newArticle.
    Id is only applied when category is newComment or newReply.
    */
    const query = require('../../classes').dataClass()
    let { token, category, contents, title, Id } = req.body

    if (Auth(token)) {
        let { username } = Auth(token)  // user's username
     
        query[category].set('writer', username)
        query[category].set('contents', contents)

        if (category === "newArticle") {
            query[category].set('title', title)
        }
        else if (category === "newComment") {
            query[category].set('articleId', Id)
        }
        else if (category === "newReply") {
            query[category].set('commentId', Id)
        }

        try {
            let result = await query[category].save()
            console.log('New Article saved : ', result)
            res.status(200).send(result)
        }
        catch(error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
    else {
        console.log('invalid token!')
        res.status(400).send('invalid token!')
    }
    console.log('\n')
})

module.exports = router;
