const Router = require('router')
const router = Router()
const Auth = require('./Auth')
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.delete('/user/deleteuser', async (req, res) => {
    let { password, token } = req.query
    console.log('Delete user request\n', req.query)
    
    if (Auth(token)) {
        let { secret, objectId } = Auth(token)

        const hash = crypto.createHmac('sha256', 'heizence')
        .update(String(password)).digest('hex');
        
        if (secret !== hash) {
            console.log('Password incorrect!')
            res.status(201).send('Password incorrect!')
        }
        else {
            try {        
                let user = await query.get(objectId)
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
    }
    else {
        console.log('invalid token!')
        res.status(400).send('invalid token!')
    }
    console.log('\n')
})

module.exports = router;
