import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

import connecToMongoDb from './db/connectTOMongoDB.js';

const app = express();
dotenv.config()
const PORT =process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);


app.get("/", (req,res)=>{
    res.send("hello1234")
})

app.listen(PORT, ()=> {
    connecToMongoDb()
    console.log(`server is running on port ${PORT}`)})