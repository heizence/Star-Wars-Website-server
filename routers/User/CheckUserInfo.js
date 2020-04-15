const Router = require('router')
const router = Router()
const query = require('../../classes').userClass().query

router.post('/checkuserinfo', async (req, res) => {
    let { category, subject } = req.body
    console.log('Check email or username Request\n', req.body)
    
    try {
        query.equalTo(category, subject)
        let isExists = await query.find()
        console.log('Already exists? : ', isExists)

        if (isExists.length > 0) {
            console.log(`${category} already exists.`)
            res.status(200).send(`${category} already exists.`)
        }
        else {
            console.log(`${category} available.`)
            res.status(200).send(`${category} available.`)
        }
    }
    catch(error) {
        console.error('Error while signing up user', error);
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
