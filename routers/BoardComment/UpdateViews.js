const Router = require('router')
const router = Router()
const comment = require('../../classes').dataClass().Comment

router.post('/board/comment/updateviews', async (req, res) => {
    console.log('Update Comment View Request\n', req.body, '\n')
    let { userId, commentId, likeOrDislike } = req.body

    try {
        let object = await comment.get(commentId)

        if (likeOrDislike) {
            likeOrDislike === 'like' ? 
            object.set('like', [...object.like, userId]) :
            object.set('dislike', [...object.dislike, userId])
        }
        let result = await object.save()
        console.log('Comment View modified : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
