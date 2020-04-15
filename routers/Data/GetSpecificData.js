const Router = require('router')
const router = Router()
const queries = require('../../parseInfo').dataClass()

router.get('/getdata', async (req, res) => {
    let  { category, name } = req.query
    console.log('Fetch Request : \n', req.query)

    try {
        let nameOrTitle = category === 'Film' ? 'title' : 'name'
        queries[category].equalTo(nameOrTitle, name)

        let result = await queries[category].find()

        if (result.length === 0) {
            res.status(400).send('No results found')
        }
        else {
            result = result[0]
            // why (key in result) doesn't work?
            let temp = JSON.stringify(result)
            temp = JSON.parse(temp)
           
            for (let key in temp) {
                if (temp[key] && temp[key]['__type'] === 'Relation')  {
                    let className = temp[key]['className']
                    let relationalData = []

                    await result.relation(key).query().each(async object => {
                        queries[className].equalTo('objectId', object.id)
                        let output = await queries[className].find()
                        output = output[0]        
                        relationalData.push(output.get('name') || output.get('title'))
                    })          

                    temp[key] = relationalData
                }
                else if (temp[key] && temp[key]['__type'] === 'Pointer')  {
                    let className = temp[key]['className']
                    let relationalData = []

                    queries[className].equalTo('objectId', temp[key]['objectId'])
                    let output = await queries[className].find()
                    output = output[0]        
                    relationalData.push(output.get('name') || output.get('title'))       
                    temp[key] = relationalData
                }
            }
            console.log('data : ', temp)            
            res.status(200).send(temp) 
        }
    } 
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;