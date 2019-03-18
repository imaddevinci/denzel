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
		console.log("numbeeeeeeeeer"+collection.countDocuments());
		if(err) {
				return response.status(500).send(error);
		}else {response.send(collection.countDocuments());
}
	});

				  })();



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

        response.send(result[number]);
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
		// collection.insertOne(
	// obj, function(err, result) {
		// console.log("Inserted Review");
		 // res.send(result);
	// });

});

/*






 var insertDocuments = function(db, callback) {
  // Get the documents collection
  collection = database.collection("denzel_table");
  (async () => {
          var movies = await sandbox(DENZEL_IMDB_ID);
  // Insert some documents
  collection.insertMany(
   movies, function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
				  })();

}





collection.findOne({}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

*/

// myRouter.route('/piscines/:piscine_id')
// .get(function(req,res){
	  // res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.piscine_id});
// })
// .put(function(req,res){
	  // res.json({message : "Vous souhaitez modifier les informations de la piscine n°" + req.params.piscine_id});
// })
// .delete(function(req,res){
	  // res.json({message : "Vous souhaitez supprimer la piscine n°" + req.params.piscine_id});
// });
