var mongoose = require('mongoose');

var FilmSchema = mongoose.Schema({
    img: String,
    title: String,
});

var FilmModel = mongoose.model('films', FilmSchema);

module.exports = FilmModel;