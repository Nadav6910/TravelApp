const express = require("express")
require("dotenv").config({path:'/Users/nadavs/Documents/WebDevelopment/travelapp/.env'});
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require("cors")
// const fs = require('fs')
// const axios = require('axios')

// const cityCodesDataRaw = fs.readFileSync('./citycodes.json', 'utf8')
// const cityCodesData = JSON.parse(cityCodesDataRaw)

// console.log(cityCodesData.filter(entry => entry.city === 'Tel Aviv'))

// App config **
app.use(cors({ origin: "http://localhost:3000", credentials: true})) // Enable getting requests from client
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Port Config **
let port = process.env.PORT;
if (port == null || port === "") {
  port = 4000;
}

server.listen(port, function() {
  console.log(`server started running on port: ${port}`);
});