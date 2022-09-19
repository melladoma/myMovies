const { name } = require('ejs');
var express = require('express');
var router = express.Router();
var request = require('sync-request')
var FilmModel = require('../models/films');
const env = require('../env')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function (req, res, next) {
  const apiKey = env.apiKey

  //mise en forme de la date du jour selon format requis pour API = YYYY-MM-DD
  let newDate = new Date()
  if (newDate.getMonth() + 1 < 10) {
    var month = "0" + (newDate.getMonth() + 1)
  } else {
    month = newDate.getMonth() + 1
  }
  if (newDate.getDate() < 10) {
    var day = "0" + newDate.getDate()
  } else {
    day = newDate.getDate()
  }
  let date = `${newDate.getFullYear()}-${month}-${day}`


  var result = request('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate&include_image_language=fr`)
  var json = JSON.parse(result.body)
  res.json({ result: true, movies: json.results })
})

router.post('/wishlist-movie', async function (req, res, next) {
  var movie = new FilmModel({
    img: req.body.movieUrl,
    title: req.body.movieName
  })

  var movieSaved = await movie.save();
  var result = false;
  if (movieSaved.title) {
    result = true
  }
  let idSaved = movieSaved._id;
  let nameSaved = movieSaved.title

  res.json({ result: result, film: { idSaved, nameSaved } })
})

router.delete('/wishlist-movie/:name', async function (req, res, next) {
  let nameDecoded = decodeURI(req.params.name)
  console.log(nameDecoded)
  let returndB = await FilmModel.deleteOne({ title: nameDecoded })
  var result = false
  if (returndB.deletedCount === 1) {
    result = true
  }
  res.json({ result: result })
})

router.get('/wishlist-movie', async function (req, res, next) {
  let movieWishlist = await FilmModel.find()
  res.json({ result: true, movies: movieWishlist })
})

//url images exemples
// Machine Gun Kelly
// https://image.tmdb.org/t/p/w500/5hAqOWGbF7TiZjllAxC22XqPcjt.jpg

//"The Man From Toronto"
// https://image.tmdb.org/t/p/w500/uTCfTibqtk4f90cC59bLPMOmsfc.jpg
module.exports = router;
