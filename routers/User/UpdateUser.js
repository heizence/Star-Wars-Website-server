const Router = require('router')
const router = Router()
const Auth = require('./Auth')
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.post('/user/updateuser', async (req, res) => {
    console.log('Update user request\n', req.body)
    let { newUsername, newPassword, token } = req.body
        
    if (Auth(token)) {
        let { objectId } = Auth(token)
        try {        
            let user = await query.get(objectId)
            console.log('get user : ', user)

            if (newUsername) {
                user.set('username', newUsername);
            }        
            if (newPassword) {
                const hash = crypto.createHmac('sha256', 'heizence')
                .update(String(newPassword)).digest('hex');
                user.set('password', hash);
            }

            let userModified = await user.save()
            console.log('User modified : ', userModified)
            res.status(200).send(userModified) 
        }
        catch(error) {
            console.log('error occured!', error)
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
