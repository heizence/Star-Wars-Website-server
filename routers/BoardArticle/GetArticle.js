const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.get('/board/article/getarticle', async (req, res) => {
    console.log('Get Article Request\n')

    // Find all articles 
    try {
        article.exists('title')
        let result = await article.find()
        console.log('All articles found : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
