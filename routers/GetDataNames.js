const Router = require('router')
const router = Router()
const queries = require('../parseInfo')

router.get('/getnames', async (req, res) => {
    let  { category } = req.query

    try{
        let nameOrTitle = category === 'Film' ? 'title' : 'name'
        let result = await queries[category].distinct(nameOrTitle)
        console.log('결과 확인 : ', result)

        if (result.length === 0) {
            res.status(400).send('No results found')
        }
        else {
            res.status(200).send(result)
        }
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;
