import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as ics from 'ics'

// console.log(process.env)

const client = new MongoClient(process.env.db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
const database = client.db(process.env.dbName);
const collection = database.collection(process.env.collectionName);

async function createUser(userdata){
    const res = await collection.insertOne(userdata);
    return res.insertedId.toString();
}
async function getUser(id){
    const res = await collection.findOne({ _id: new MongoClient.ObjectId(id) });
    if (!res) {
        throw new Error("User not found");
    }
    return res;
}

