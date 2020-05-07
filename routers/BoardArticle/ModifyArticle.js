const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.post('/board/article/modifyarticle', async (req, res) => {
    let { token, articleId, newTitle, newContents } = req.body
    console.log('Write Article Request\n', req.body)

    if (token.user) {
        try {
            let object = await article.get(articleId)
            object.set('title', newTitle || object.title)
            object.set('contents', newContents || object.contents)
        
            let result = await object.save()
            console.log('Article modified : ', result)
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
