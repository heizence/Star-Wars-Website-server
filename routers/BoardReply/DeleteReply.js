const Router = require('router')
const router = Router()
const reply = require('../../classes').dataClass().Reply

router.delete('/board/reply/deletereply', async (req, res) => {
    console.log('Delete Reply Request\n', req.query, '\n')

    try {
        let object = await reply.get(req.query.replyId)
        let result = await object.destroy()

        console.log('Reply deleted : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
