const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article

router.post('/board/article/updateviews', async (req, res) => {
    let { token, articleId, likeOrDislike } = req.body
    console.log('Update Article View Request\n', req.body)

    if (token.user) {
        try {
            let object = await article.get(articleId)
            object.set('viewer', [token.user])  // add userinfo into viewer array
           
            if (likeOrDislike) {
                likeOrDislike === 'like' ? 
                object.set('like', [token.user]) :
                object.set('dislike', [token.user])
            }
            let result = await object.save()
            console.log('Article View modified : ', result)
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
