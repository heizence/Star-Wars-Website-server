const Router = require('router')
const router = Router()
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.post('/user/signin', async (req, res) => {
  console.log('Sign in request\n', req.body, '\n')

  if (req.session.user) {
    console.log('already logged in.', req.session.user)
    res.status(200).send('already logged in.')
  }

  else {
    let { email, password } = req.body
    
    const secret = 'heizence';
    const hash = crypto.createHmac('sha256', secret).update(String(password)).digest('hex');
    
    query.equalTo('email', email)
    query.equalTo('password', hash)

    try {
      let user = await query.find()
      console.log('user found : ', user);

      if (user.length === 0) {
        console.log('No matching user!')
      }
      else {
        req.session.user = user[0].id
        req.session.userPassword = hash   // For future use
        console.log('Logged in user', user);
        console.log('Session : ', req.session)        
      }      
      res.status(200).send(user)
    }
    catch(error) {
        console.error('Error while logging in user', error);
        res.status(400).send(error)
    }
  }
  
  console.log('\n')
})

module.exports = router;
