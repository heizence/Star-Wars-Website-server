const Router = require('router')
const router = Router()
const article = require('../../classes').dataClass().Article
const comment = require('../../classes').dataClass().Comment
const reply = require('../../classes').dataClass().Reply

router.delete('/board/article/deletearticle', async (req, res) => {
    console.log('Delete Article Request\n', req.query, '\n')

    try {
        let object = await article.get(req.query.articleId)

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
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
