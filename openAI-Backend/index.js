const express = require('express')
const dotenv = require('dotenv').config()
const cors =require("cors")
const port = process.env.PORT || 5000
const route = require("./src/routes/route")

const app = express()

app.use(express.json())

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });


app.use("/",route)

app.listen(port, ()=>console.log(`server started on ${port}`))