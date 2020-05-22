const Router = require('router')
const router = Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

router.post('/user/signin', async (req, res) => {
  console.log('Sign in request\n', req.body, '\n')
  
  const query = require('../../classes').userClass().query
  let { email, password } = req.body
  
  const hash = crypto.createHmac('sha256', 'heizence')
  .update(String(password)).digest('hex');
  
  query.equalTo('email', email)
  query.equalTo('password', hash)

  try {
    let user = await query.find()
    console.log('user found : ', user);

    if (user.length === 0) {
      console.log('No matching user!')
      res.status(200).send(false)
    }
    else {
      // why user[0].username doesn't work?
      let temp = JSON.stringify(user)
      temp = JSON.parse(temp)

      const token = jwt.sign({
        // expiration time : second * min * hour 
        // For example, if 60*60, jwt expires after 1 hour. If 60*60*n, jwt expires after n hours.
        exp: Math.floor(Date.now() / 1000) + (60*60*24),  // jwt is valid during 1 day.
        email,
        secret: hash,
        userId: user[0].id,
        username: temp[0].username
      }, 'shhhhh')

      let resBody = { user: user[0], token }
      
      console.log('Logged in user', user);
      console.log('Token : ', token)     
      res.status(200).send(resBody)
    }      
  }
  catch(error) {
      console.log('error occured!', error);
      res.status(400).send(error)
  }
  console.log('\n')
})

module.exports = router;
