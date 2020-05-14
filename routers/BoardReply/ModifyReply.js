const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/reply/modifyreply', async (req, res) => {
    console.log('modify Reply Request\n', req.body, '\n')

    const reply = require('../../classes').dataClass().Reply
    let { token, replyId, newContents } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)

        try {
            reply.equalTo('writer', userId)   // to prevent other users from modifying 
            reply.equalTo('objectId', replyId)
            let object = await reply.find()

            // it means some other user tried to manipulate data abnormally (usually maliciously). 
            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]
                object.set('contents', newContents || object.contents)
        
                let result = await object.save()
                console.log('Reply modified : ', result)
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
