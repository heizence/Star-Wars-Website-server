const Router = require('router')
const router = Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const query = require('../../classes').userClass().query

router.post('/user/signin', async (req, res) => {
  console.log('Sign in request\n', req.body, '\n')

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
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60*60),
        email,
        secret: hash,
        objectId: user[0].id
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
