const Router = require('router')
const router = Router()
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.post('/updateuser', async (req, res) => {
    let { newUsername, newPassword } = req.body
    console.log('Update user request\n', req.body)
    
    try {        
        let user = await query.get(req.session.user)
        console.log('get user : ', user)

        if (newUsername) {
            user.set('username', newUsername);
        }        
        if (newPassword) {
            const secret = 'heizence';
            const hash = crypto.createHmac('sha256', secret).update(String(newPassword)).digest('hex');
            user.set('password', hash);
            req.session.userPassword = hash
        }

        let userModified = await user.save()
        console.log('User modified : ', userModified)
        console.log('Session userPassword modified : ', req.session.userPassword)
        res.status(200).send(userModified) 
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
