const Router = require('router')
const router = Router()
const reply = require('../../classes').dataClass().newReply

router.post('/board/reply/writereply', async (req, res) => {
    console.log('Write reply Request\n', req.body, '\n')
    let { userId, commentId, contents } = req.body

    reply.set('contents', contents)
    reply.set('writer', userId)
    reply.set('commentId', commentId)
    
    try {
        let result = await reply.save()
        console.log('New reply saved : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
