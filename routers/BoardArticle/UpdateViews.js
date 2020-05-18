const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/article/updateviews', async (req, res) => {
    console.log('Update Article View Request\n', req.body, '\n')

    const article = require('../../classes').dataClass().Article
    let { token, articleId } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)  // userId which gives like or dislike and view

        try {
            let object = await article.get(articleId)
            console.log('article found : ', object, 'n')

            // why object.viewer doesn't work?
            let temp = JSON.stringify(object)
            temp = JSON.parse(temp)
            console.log('Check temp : ', temp, '\n')
            // viewer informations
            let arrToUpdate = temp.viewer
            let checkUser = arrToUpdate.filter(user => user === userId)

            if (checkUser.length === 0) {
                // still on progress!
                let updatedArr = [...arrToUpdate, userId] 
                object.set('viewer', updatedArr)  // Add userinfo into viewer array

                let result = await object.save()
                console.log('Article View modified : ', result)
                res.status(200).send(result)
            } 
            else {
                res.status(201).send('already viewed or writer.')
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
