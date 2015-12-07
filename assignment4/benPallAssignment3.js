// Initialization
var express = require('express');

// Required if we need to use HTTP query or post parameters
var bodyParser = require('body-parser');
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo initialization and connect to database
// process.env.MONGOLAB_URI is the environment variable on Heroku for the MongoLab add-on
// process.env.MONGOHQ_URL is the environment variable on Heroku for the MongoHQ add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the database
var mongoUri = 'mongodb://localhost/nodemongoexample';
// process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
  db = databaseConnection;
});

app.set('port', (process.env.PORT || 10000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/sendLocation', function(request, response) {
  console.log("post happened - seriously it did!");
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Credentials', true); 
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELTE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  if (request.body.login && request.body.lat && request.body.lng && request.body.message && loginAllowed(request.body.login)) {
    var login = request.body.login;
    var lat = request.body.lat;
    var lng = request.body.lng;
    var created_at = new Date();
    var message = request.body.message;
    var toInsert = {
      "login": login,
      "lat": lat,
      "lng": lng,
      "message": message,
      "created_at": created_at,
    }
    db.collection('checkins', function(error, coll) {
      coll.insert(toInsert);
      coll.find().toArray(function(err, cursor) {
        if (!err) {
          response.send(cursor);
        }
        else {
          response.send({"error": "Whoops, something is wrong with your data!"});
        }
        });
    });
  }
  else {
    response.send({"error": "Whoops, something is wrong with your data!"});
  }
});

function loginAllowed (login) {
  var logins = ['mchow', 'kaytea', 'CindyLytle', 'BenHarris', 'JeremyMaletic', 'LeeMiller', 'EricDapper', 'RichRumfelt', 'VanAmmerman', 'VicJohnson', 'ErinHolleman', 'PatFitzgerald', 'CheriVasquez', 'HarleyRhoden', 'JanetGage', 'HarleyConnell', 'GlendaMaletic', 'JeffSoulen', 'MarkHair', 'RichardDrake', 'CalvinStruthers', 'LeslieDapper', 'JefflynGage', 'PaulRamsey', 'BobPicky', 'RonConnelly', 'FrancieCarmody', 'ColleenSayers', 'TomDapper', 'MatthewKerr', 'RichBiggerstaff', 'MarkHarris', 'JerryRumfelt', 'JoshWright', 'LindyContreras', 'CameronGregory', 'MarkStruthers', 'TravisJohnson', 'RobertHeller', 'CalvinMoseley', 'HawkVasquez', 'LayneDapper', 'HarleyIsdale', 'GaylaSoulen', 'MatthewRichards', 'RoyDuke', 'GaylaRodriquez', 'FrancieGeraghty', 'LisaLytle', 'ErinHair', 'CalvinGraham', 'VanRhoden', 'KeithRumfelt', 'GlendaSmith', 'KathrynJohnson', 'FredVandeVorde', 'SheriMcKelvey', 'RoyMiller', 'PatIsdale', 'JoseRodriquez', 'KelleyRumfelt', 'JanetKinsey', 'RonCampbell', 'BenKerr', 'RobDennison', 'BobOwens', 'CherylLytle', 'LisaSoulen', 'TravisDuke', 'CindyGregory', 'JoyceVandeVorde', 'MatthewScholl', 'RobJohnson', 'EricHawthorn', 'CameronRodriquez', 'JoshRamsey', 'CalvinDuke', 'SheriHeller', 'LeaAmmerman', 'LayneVasquez', 'IMConnell', 'BenHauenstein', 'ColleenKerr', 'HawkRichards', 'LeaIsdale', 'RickSoulen', 'RoyMcFatter', 'KyleContreras', 'MaryHeller', 'KathrynFitzgerald', 'JanetRiedel', 'PatHawthorn', 'KeithHauenstein', 'BenRichards', 'RickVasquez', 'KelleyAmmerman', 'EvanConnelly', 'KendallRumfelt', 'TravisIsdale', 'RobContreras', 'JavierRussell', 'ColleenCampbell', 'JeremyConnelly', 'BenKinsey', 'JanetScholl', 'PaulaLewis', 'LeslieMcFatter', 'MatthewMcAda', 'LeeMuilman', 'KyleMoseley', 'JeffRhoden', 'AnitaHolleman', 'JefflynMcKelvey', 'BobContreras', 'RobFitzgerald', 'BenJohnson'];
  if (logins.indexOf(login) == -1) {
    return false;
  }
  else {
    return true;
  }
}

app.get('/', function(request, response) {
  response.set('Content-Type', 'text/html');
  var indexPage = '';
  db.collection('checkins', function(er, collection) {
    collection.find().toArray(function(err, cursor) {
      if (!err) {
        indexPage += "<!DOCTYPE HTML><html><head><title>Checkins</title></head><body><h1>Checkins</h1>";
        for (var count = cursor.length - 1; count >= 0; count--) {
          indexPage += "<p>" + cursor[count].login + " checked in at location " + cursor[count].lat + ", " + 
          cursor[count].lng + ' with the message "' + cursor[count].message + '" at the time ' + cursor[count].created_at + "!</p>";
        }
        indexPage += "</body></html>"
        response.send(indexPage);
      } else {
        response.send('<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
      }
    });
  });
});

app.get('/latest.json', function(request, response) {
  var login = request.query.login;
  db.collection('checkins', function(er, collection) {
    collection.find().toArray(function(err, cursor) {
      if (!err) {
        var latestjson = "{}";
        for (var count = cursor.length - 1; count >= 0; count--) {
          if (cursor[count].login == login){
            if (latestjson == "{}" || cursor[count].created_at > latestjson.created_at) {
              latestjson = cursor[count];
            }
          }
        }
        response.send(latestjson);
      } else {
        response.send({});
      }
    });
  });
});

app.listen(process.env.PORT || 10000);