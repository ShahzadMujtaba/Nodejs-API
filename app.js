const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();


//db connection
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true} )
.then(()=>console.log("DB Connected"))
.catch(e => console.log("DB error", e));


mongoose.connection.on('error',err=>{
    console.log(`DB connection error:${err.message}`);
})

const postRoute = require('./Route/firstPost')
const authRout = require("./Route/authRout");

//middleware
app.use(morgan("dev"))

app.use(bodyParser.json())
app.use(cookieParser())

app.use("/",postRoute)
app.use("/",authRout)



const port = 3000

app.listen(port,()=>{
    console.log(`app is running in port number ${port}`)
})