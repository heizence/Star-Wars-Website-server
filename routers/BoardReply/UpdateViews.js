const Router = require('router')
const router = Router()
const reply = require('../../classes').dataClass().Reply

router.post('/board/reply/updateviews', async (req, res) => {
    console.log('Update Reply View Request\n', req.body, '\n')
    let { userId, replyId, likeOrDislike } = req.body

    try {
        let object = await reply.get(replyId)

        if (likeOrDislike) {
            likeOrDislike === 'like' ? 
            object.set('like', [...object.like, userId]) :
            object.set('dislike', [...object.dislike, userId])
        }
        let result = await object.save()
        console.log('Reply View modified : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
