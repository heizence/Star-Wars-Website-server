const Router = require('router')
const router = Router()
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.delete('/deleteuser', async (req, res) => {
    let { password } = req.query
    console.log('Delete user request\n', req.query)
    
    const secret = 'heizence';
    const hash = crypto.createHmac('sha256', secret).update(String(password)).digest('hex');
    
    if (req.session.userPassword !== hash) {
        console.log('Password incorrect!')
        res.status(400).send('Password incorrect!')
    }
    else {
        try {        
            let user = await query.get(req.session.user)
            console.log('get user : ', user)

            let response = await user.destroy()
            console.log('User deleted : ', response)
            res.status(200).send(response) 
        }
        catch(error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
    console.log('\n')
})

module.exports = router;
