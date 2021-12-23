//Foundation
const express = require('express');
const app = express();
const fetch = require('node-fetch');

const bodyParser = require('body-parser')

//Body Parser app.use
app.use(bodyParser.json({ type: 'application/json' }))

//Have the abilty to use static files app
//to access them an duse in the public folder
app.use(express.static('public'));

//establich PORT 3000 environment (env)
const PORT = process.env.PORT || 3000;

let endpoint = 'https://levees.sec.usace.army.mil:443/api/dataset/geojson.zip?full=True';

//Route Handlers
//Home.ejs
app.get('/', (req, res) => {
    console.log('I am the home ejs')
    //res.send('I am the home ejs')
    res.render('home.ejs')
})

//Results.ejs
app.get('/results', (req, res) => {
    //console.log('I am the results ejs')

    //FETCH Statement
    fetch(endpoint)

    .then(response => {
        console.log(endpoint)

        if (!response.ok) {
            //throw an error will find other errors
            //throw Error('Your response failed, please contact support at support@')
            console.log(response)
            res.send({code: 67, message: 'Your response failed, please contact support at support@'})
        } else {

            //json does parsing and returns a string
            return response.json()
        }
    })
    .then(data => {
        console.log('data is', {data: data});
        res.render('results.ejs', {data: data});
    })

    .catch(err => {
        res.status(404).send({err: 'There is an error catching'})
        res.render('results.ejs', err)
        console.log('Catch the error', err)
    });
})

//Listener
app.listen(PORT, () => console.log(`App listening on ${PORT}`));

