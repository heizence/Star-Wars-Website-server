const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/article/writearticle', async (req, res) => {
    console.log('Write Article Request\n', req.body, '\n')

    const article = require('../../classes').dataClass().newArticle
    let { token, title, contents } = req.body

    if (Auth(token)) {
        let { userId, username } = Auth(token)  // userId
     
        article.set('title', title)
        article.set('contents', contents)
        article.set('writer', userId)
        article.set('writerUsername', username)

        try {
            let result = await article.save()
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
