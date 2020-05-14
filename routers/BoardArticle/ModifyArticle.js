const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/article/modifyarticle', async (req, res) => {
    console.log('Modify Article Request\n', req.body, '\n')

    const article = require('../../classes').dataClass().Article
    let { token, articleId, newTitle, newContents } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)

        try {
            article.equalTo('writer', userId)   // to prevent other users from modifying 
            article.equalTo('objectId', articleId)
            let object = await article.find()

            // it means some other user tried to manipulate data abnormally (usually maliciously). 
            if (object.length === 0) {
                console.log("writer id and request user id don't match. This could be a malicious attack.")
                res.status(400).send('wrong approach!')
            }
            else {
                object = object[0]
                object.set('title', newTitle || object.title)
                object.set('contents', newContents || object.contents)
            
                let result = await object.save()
                console.log('Article modified : ', result)
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
