const Router = require('router')
const router = Router()

router.post('/user/checkuserinfo', async (req, res) => {
    console.log(`Check ${req.body.category} Request\n`, req.body)
    
    const query = require('../../classes').userClass().query
    let { category, subject } = req.body
   
    try {
        query.exists('username')
        query.equalTo(category, subject)
        let isExists = await query.find()
        console.log('Already exists? : ', isExists)

        if (isExists.length > 0) {
            console.log(`${category} already exists.`)
            res.status(201).send(`${category} already exists.`)
        }
        else {
            console.log(`${category} available.`)
            res.status(200).send(`${category} available.`)
        }
    }
    catch(error) {
        console.log('error occured!', error);
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
