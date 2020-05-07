const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.delete('/board/article/deletearticle', async (req, res) => {
    let { token, articleId } = req.query
    console.log('Write Article Request\n', req.query)

    if (token.user) {
        try {
            let object = await article.get(articleId)
            let result = await object.destory()
            console.log('Article deleted : ', result)
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
