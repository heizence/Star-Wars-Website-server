const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/comment/writecomment', async (req, res) => {
    console.log('Write Comment Request\n', req.body, '\n')

    const comment = require('../../classes').dataClass().newComment
    let { token, articleId, contents } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)  // userId

        comment.set('contents', contents)
        comment.set('writer', userId)
        comment.set('articleId', articleId)
        
        try {
            let result = await comment.save()
            console.log('New comment saved : ', result)
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
