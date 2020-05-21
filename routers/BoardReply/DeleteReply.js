const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.delete('/board/reply/deletereply', async (req, res) => {
    console.log('Delete Reply Request\n', req.query, '\n')

    const reply = require('../../classes').dataClass().Reply
    let { token, replyId } = req.query

    if (Auth(token)) {
        let { userId } = Auth(token)

        try {
            reply.equalTo('writer', userId)   // to prevent other users from manipulating 
            reply.equalTo('objectId', replyId)
            let object = await reply.find()

            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]

                let result = await object.destroy()
                console.log('Reply deleted : ', result)
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
