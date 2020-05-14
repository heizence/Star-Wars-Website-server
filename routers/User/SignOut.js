const Router = require('router')
const router = Router()
const Auth = require('../../Auth')

router.get('/user/signout', (req, res) => {
  console.log('Sign out request\n', req.query.token)

  let { token } = req.query

  if (Auth(token)) {
    console.log('Logged out.')
    res.status(200).send('Logged out')
  }
  else {
    console.log("invalid token!")
    res.status(400).send('invalid token!')
  }

  console.log('\n')
})

module.exports = router;
