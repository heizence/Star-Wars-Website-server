const Router = require('router')
const router = Router()
const comment = require('../../classes').dataClass().Comment

router.post('/board/comment/modifycomment', async (req, res) => {
    console.log('modify Comment Request\n', req.body, '\n')
    let { commentId, newContents } = req.body

    try {
        let object = await comment.get(commentId)
        object.set('contents', newContents || object.contents)
    
        let result = await object.save()
        console.log('Comment modified : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
