/* eslint-disable no-console, no-process-exit */

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


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
exports.movie = sandbox (DENZEL_IMDB_ID);
