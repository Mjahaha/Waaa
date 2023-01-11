const { MongoClient } = require('mongodb');
//import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://AccessMongo:zML2J0GMIej7JGrn@cluster0.ovk6k7u.mongodb.net/?retryWrites=true&w=majority';

async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Trying to connect to the MongoDB Atlas cluster...'); 
        await mongoClient.connect();
        console.log('Successfully connected to the MongoDB Atlas Cluster! Hooray!'); 
        return mongoClient;
    } catch (err) {
        console.error('Could not connect to the MongoDB Atlas Cluster. ', err); 
        process.exit();
    } 
}

async function createDocument(collection, data) {
    const mongoClient = await connectToCluster(uri);
    const db = mongoClient.db('myData'); 
    console.log(collection);
    const dbCollection = db.collection(collection);

    await dbCollection.insertOne(data);
    console.log(data);
}

//WARNING ONLY SEARCHES BY KEY 'name', I don't know how to make it work otherwise
async function findDocument(collection, name) {
    const mongoClient = await connectToCluster(uri);
    const db = mongoClient.db('myData'); 
    const dbCollection = db.collection(collection);

    const result = await dbCollection.find({ name }).toArray();
    console.log(result);
}



//connectToCluster(uri);
//createDocument('myCollection', { name : 'Joseph Campbell', email : 'joeDawg@gmail.com', password : 'ilovebigtitties'});
//findDocument('myCollection', 'name', 'Bill');

module.exports = createDocument;
