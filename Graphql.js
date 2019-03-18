

const {makeExecutableSchema} =require ('graphql-tools');
const cors =require ('cors');
const graphqlExpress= require ('graphql-server-express');

const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');


const graphiqlExpress= require ('graphql-server-express');
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const MONGO_URL = "mongodb+srv://imad_almoslli:denzel@cluster0-uqenx.azure.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "denzel";
var compteur = 0;


const app = express()


const homePath = '/graphql'
const URL = 'http://localhost'
const PORT = 9292


 async function main(){
  try {
 MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }

        database = client.db('denzel');
        collection = database.collection("denzel_table");
		console.log("Inserted 3 documents into the collection");

 });
    const typeDefs = [`
      type Query {
    movie(_id: String): Movie
		RandomMovie: [Movie]
		FetchMovie(limit : Int, metascore : Int) : [Movie]
		PostMovie(_id : String, date : String, review : String) : String
	  populate : Int
      }

     type Movie {
  link: String
  metascore: Int
  synopsis: String
  title: String
  year: Int
}

      schema {
        query: Query
      }
    `];
    const resolvers = {
      Query: {
        movie: async (root, {_id}) => {
          return await collection.findOne({ "id":_id})
        },
		populate: async () => {
			const sandbox = require('./sandbox');
			var movies = await sandbox.movie;
			collection.insertMany(
			movies);
          return collection.countDocuments();
        },
		RandomMovie: async () =>{
		 const movies = collection.aggregate([{$sample:{ size: 1 }}]).toArray()
		 return movies;
      },
	  FetchMovie : async(root, {limit, metascore}) =>
		  {
			  if (limit==undefined)
						{
							limit = 5;
						}

				if (metascore==undefined)
						{
							metascore = 0;
						}
			 return collection.aggregate([{$match: {"metascore" : {$gte : Number(metascore)}}},{$limit :Number(limit)}, {$sort : { "metascore" : -1}}]).toArray()
		  },

		PostMovie :  async(root, {_id, date, review}) =>
			{
				collection.updateOne({"id" : _id}, {$set : {"date" : date, "review": review}});
					return "insert into " + _id + " of the element  "+ date +" " + review+ " succesfully"
			},
      },
      }


    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });



app.use(homePath, graphqlHTTP({
    schema: schema,
    graphiql: true,
}));



    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`)
    });

  } catch (e) {
    console.log(e)
  }

}

main();
