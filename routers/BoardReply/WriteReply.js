const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/reply/writereply', async (req, res) => {
    console.log('Write reply Request\n', req.body, '\n')

    const reply = require('../../classes').dataClass().newReply
    let { token, commentId, contents } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)  // userId

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
    }
    else {
        console.log('invalid token!')
        res.status(400).send('invalid token!')
    }
    console.log('\n')
})

module.exports = router;
