import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { usersRouter } from './routes/users.js';
import {contactRouter} from './routes/contact.js'

dotenv.config();
console.log(process.env);
const app=express();

const PORT=process.env.PORT;

//const PORT=4000;


//app.use(cors({allowedHeaders:"*"}));  //3rd party middleware to access data
//const  MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connected");
    return client;
}
export const client=await createConnection();
app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/",(request,response)=>{
    response.send("hello");
});
app.use("/usersdata",usersRouter);
app.use("/contact",contactRouter);
app.listen(PORT,()=>console.log(`App is started ${PORT}`));