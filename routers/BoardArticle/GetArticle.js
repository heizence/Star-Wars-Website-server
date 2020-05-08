const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.get('/board/article/getarticle', async (req, res) => {
    console.log('Get Article Request\n')
    console.log('user exists? : ', req.query, '\n')

    try {
        // Find all articles in Boardpage
        if (req.query.userId) {
            article.equalTo('writer', req.query.userId)
        }
        // Find articles written by specific user in Mypage
        else {
            article.exists('title')
        }
        let articles = await article.find()
    
        if (articles.length === 0) {
            console.log('No results found')
            res.status(400).send('No results found')
        }
        else {
            console.log('All articles found : ', result)
            res.status(200).send(result)
        }
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
