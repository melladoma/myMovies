var mongoose = require('mongoose')
const env = require('../env')

var user = env.user;
var password = env.password;
var port = 55492;
var bddname = env.bddname;

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(env.bdd_connection_string,
    options,
    function (err) {
        console.log(err);
    }
);