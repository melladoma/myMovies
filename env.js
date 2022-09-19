//Connection BDD
var user = 'admin0';
var password = 'admin0pwd';
var bddname = 'mymoviz';
const bdd_connection_string = `mongodb+srv://${user}:${password}@cluster0.9qopya2.mongodb.net/${bddname}?retryWrites=true&w=majority`;

//API key
const apiKey = "08296b6497f508f8edacace67f1f91d1";


module.exports = { bdd_connection_string, apiKey };