const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.post('/board/comment/updateviews', async (req, res) => {
    console.log('Update Comment View Request\n', req.body, '\n')

    const comment = require('../../classes').dataClass().Comment
    let { token, commentId, likeOrDislike } = req.body

    if (Auth(token)) {
        let { userId } = Auth(token)  // userId which gives like or dislike and view

        try {
            let object = await comment.get(commentId)

            // why object.viewer doesn't work?
            let temp = JSON.stringify(object)
            temp = JSON.parse(temp)

            /* 
            like/dislike informations
            arrToUpdate is primary array and arrToUpdate2 is secondary. ex) if like request,
            arrToUpdate is like array and arrToUpdate2 is dislike array
            opposite is literally opposite component to a request. ex) if like, opposite is dislike.
            */
           let arrToUpdate, arrToUpdate2, opposite; 

           if (likeOrDislike === 'like') {
               arrToUpdate = temp.like
               arrToUpdate2 = temp.dislike
               opposite = 'dislike'
           }
           else {
               arrToUpdate = temp.dislike
               arrToUpdate2 = temp.like
               opposite = 'like'
           }

           // Check whether user has pushed like or dislike
           let checkUser = arrToUpdate.filter(user => user === userId)
            
           console.log('check user : ', checkUser)
           let updatedArr;
           // if clicked like, remove users id in a dislike array and vice versa.
           let updatedArr2 = arrToUpdate2.filter(user => user !== userId) 

           if (checkUser.length === 0) {
               updatedArr = [...arrToUpdate, userId] 
           } 
           else {
               updatedArr = arrToUpdate.filter(user => user !== userId)    // Cancel like or dislike if clicked.
           }
           
            object.set(likeOrDislike, updatedArr) 
            object.set(opposite, updatedArr2)

            let result = await object.save()
            console.log('Comment View modified : ', result)
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
