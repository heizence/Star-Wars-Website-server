const Router = require('router')
const router = Router()
const queries = require('../../classes').dataClass()


router.get('/data/getdata', async (req, res) => {
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
                //console.log('key : ', key, 'temp[key] :', temp[key])
                if (temp[key] && temp[key]['__type'] === 'Relation')  {
                    let className = temp[key]['className']
                    let relationalData = []

                    await result.relation(key).query().each(async object => {
                        queries[className].equalTo('objectId', object.id)
                        let output = await queries[className].find()
                        output = output[0]        
                        relationalData.push(output.get('name') || output.get('title'))
                    })          

                    temp[key] = { 
                        type: 'relational', 
                        category: className,    // for client use
                        data: relationalData }
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
                else if (temp[key] && temp[key]['__type'] === 'Date')  {                       
                    temp[key] = temp[key]['iso']
                }
            }
            console.log('data : ', temp)            
            res.status(200).send(temp) 
        }
    } 
    catch(error) {
        console.log('error occured!', error)
        res.status(400).send(error)
    }
    console.log('\n')
})



// For saving relational data to every data

router.get('/data/saverelationaldata', async (req, res) => {
    let  { category } = req.query
    console.log('Fetch Request : \n', req.query)

    try {
        let nameOrTitle = category === 'Film' ? 'title' : 'name'
        queries[category].exists(nameOrTitle)

        let names = await queries[category].find()

        if (names.length === 0) {
            res.status(400).send('No results found')
        }
        else {
            // Putting relational Data in
            for (let i=0; i<names.length; i++) {
                result = names[i]
                // why (key in result) doesn't work?
                let temp = JSON.stringify(result)
                temp = JSON.parse(temp)
                console.log('name(title) : ', temp[nameOrTitle], 'id : ', temp.objectId)

                let allRelational = {}
                let object = await queries[category].get(temp.objectId)

                for (let key in temp) {
                    //console.log('key : ', key, 'temp[key] :', temp[key])
                    if (temp[key] && temp[key]['__type'] === 'Relation')  {
                        let className = temp[key]['className']
                        let relationalData = []

                        await result.relation(key).query().each(async object => {
                            queries[className].equalTo('objectId', object.id)
                            let output = await queries[className].find()
                            output = output[0]        
                            relationalData.push(output.get('name') || output.get('title'))
                        })          

                        allRelational[key] = { 
                            category: className,    // for client use
                            data: relationalData 
                        }
                    }
                    else if (temp[key] && temp[key]['__type'] === 'Pointer')  {
                        let className = temp[key]['className']
                        let relationalData = []

                        queries[className].equalTo('objectId', temp[key]['objectId'])
                        let output = await queries[className].find()
                        output = output[0]        
                        relationalData.push(output.get('name') || output.get('title'))       
                        allRelational[key] = { 
                            category: className,    // for client use
                            data: relationalData 
                        }
                    }
                    else if (temp[key] && temp[key]['__type'] === 'Date')  {                       
                        allRelational[key] = temp[key]['iso']
                    }
                }
                console.log('allRelationalData : ', allRelational) 
                object.set('relationalData', allRelational)
                let saved = await object.save()
                console.log('data saved : ', saved)
                console.log('\n')
            }
            console.log('success!')
            res.status(200).send('success!') 
        }
    } 
    catch(error) {
        console.log('error occured!', error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
