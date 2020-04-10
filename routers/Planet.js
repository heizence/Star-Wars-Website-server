const Router = require('router')
const router = Router()
const queries = require('../parseInfo')

router.get('/planet', async (req, res) => {
    queries.Planet.equalTo('name', 'Tatooine')
    let result = await queries.Planet.find()
    result = result[0]
   
    // why (key in result) doesn't work?
    let temp = JSON.stringify(result)
    temp = JSON.parse(temp)

    for (let key in temp) {
        if (temp[key]['__type']) {
            console.log('relational object: ' , temp[key], 'key: ', key)
            let className = temp[key]['className']

            let relationalData = []

            await result.relation(key).query().each(async object => {
                queries[className].equalTo('objectId', object.id)
                let output = await queries[className].find()
                output = output[0]        
                relationalData.push(output.get('name') || output.get('title'))
            })
            console.log(`relational Data(${className}) : `, relationalData)            
            temp[key] = relationalData
            console.log('modified temp data : ', temp)
            console.log('\n')
        }
    }

    res.status(200).send(temp)    
})

module.exports = router;
