const Router = require('router')
const router = Router()
const Auth = require('../commonFunctions/Auth')

router.post('/board/comment/modifycomment', async (req, res) => {
    console.log('modify Comment Request\n', req.body, '\n')
    
    const comment = require('../../classes').dataClass().Comment
    let { token, commentId, newContents } = req.body

    if (Auth(token)) {
        let { username } = Auth(token)

        try {
            comment.equalTo('writer', username)   // to prevent other users from modifying 
            comment.equalTo('objectId', commentId)
            let object = await comment.find()

            // it means some other user tried to manipulate data abnormally (usually maliciously). 
            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]
                object.set('contents', newContents || object.contents)
            
                let result = await object.save()
                console.log('Comment modified : ', result)
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
