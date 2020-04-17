const Router = require('router')
const router = Router()

router.get('/user/signout', async (req, res) => {
  console.log('Sign out request\n', req.session, '\n')

  if (req.session.user){ 
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(404).send('error!')
        } else {
            console.log('Session destroyed : ', req.session)
            console.log('Logged out.')              
            res.status(200).send('Logged out.')
        }
    })
  } else {
    console.log('No session. Not logged in.')
    res.status(201).send('No session. Not logged in.')
  }
  console.log('\n')
})

module.exports = router;
