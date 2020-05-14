const Router = require('router')
const router = Router()

router.get('/board/comment/getcomment', async (req, res) => {
    console.log('Get Comment Request\n', req.query)
    const comment = require('../../classes').dataClass().Comment
    
    // Find comments related to a specific article provided by request 
    try {
        comment.equalTo('articleId', req.query.articleId)
        let result = await comment.find()
        console.log('All comments found : ', result)
        res.status(200).send(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
