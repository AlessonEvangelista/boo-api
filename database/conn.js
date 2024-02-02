import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';

/**@type mongoose*/
let database;

const connect =  async() => {
    const mServer = await MongoMemoryServer. create();
    const mongoUri = mServer.getUri();

    database = await mongoose.connect(mongoUri, { dbName: "testingDb"}); 
}

export{
    connect, database
}