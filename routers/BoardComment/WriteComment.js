const Router = require('router')
const router = Router()
const comment = require('../../classes').dataClass().newComment

router.post('/board/comment/writecomment', async (req, res) => {
    console.log('Write Comment Request\n', req.body, '\n')
    let { userId, articleId, contents } = req.body

    comment.set('contents', contents)
    comment.set('writer', userId)
    comment.set('articleId', articleId)
    
    try {
        let result = await comment.save()
        console.log('New comment saved : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
