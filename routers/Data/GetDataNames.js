const Router = require('router')
const router = Router()
const queries = require('../../classes').dataClass()

router.get('/data/getnames', async (req, res) => {    
    let  { category } = req.query
    console.log('Fetch Request : \n', req.query)
    
    try{
        let nameOrTitle = category === 'Film' ? 'title' : 'name'
        queries[category].exists(nameOrTitle)

        let result = await queries[category].find()

        if (result.length === 0) {
            console.log('No results found')
            res.status(400).send('No results found')
        }
        else {
            // data refactoring
            let temp = JSON.stringify(result)
            temp = JSON.parse(temp)

            for (let i=0; i<temp.length; i++) {
                // Filter all unnecessary items
                for (let key in temp[i]) {
                    if (temp[i][key] && temp[i][key]["__type"] === 'Relation') {
                        temp[i][key] = undefined
                    } 
                    else if (temp[i][key] && temp[i][key]["__type"] === 'Date') {
                        temp[i].releaseDate = temp[i].releaseDate.iso.slice(0,10)
                    }
                    else if (temp[i][key] && temp[i][key]["__type"] === 'File') {
                        temp[i].imagefile = temp[i].imagefile.url
                    }
                }
                temp[i] = {
                    ...temp[i],
                    homeworld: temp[i].homeworld,
                    pageIndex: Math.floor(i / 12) + 1   
                    // For pageIndex used in client side. Each page contains 12 items.
                }
                console.log('file : ', temp[i])
            }
            console.log('success')
            res.status(200).send(temp)
        }
    }
    catch(error) {
        console.log('error occured!', error)
        res.status(400).send(error)
    }
    console.log('\n')
})

module.exports = router;
