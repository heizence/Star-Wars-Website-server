const Router = require('router')
const router = Router()
const reply = require('../../classes').dataClass().Reply

router.get('/board/reply/getreply', async (req, res) => {
    console.log('Get Reply Request\n', req.query)

    // Find replys related to specific comment provided by request 
    try {
        reply.equalTo('articleId', req.query.commentId)
        let result = await reply.find()
        console.log('All replies found : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
