const express = require("express")
const app = express()
require("dotenv").config({path:'/Users/nadavs/Documents/WebDevelopment/travelapp/.env'})
const cors = require("cors")
const axios = require("axios").default;

// App config **
app.use(cors({ origin: "http://localhost:3000", credentials: true})) // Enable getting requests from client
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

//Post Routes **
app.post('/get-data', (req, res) => {
  let {NumberOfAdults, NumberOfChildren, AgeOfChildArray, StartDateInput, EndDateInput, searchInputValueFrom, searchInputValueTo} = req.body

  StartDateInput = StartDateInput.slice(0,10)
  EndDateInput = EndDateInput.slice(0, 10)

  const airportDataFrom = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: {q: searchInputValueFrom.split(',').shift(), limit: '10'},
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': 'b8b860b3b8msh5c1c9fa9d121e2ep120f54jsn6102f1527160'
    }
  }

  const airportDataTo = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: {q: searchInputValueTo.split(',').shift(), limit: '10'},
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': 'b8b860b3b8msh5c1c9fa9d121e2ep120f54jsn6102f1527160'
    }
  }

  axios.request(airportDataFrom).then(function (response) {
    searchInputValueFrom = response.data.items[0].iata

    axios.request(airportDataTo).then(function (response) {
      searchInputValueTo = response.data.items[0].iata
      console.log(NumberOfAdults, NumberOfChildren, AgeOfChildArray, StartDateInput, EndDateInput, searchInputValueFrom, searchInputValueTo)
      
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(function (error) {
    console.error(error);
  });

  // axios.request(airportDataTo).then(function (response) {
  //   searchInputValueTo = response.data.items[0].iata
  // }).catch(function (error) {
  //   console.error(error);
  // });

  // console.log(NumberOfAdults, NumberOfChildren, AgeOfChildArray, StartDateInput, EndDateInput, searchInputValueFrom, searchInputValueTo)
})

// Port Config **
let port = process.env.PORT;
if (port == null || port === "") {
  port = 4000;
}

app.listen(port, function() {
  console.log(`server started running on port: ${port}`);
});