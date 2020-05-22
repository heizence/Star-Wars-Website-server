const Router = require('router')
const router = Router()
const Auth = require('../commonFunctions/Auth')

router.get('/board/article/getarticle', async (req, res) => {
    console.log('Get Article Request\n')
    console.log('user exists? : ', req.query, '\n')

    const article = require('../../classes').dataClass().Article
    const { token } = req.query

    try {
        // Find all articles in Boardpage
        if (token && Auth(token)) {
            let { username } = Auth(token)  // username
            article.equalTo('writer', username)
        }
        else if (token && !Auth(token)) {
            console.log('invalid token!')
            res.status(400).send('invalid token!')
        }
        // Find articles written by a specific user in Mypage
        else {
            article.exists('title')
        }
        let articles = await article.find()
    
        if (articles.length === 0) {
            console.log('No results found')
            res.status(400).send('No results found')
        }
        else {
            console.log('All articles found : ', articles)
            res.status(200).send(articles)
        }
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
