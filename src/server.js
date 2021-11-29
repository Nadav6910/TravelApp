const express = require("express")
const app = express()
require("dotenv").config({path:'/Users/nadavs/Documents/WebDevelopment/travelapp/.env'})
const cors = require("cors")
const axios = require("axios").default;
const { Duffel } = require('@duffel/api')

// App config **
app.use(cors({ origin: "http://localhost:3000", credentials: true})) // Enable getting requests from client
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

const duffel = new Duffel({
  token: process.env.REACT_APP_DUFFEL_API_KEY,
})

// duffel.offerRequests.create({ 
//   slices : [
//     {
//       origin: "TLV",
//       destination: "NYC",
//       departure_date: "2021-12-21"
//     },
//     {
//       origin: "NYC",
//       destination: "TLV",
//       departure_date: "2021-12-25"
//     }
//   ],
//   passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
//   cabin_class: "business"
// }).then(response => console.log(response.data.offers[0].slices)).catch(err => console.log(err))

//Post Routes **
app.post('/get-data', (req, res) => {
  let {NumberOfAdults, AgeOfChildArray, StartDateInput, EndDateInput, searchInputValueFrom, searchInputValueTo} = req.body

  const passengersArray = []
  StartDateInput = StartDateInput.slice(0,10)
  EndDateInput = EndDateInput.slice(0, 10)

  for (let i = 0; i < NumberOfAdults; i++){
    passengersArray.push({type: "adult"})
  }

  AgeOfChildArray.map(age => passengersArray.push({age: age}))

  const airportDataFrom = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: {q: searchInputValueFrom.split(',').shift(), limit: '10'},
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_AERODATABOX_API_KEY
    }
  }

  const airportDataTo = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: {q: searchInputValueTo.split(',').shift(), limit: '10'},
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_AERODATABOX_API_KEY
    }
  }

  axios.request(airportDataFrom).then(function (response) {
    searchInputValueFrom = response.data.items[0].iata

    axios.request(airportDataTo).then(function (response) {
      searchInputValueTo = response.data.items[0].iata

      duffel.offerRequests.create({ 
        slices : [
          {
            origin: searchInputValueFrom,
            destination: searchInputValueTo,
            departure_date: StartDateInput
          },
          {
            origin: searchInputValueTo,
            destination: searchInputValueFrom,
            departure_date: EndDateInput
          }
        ],
        passengers: passengersArray,
        cabin_class: "business"
      }).then(response => console.log(response.data, response.data.offers[0].slices, response.data.offers[0].passengers, response.data.offers[0].conditions, response.data.offers[0].owner)).catch(err => console.log(err))

      // console.log(NumberOfAdults, NumberOfChildren, AgeOfChildArray, StartDateInput, EndDateInput, searchInputValueFrom, searchInputValueTo)
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(function (error) {
    console.error(error);
  });
})

// Port Config **
let port = process.env.PORT;

if (port == null || port === "") {
  port = 4000;
}

app.listen(port, function() {
  console.log(`server started running on port: ${port}`);
});