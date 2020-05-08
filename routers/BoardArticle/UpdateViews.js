const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.post('/board/article/updateviews', async (req, res) => {
    console.log('Update Article View Request\n', req.body, '\n')
    let { userId, articleId, likeOrDislike } = req.body

    try {
        let object = await article.get(articleId)
        object.set('viewer', [...object.viewer, userId])  // Add userinfo into viewer array
        
        if (likeOrDislike) {
            likeOrDislike === 'like' ? 
            object.set('like', [...object.like, userId]) :
            object.set('dislike', [...object.dislike, userId])
        }
        let result = await object.save()
        console.log('Article View modified : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
