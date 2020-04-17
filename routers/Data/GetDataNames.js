const Router = require('router')
const router = Router()
const queries = require('../../classes').dataClass()

router.get('/data/getnames', async (req, res) => {    
    let  { category } = req.query
    console.log('Fetch Request : \n', req.query)
    
    try{
        let nameOrTitle = category === 'Film' ? 'title' : 'name'
        queries[category].exists(nameOrTitle)

        let result = await queries[category].distinct(nameOrTitle)
        console.log('data : ', result)

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
    console.log('\n')
})

module.exports = router;
