//Initalizations
var express = require('express');
var bodyParser = require('body-parser');// Required for HTTP query or post
var validator = require('validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo initialization and connect to database
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://heroku_mkb3pmd4:rth4e48hvh5c0rk58sbvht301b@ds053944.mongolab.com:53944/heroku_mkb3pmd4';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
	if(!error){
		console.log("Server Connection Successfull!");	
	}
});

var loginlist = ['mchow', 'kaytea', 'CindyLytle', 'BenHarris', 'JeremyMaletic', 'LeeMiller', 'EricDapper', 'RichRumfelt', 'VanAmmerman', 'VicJohnson', 'ErinHolleman', 'PatFitzgerald', 'CheriVasquez', 'HarleyRhoden', 'JanetGage', 'HarleyConnell', 'GlendaMaletic', 'JeffSoulen', 'MarkHair', 'RichardDrake', 'CalvinStruthers', 'LeslieDapper', 'JefflynGage', 'PaulRamsey', 'BobPicky', 'RonConnelly', 'FrancieCarmody', 'ColleenSayers', 'TomDapper', 'MatthewKerr', 'RichBiggerstaff', 'MarkHarris', 'JerryRumfelt', 'JoshWright', 'LindyContreras', 'CameronGregory', 'MarkStruthers', 'TravisJohnson', 'RobertHeller', 'CalvinMoseley', 'HawkVasquez', 'LayneDapper', 'HarleyIsdale', 'GaylaSoulen', 'MatthewRichards', 'RoyDuke', 'GaylaRodriquez', 'FrancieGeraghty', 'LisaLytle', 'ErinHair', 'CalvinGraham', 'VanRhoden', 'KeithRumfelt', 'GlendaSmith', 'KathrynJohnson', 'FredVandeVorde', 'SheriMcKelvey', 'RoyMiller', 'PatIsdale', 'JoseRodriquez', 'KelleyRumfelt', 'JanetKinsey', 'RonCampbell', 'BenKerr', 'RobDennison', 'BobOwens', 'CherylLytle', 'LisaSoulen', 'TravisDuke', 'CindyGregory', 'JoyceVandeVorde', 'MatthewScholl', 'RobJohnson', 'EricHawthorn', 'CameronRodriquez', 'JoshRamsey', 'CalvinDuke', 'SheriHeller', 'LeaAmmerman', 'LayneVasquez', 'IMConnell', 'BenHauenstein', 'ColleenKerr', 'HawkRichards', 'LeaIsdale', 'RickSoulen', 'RoyMcFatter', 'KyleContreras', 'MaryHeller', 'KathrynFitzgerald', 'JanetRiedel', 'PatHawthorn', 'KeithHauenstein', 'BenRichards', 'RickVasquez', 'KelleyAmmerman', 'EvanConnelly', 'KendallRumfelt', 'TravisIsdale', 'RobContreras', 'JavierRussell', 'ColleenCampbell', 'JeremyConnelly', 'BenKinsey', 'JanetScholl', 'PaulaLewis', 'LeslieMcFatter', 'MatthewMcAda', 'LeeMuilman', 'KyleMoseley', 'JeffRhoden', 'AnitaHolleman', 'JefflynMcKelvey', 'BobContreras', 'RobFitzgerald', 'BenJohnson'];

app.post('/sendLocation', function(req, res){//DO NOT UPSERT
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	//get the data from the post
	var login = req.body.login;
	var lat = req.body.lat;
	var lng = req.body.lng;
	var msg = req.body.message;

	if (typeof login === 'string' && !isNaN(lat) && !isNaN(lng) && typeof msg === 'string'){
		db.collection('people', function(err, col){
			if (loginlist.indexOf(login) != -1){
				col.insert({'login': login, 'lat': Number(lat), 'lng': Number(lng), 'message': msg, 'time': new Date()});
					col.find().toArray(function(error, result){
						res.send(result);
					});
			}else{
				res.send({"error":"Whoops, something is wrong with your data!"});
			}
		});
	}else{
		res.send({"error":"Whoops, something is wrong with your data!"});
	}
});

app.get('/latest.json', function(req, res){
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var login = query['login'];
	if (loginlist.indexOf(login) != -1){ // login is valid
	db.collection('people', function(err, col){
		col.find({'login': login}).sort({time: -1}).limit(1).toArray(function(err, cursor){
		if(cursor[0].login != undefined){//TIME IS DONE WRONG
			res.send('{ "_id": "' + cursor[0]._id + '", "login": "' + cursor[0].login  + '", "lat": "' + cursor[0].lat +'", "lng": "'+ cursor[0].lng +'", "message": "' +cursor[0].msg + '", "created_at": "' + cursor[0].time + '}');
		}else{
			res.send({});
		}
		});
	});
	}else{
		res.send({});
	}
});

app.get('/', function(req, res){
	var indexPage;
	db.collection('people', function(err, col){
		col.find().toArray(function(err, cursor){
			if (!err) {
				indexPage = "<!DOCTYPE HTML><html><head></head><body><h1>People:</h1>";
				for (var count=0; count<cursor.length; count++) {
					indexPage = indexPage + "<p>" + cursor[count].login + ' checked in at ' + cursor[count].lat + ', ' + cursor[count].lng + ' on ' + cursor[count].time + ' and wrote "' + cursor[count].message + '".' + "</p>";
				}
				indexPage =  indexPage + "</body></html>";
				res.send(indexPage);
			}else{
				indexPage = '<!DOCTYPE HTML><html><head></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>';
				res.send(indePage);
			}
		});
	});
});

app.listen(process.env.PORT || 3000);


