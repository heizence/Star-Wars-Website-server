const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().newArticle

router.post('/board/article/writearticle', async (req, res) => {
    let { token, title, contents } = req.body
    console.log('Write Article Request\n', req.body)

    if (token.user) {
        article.set('title', title)
        article.set('contents', contents)
        article.set('writer', token.user)

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
        console.log('No user found!')
        res.status(400).send('No user found!')
    }
    console.log('\n')
})

module.exports = router;
