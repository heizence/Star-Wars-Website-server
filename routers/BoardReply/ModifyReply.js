const Router = require('router')
const router = Router()
const reply = require('../../classes').dataClass().Reply

router.post('/board/reply/modifyreply', async (req, res) => {
    console.log('modify Reply Request\n', req.body, '\n')
    let { replyId, newContents } = req.body

    try {
        let object = await reply.get(replyId)
        object.set('contents', newContents || object.contents)
    
        let result = await object.save()
        console.log('Reply modified : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
