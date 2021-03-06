const Router = require('router')
const router = Router()
const crypto = require('crypto')

router.post('/user/signup', async (req, res) => {
    const user = require('../../classes').userClass().user
    
    let { username, email, password } = req.body
    console.log('Sign up Request\n', req.body)
    
    const hash = crypto.createHmac('sha256', 'heizence')
    .update(String(password)).digest('hex');

    user.set('email', email);
    user.set('username', username);
    user.set('password', hash);
    
    try {
        let userSignedUp = await user.save()
        console.log('User signed up', userSignedUp);
        res.status(200).send(userSignedUp)
    }
    catch(error) {
        console.error('Error while signing up user', error);
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
