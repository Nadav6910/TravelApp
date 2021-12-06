import "../styling/homepage.css"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Searchinput from "../components/Searchinput"
import DateRangePicker from "../components/Daterangepicker"
import Clientnumberinput from "../components/Clientnumberinput"
import Button from '@mui/material/Button'
import axios from "axios"

function Homepage() {

    const [searchWidowOpen, SetSearchWidowOpen] = useState(false)
    const [flightOffersData, SetFlightOffersData] = useState([])
    const [infoWindowOpen, setInfoWindowOpen] = useState(false)
    const [arrival, setArrival] = useState('')
    const [departure, setDeparture] = useState('')
    const [airport, setAirport] = useState('')
    const [airline, setAirline] = useState('')
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    // const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChildArray, SetAgeOfChildArray] = useState([])
    const [StartDateInput, SetStartDateInput] = useState('')
    const [EndDateInput, SetEndDateInput] = useState('')
    const [searchInputValueFrom, SetSearchInputValueFrom] = useState('')
    const [searchInputValueTo, SetSearchInputValueTo] = useState('')

    function GetValues(NumberOfAdults, NumberOfChildren, AgeOfChildArray){
      SetNumberOfAdults(NumberOfAdults) 
      // SetNumberOfChildren(NumberOfChildren)
      SetAgeOfChildArray(AgeOfChildArray)
    }

    function GetDateValues(StartDateInput, EndDateInput){
      SetStartDateInput(StartDateInput)
      SetEndDateInput(EndDateInput)
    }

    function GetPlaceValue(searchInputValueFrom, searchInputValueTo){
      SetSearchInputValueFrom(searchInputValueFrom)
      SetSearchInputValueTo(searchInputValueTo)
    }

    function SendUserData(e){
      e.preventDefault()
      SetSearchWidowOpen(false)
      
      axios.post('http://localhost:4000/get-data', {
        NumberOfAdults,
        AgeOfChildArray,
        StartDateInput,
        EndDateInput,
        searchInputValueFrom,
        searchInputValueTo
      }).then(function(response) {
        console.log(response.data)
        SetFlightOffersData(response.data) 
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    function OpenInfoWindow(e){
      if (e.currentTarget.parentNode.querySelector('.vl2')){
        if (e.currentTarget.className === 'vl'){
          let arrival = e.currentTarget.parentNode.querySelector('.first-stop').querySelector('.arrival').textContent
          let departure = e.currentTarget.parentNode.querySelector('.first-stop').querySelector('.departure').textContent
          let airport = e.currentTarget.parentNode.querySelector('.first-stop').querySelector('.airport').textContent
          let airline = e.currentTarget.parentNode.querySelector('.first-stop').querySelector('.airline').textContent

          setArrival(arrival)
          setDeparture(departure)
          setAirport(airport)
          setAirline(airline)
        }
        if (e.currentTarget.className === 'vl2'){
          let arrival = e.currentTarget.parentNode.querySelector('.second-stop').querySelector('.arrival').textContent
          let departure = e.currentTarget.parentNode.querySelector('.second-stop').querySelector('.departure').textContent
          let airport = e.currentTarget.parentNode.querySelector('.second-stop').querySelector('.airport').textContent
          let airline = e.currentTarget.parentNode.querySelector('.second-stop').querySelector('.airline').textContent

          setArrival(arrival)
          setDeparture(departure)
          setAirport(airport)
          setAirline(airline)
        }      

      } else {
        let arrival = e.currentTarget.parentNode.querySelector('.arrival').textContent
        let departure = e.currentTarget.parentNode.querySelector('.departure').textContent
        let airport = e.currentTarget.parentNode.querySelector('.airport').textContent
        let airline = e.currentTarget.parentNode.querySelector('.airline').textContent

        setArrival(arrival)
        setDeparture(departure)
        setAirport(airport)
        setAirline(airline)
      }

      setInfoWindowOpen(true)
      document.querySelector("body").classList.remove("unblurred-body")
      document.querySelector("body").classList.add("app-body")
    }

    function CloseInfoWindow(){
      setInfoWindowOpen(false)
      document.querySelector("body").classList.remove("app.body")
      document.querySelector("body").classList.add("unblurred-body")
    }

    // const oldDate = new Date("2021-04-28T13:17:31")
    // const newDate = new Date("2021-04-29T17:09:07")
    // const msToTime = (ms) => ({
    //   hours: Math.trunc(ms/3600000),
    //   minutes: Math.trunc((ms/3600000 - Math.trunc(ms/3600000))*60) + ((ms/3600000 - Math.trunc(ms/3600000))*60 % 1 !== 0 ? 1 : 0)
    // })
    // console.log(msToTime(Math.abs(newDate-oldDate)))
    
    return (

        <div className="homepage">
          <Navbar/>
          {searchWidowOpen ? 
          <div>
            <p className="about-us">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Interdum consectetur libero id faucibus nisl.
              Nam aliquam sem et tortor consequat id.
              Bibendum est ultricies integer quis auctor elit sed vulputate.
              Justo eget magna fermentum iaculis eu.
              Leo duis ut diam quam nulla. Ut tristique et egestas quis ipsum.
              Leo duis ut diam quam nulla. Ut tristique et egestas quis ipsum.
            </p>  

            <div className="user-flight-form">
              <form onSubmit={SendUserData} method="post">
                <Searchinput GetPlaceValue={GetPlaceValue}/>
                <DateRangePicker GetDateValues={GetDateValues}/>
                <Clientnumberinput GetValues={GetValues}/>
                <Button type="submit" className="search-btn" size="large" variant="outlined">Search</Button>
              </form>
            </div> 
          </div> : 

          <div className="offers-container">
            <div className="info-window" style={{display: !infoWindowOpen && 'none'}}>
                <p className="arrival-header">Arrival:<span className="arrival-info">{arrival}</span></p>
                <p className="departure-header">Departure:<span className="departure-info">{departure}</span></p>
                <p className="airport-header">Airport:<span className="airport-info">{airport}</span></p>
                <p className="airline-header">Airline:<span className="airline-info">{airline}</span></p>
            </div>

            {/* {flightOffersData.slice(0, 3).map(offer => {
              return <div className="flight-offer">
              
              </div>
            })} */}

            <div className="flight-offer">
                <div className="first-flight-container">
                  <span className="time-origin">11:30 20/12/21</span>
                  <span className="IATA-code-origin">TLV</span>
                  <i className="fas fa-plane-departure"></i>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">15:45 20/12/21</span>
                  <span className="IATA-code-destenation">AMS</span>
                  <span className="flight-stops">no stop</span>
                  <span className="flight-time">4h - 15m</span>
                </div>
                <div className="return-flight-container">
                  <span className="time-origin">17:20 25/12/21</span>
                  <span className="IATA-code-origin">AMS</span>
                  <i className="fas fa-plane-departure"></i>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">21:35 25/12/21</span>
                  <span className="IATA-code-destenation">TLV</span>
                  <span className="flight-stops">no stop</span>
                  <span className="flight-time">4h - 15m</span>
                </div>
                <div className="price-and-airline-container">
                  <p className="price-header">Price:</p>
                  <p className="price-number">345$</p>
                  <p className="inbound-airline">Inbound Airline: Lufthansa</p>
                  <p className="outbound-airline">Outbound Airline: Lufthansa</p>
                </div>
                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
            </div>

            <div className="flight-offer">
                <div div className="first-flight-container one-stop">
                  <div style={{display: 'none'}}>
                    <p className="arrival">123 </p>
                    <p className="departure">123</p>
                    <p className="airport">123</p>
                    <p className="airline">123</p>
                  </div>
                  <span className="time-origin">11:30 20/12/21</span>
                  <span className="IATA-code-origin">TLV</span>
                  <i className="fas fa-plane-departure"></i>
                  <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">15:45 20/12/21</span>
                  <span className="IATA-code-destenation">AMS</span>
                  <span className="flight-stops">one stop</span>
                </div>
                <div className="return-flight-container one-stop">
                  <div style={{display: 'none'}}>
                    <p className="arrival">abs </p>
                    <p className="departure">abs</p>
                    <p className="airport">abs</p>
                    <p className="airline">abs</p>
                  </div>
                  <span className="time-origin">17:20 25/12/21</span>
                  <span className="IATA-code-origin">AMS</span>
                  <i className="fas fa-plane-departure"></i>
                  <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">21:35 25/12/21</span>
                  <span className="IATA-code-destenation">TLV</span>
                  <span className="flight-stops">one stop</span>
                </div>
                <div className="price-and-airline-container">
                  <p className="price-header">Price:</p>
                  <p className="price-number">345$</p>
                  <p className="inbound-airline">Inbound Airline: Lufthansa</p>
                  <p className="outbound-airline">Outbound Airline: Lufthansa</p>
                </div>
                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
            </div>

            <div className="flight-offer">
                <div className="first-flight-container two-stops">
                  <div className="first-stop" style={{display: 'none'}}>
                    <p className="arrival">tbs </p>
                    <p className="departure">tbs</p>
                    <p className="airport">tbs</p>
                    <p className="airline">tbs</p>
                  </div>
                  <div className="second-stop" style={{display: 'none'}}>
                    <p className="arrival">456 </p>
                    <p className="departure">456</p>
                    <p className="airport">456</p>
                    <p className="airline">456</p>
                  </div>
                  <span className="time-origin">11:30 20/12/21</span>
                  <span className="IATA-code-origin">TLV</span>
                  <i className="fas fa-plane-departure"></i>
                  <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">15:45 20/12/21</span>
                  <span className="IATA-code-destenation">AMS</span>
                  <span className="flight-stops">two stops</span>
                </div>
                <div className="return-flight-container two-stops">
                  <div className="first-stop" style={{display: 'none'}}>
                      <p className="arrival">ssh </p>
                      <p className="departure">ssh</p>
                      <p className="airport">ssh</p>
                      <p className="airline">ssh</p>
                    </div>
                    <div className="second-stop" style={{display: 'none'}}>
                      <p className="arrival">999 </p>
                      <p className="departure">999</p>
                      <p className="airport">999</p>
                      <p className="airline">999</p>
                  </div>
                  <span className="time-origin">17:20 25/12/21</span>
                  <span className="IATA-code-origin">AMS</span>
                  <i className="fas fa-plane-departure"></i>
                  <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">21:35 25/12/21</span>
                  <span className="IATA-code-destenation">TLV</span>
                  <span className="flight-stops">two stops</span>
                </div>
                <div className="price-and-airline-container">
                  <p className="price-header">Price:</p>
                  <p className="price-number">345$</p>
                  <p className="inbound-airline">Inbound Airline: Lufthansa</p>
                  <p className="outbound-airline">Outbound Airline: Lufthansa</p>
                </div>
                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
            </div>
          </div>}
          

          {/* {console.log(NumberOfAdults, NumberOfChildren, AgeOfChildArray)}
          {console.log(StartDateInput._i, EndDateInput._i)}
          {console.log(searchInputValueFrom, searchInputValueTo)} */}
          <Footer/>
        </div>
      )
}

export default Homepage