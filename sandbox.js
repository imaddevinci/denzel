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


async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= 77);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));
    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));

return movies;
   
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
 
 	return movies;

  
}









MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
		
        database = client.db('denzel');
        collection = database.collection("denzel_table");
					
	insertDocuments(client, function() {
    client.close();
  });	

 });

 
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


