const Router = require('router')
const router = Router()
const Auth = require('../commonFunctions/Auth')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.post('/user/updateuser', async (req, res) => {
    console.log('Update user request\n', req.body)
    let { newUsername, newPassword, token } = req.body
        
    if (Auth(token)) {
        let { userId } = Auth(token)

        try {        
            let user = await query.get(userId)
            console.log('get user : ', user)
            
            if (newUsername) {
                user.set('username', newUsername);
            }        
            if (newPassword) {
                let hash = crypto.createHmac('sha256', 'heizence')
                .update(String(newPassword)).digest('hex');
                user.set('password', hash);
            }

            let userModified = await user.save()

            // why usermodified[something] doesn't work?
            userModified = JSON.parse(JSON.stringify(userModified))

            // Create a new token based on new informations and send it to a client
            let { email, password } = userModified
            const newToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60*60),
                email,
                secret: password,
                objectId: userModified.objectId
              }, 'shhhhh')
            
            let resBody = { user: userModified, token: newToken }
              
            console.log('User modified : ', userModified)
            console.log('New Token created : ', newToken)
            res.status(200).send(resBody) 
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
