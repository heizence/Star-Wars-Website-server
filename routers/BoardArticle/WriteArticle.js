const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.post('/board/article/writearticle', async (req, res) => {
    console.log('Write Article Request\n', req.body, '\n')
    let { userId, title, contents } = req.body

    article.set('title', title)
    article.set('contents', contents)
    article.set('writer', userId)

    try {
        let result = await article.save()
        console.log('New Article saved : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
