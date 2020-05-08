const Router = require('router')
const router = Router()
const comment = require('../../classes').dataClass().Comment
const reply = require('../../classes').dataClass().Reply

router.delete('/board/comment/deletecomment', async (req, res) => {
    console.log('Delete Comment Request\n', req.query, '\n')
    let { commentId } = req.query

    try {
        let object = await comment.get(commentId)

        // Find and delete all related replies
        reply.equalTo('commentId', commentId)
        let relatedReplies = await comment.find()

        for (let i=0; i<relatedReplies.length; i++) {
            await relatedReplies[i].destroy()
        }

        let result = await object.destroy()
        console.log('Comment deleted : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
