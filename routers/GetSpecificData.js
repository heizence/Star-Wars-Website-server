const Router = require('router')
const router = Router()
const queries = require('../parseInfo')

router.get('/getdata', async (req, res) => {
    let  { category, name } = req.query
    //console.log('Check query : ', category, name)

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
            //console.log('결과 확인 : ' , temp)
            for (let key in temp) {
                if (temp[key] && temp[key]['__type'] === 'Relation')  {
                    //console.log('relational object: ' , temp[key], 'key: ', key)
                    let className = temp[key]['className']

                    let relationalData = []

                    await result.relation(key).query().each(async object => {
                        queries[className].equalTo('objectId', object.id)
                        let output = await queries[className].find()
                        output = output[0]        
                        relationalData.push(output.get('name') || output.get('title'))
                    })
                    //console.log(`relational Data(${className}) : `, relationalData)            
                    temp[key] = relationalData
                    console.log('modified temp data : ', temp)
                    console.log('\n')
                }
            }
            res.status(200).send(temp) 
        }
    } 
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;
