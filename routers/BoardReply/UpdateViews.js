const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/reply/updateviews', async (req, res) => {
    console.log('Update Reply View Request\n', req.body, '\n')

    const reply = require('../../classes').dataClass().Reply
    let { token, replyId, likeOrDislike } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)  // userId which gives like or dislike and view

        try {
            let object = await reply.get(replyId)

            // why object.viewer doesn't work?
            let temp = JSON.stringify(object)
            temp = JSON.parse(temp)

            if (likeOrDislike) {
                // like, dislike informations
                let likeArray = temp.like
                let dislikeArray = temp.dislike

                // updated like, dislike informations
                let updatedLikeArray = [...likeArray, userId]
                let updatedDislikeArray = [...dislikeArray, userId]

                likeOrDislike === 'like' ? 
                object.set('like', updatedLikeArray) :
                object.set('dislike', updatedDislikeArray)
            }
            let result = await object.save()
            console.log('Reply View modified : ', result)
            res.status(200).send(result)
        }
        catch(error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
    else {
        console.log('invalid token!')
        res.status(400).send('invalid token!')
    }
    console.log('\n')
})

module.exports = router;
