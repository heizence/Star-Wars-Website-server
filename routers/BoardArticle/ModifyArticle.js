const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.post('/board/article/modifyarticle', async (req, res) => {
    console.log('Modify Article Request\n', req.body, '\n')
    let { articleId, newTitle, newContents } = req.body

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
    console.log('\n')
})

module.exports = router;
