require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3001;
const userRoute = require('./routes/userRoute/user');
const authRoute = require('./routes/authRoute/auth');
const groupRoute = require('./routes/groupRoute/group');
secrets = require('./config/secrets');
const MONGO_URL =process.env.MONGO_URL||secrets.MONGO_URI || "mongodb+srv://root:root@cmpletecoding.1nw3ipx.mongodb.net/?appName=cmpletecoding"
console.log(PORT)
const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    // console.log(req)
    res.status(200).json({messge:"Successful Running Splitwise Backend"})
})
app.use('/',authRoute)
app.use('/',userRoute);
app.use('/',groupRoute)
const start = async () => {
await connectDB(MONGO_URL);
app.listen(PORT,()=>{
    console.log("server started on port :",{PORT})
})
};
start();
