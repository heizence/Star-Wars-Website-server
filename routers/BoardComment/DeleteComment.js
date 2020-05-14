const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.delete('/board/comment/deletecomment', async (req, res) => {
    console.log('Delete Comment Request\n', req.query, '\n')

    const comment = require('../../classes').dataClass().Comment
    const reply = require('../../classes').dataClass().Reply
    let { token, commentId } = req.query

    if (Auth(token)) {
        let { userId } = Auth(token)

        try {
            comment.equalTo('writer', userId)   // to prevent other users from manipulating 
            comment.equalTo('objectId', commentId)
            let object = await comment.get(commentId)

            // it means some other user tried to manipulate data abnormally (usually maliciously). 
            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]

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
