const express = require("express")
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require ("cors")

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