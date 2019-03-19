/* eslint-disable no-console, no-process-exit */

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://imad_almoslli:denzel@cluster0-uqenx.azure.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "denzel";
var compteur = 0;


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
	var database, collection;
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

app.listen(9292, () => {

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }

        database = client.db('denzel');
        collection = database.collection("denzel_table");
		console.log("You are connecte");
 });
 });

 app.get("/movies/populate", (request, response) => {

	// Get the documents collection
	(async () => {

		  const sandbox = require('./sandbox');
		  var movies = await sandbox.movie;
 collection = database.collection("denzel_table");


 // Insert some documents
	collection.insertMany(
	movies, function(err, result) {
		
		if(err) {
				return response.status(500).send(err);
		}
   
response.send(result.result);
	});   

				  })();



});


app.get("/delete", (request, response) => {
  collection.remove({});
        response.send("The database is empty, <html> <b>you have to reload de database with : </b> https://imaddevinci-denzel.glitch.me/movies/populate");
    
});

app.get("/", (request, response) => {

  
  collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error + "you maybe have to populate de database with the query : <html> <h1>https://imaddevinci-denzel.glitch.me/movies/populate</h1></html>");
        }
		var number = Math.floor(Math.random() * Math.floor(result.length));
  var review=result[number].review;
    if(review==undefined){review = "There is no review yet";}
    var cover=result[number].cover;
     if(cover==undefined){cover = "There is no cover";}
			response.send(`<html> 
<head>
<h1>DENZEL</h1> 
</head>
<body> 
<p>
REST API and GraphQL of movies from one of the better actor : 
<b> Denzel Washington</b> <br> Copy and past the following links into the url </b>
</p>
<ul> 

<li> <b> To populate the collection : </b> https://imaddevinci-denzel.glitch.me/movies/populate  -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/movies/populate"> link </a></li> 
<li> <b> To have all the collection : </b> https://imaddevinci-denzel.glitch.me/denzel_table -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/denzel_table"> link </a> </li> 
<li> <b> To recuperate a random movie : </b> https://imaddevinci-denzel.glitch.me/movies  -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/movies"> link </a></li> 
<li> <b> To recuperate a movies with an id : </b> https://imaddevinci-denzel.glitch.me/movies/tt1907668 -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/movies/tt1907668"> link </a></li>
<li> <b> To search a movie with a limit and a minimum metascore : </b> https://imaddevinci-denzel.glitch.me/search?limit=5&metascore=77 -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/search?limit=5&metascore=77"> link </a></li>
<li> <b> To delete data from the database : </b> https://imaddevinci-denzel.glitch.me/delete -> you can clik here : <a href = "https://imaddevinci-denzel.glitch.me/delete"> link </a></li>
</ul>
<h2>Random movies : </h2>

            
<div style="text-align: left">
<p> <b>Title : </b>` + result[number].title +`</p>
<p> <b>Synopsis : </b>` + result[number].synopsis +`</p>
<p> <b>Cover : </b>` + cover +`</p>
<p> <b>IMDb record: </b> <a href =`+ result[number].link +`>link</a></p> 
<p> <b>Metascore : </b>` + result[number].metascore +`</p>
<p> <b>Review : </b>` + review +`</p>

<a> <img src=`+result[number].poster+`></a>
</div>
<div style="text-align: left">

</div>
</body>
</html>`);
    });
});

  app.get("/denzel_table", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


	app.get("/movies", (request, response) => {
	 collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
		var number = Math.floor(Math.random() * Math.floor(result.length));
 var review=result[number].review;
    if(review==undefined){review = "There is no review yet";}
    var cover=result[number].cover;
     if(cover==undefined){cover = "There is no cover";}
        response.send(`
<html>
<body>
<div style="text-align: left">
<p> <b>Link : </b><a href =`+ result[number].link +`>link</a></p>
<p> <b>Id : </b>` + result[number].id +`</p>
<p> <b>Rating : </b>` + result[number].rating +`</p>
<p> <b>Votes : </b>` + result[number].votes +`</p>
<p> <b>Year : </b>` + result[number].year +`</p>
<p> <b>Title : </b>` + result[number].title +`</p>
<p> <b>Synopsis : </b>` + result[number].synopsis +`</p>
<p> <b>Cover : </b>` + cover +`</p>
<p> <b>Metascore : </b>` + result[number].metascore +`</p>
<p> <b>Review : </b>` + review +`</p>
<a> <img src=`+result[number].poster+`></a>
</div>
</body>
</html>`);
    });
});

 app.get("/movies/:id", (request, response) => {

    collection.findOne({ "id": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

 app.get("/search", (request, response) => {

						console.log(request.query.limit);
						var limit=request.query.limit;
						var metascore=request.query.metascore;
						console.log(request.query.metascore);
						if (request.query.limit==undefined)
						{
							limit = 5;
 }

 if (metascore==undefined)
						{
							metascore = 0;
 }


 collection.aggregate([{$match: {"metascore" : {$gte : Number(metascore)}}},{$limit :Number(limit)}, {$sort : { "metascore" : -1}}]).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

response.send(result);

    });




});

app.post('/movies/:id', function(req, res) {
    var date = req.body.date,
        review = req.body.review;

		// var obj = {id : req.params.id, date : date, review: review};

				collection.updateOne(
				{"id" : req.params.id}, {$set : {"date" : date, "review": review}});
				res.send("insert succesfully");

});
