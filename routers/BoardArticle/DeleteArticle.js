const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.delete('/board/article/deletearticle', async (req, res) => {
    console.log('Delete Article Request\n', req.query, '\n')

    const article = require('../../classes').dataClass().Article
    const comment = require('../../classes').dataClass().Comment
    const reply = require('../../classes').dataClass().Reply
    const { token, articleId } = req.query

    if (Auth(token)) {
        let { userId } = Auth(token)

        try {
            article.equalTo('writer', userId)   // to prevent other users from manipulating 
            article.equalTo('objectId', articleId)
            let object = await article.find()

            // it means some other user tried to manipulate data abnormally (usually maliciously). 
            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]
                
                // Find and delete all related comments
                comment.equalTo('articleId', articleId)
                let relatedComments = await comment.find()

                for (let i=0; i<relatedComments.length; i++) {
                    // Find and delete all related replies
                    reply.equalTo('commentId', relatedComments[i].objectId)
                    let relatedReplies = await reply.find()

                    for (let j=0; j<relatedReplies.length; j++) {
                        await relatedReplies[j].destroy()
                    }
                    await relatedComments[i].destroy()
                }

                let result = await object.destroy()
                console.log('Article deleted : ', result)
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
