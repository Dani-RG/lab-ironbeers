const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//BEER CARD PARTIAL
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

//HOME ROUTE
app.get('/', (req, res) => {
  res.render('index');
});

//BEERS ROUTE
app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi);
    res.render('beers', { beer: beersFromApi });
  })
  .catch(error => console.log(error));
})

//RANDOM BEER ROUTE
app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Random-beer from the database: ', responseFromAPI);
    res.render('random-beer', responseFromAPI[0]);
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));