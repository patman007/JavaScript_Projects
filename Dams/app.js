//Foundation
const express = require('express')

const app = express()
const request = require('request')

const bodyParser = require('body-parser')

//Body Parser
app.use(bodyParser.json({ type: 'application/*json'}))
app.use(bodyParser.urlencoded({extended: false}));

//Have the ability to use static files
//to acces them and use in public folder
app.use(express.static('public'));

//Setup Port 3000
const PORT = process.env.PORT || 3000

//Route Handlers
//Home.ejs
app.get ('/', (req, res) => {
    console.log('I am home ejs')
    res.render('home.ejs');
})

//Results.ejs
app.get('/results', (req, res) => {
    console.log('Iam the results ejs')
    //API request for NID

    let endpoint = 'https://nid.sec.usace.army.mil/api/dams/'

    //ID is enabled to randomized between any call from API
    //let url =`${endpoint}/${req.query.id}/inventory`
    //https://nid.sec.usace.army.mil/api/dams/550913/inventory
    let url = `${endpoint}${req.body.id}/inventory`
    console.log(url)

    //Request API
    request(url, function(error, response, body){
        if(!error && res.statusCode === 200) {
            console.log(response)

            //JSON parsed data
            let parsedData = JSON.parse(body);

            res.render('results.ejs', {data: parsedData});
            console.log('The data is', {data: parsedData});
        } else {

            //error handling
            res.render ('results.ejs', {data: 'Error getting data'})
        }
    });
});

//Listeners
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));