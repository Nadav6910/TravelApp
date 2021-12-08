import "../styling/homepage.css"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Searchinput from "../components/Searchinput"
import DateRangePicker from "../components/Daterangepicker"
import Clientnumberinput from "../components/Clientnumberinput"
import Button from '@mui/material/Button'
import Loading from "../components/Loading"
import axios from "axios"

function Homepage() {

    const [searchWidowOpen, SetSearchWidowOpen] = useState(true)
    const [flightOffersData, SetFlightOffersData] = useState([])
    const [gotFlightData, setGotFlightData] = useState(false)
    const [infoWindowOpen, setInfoWindowOpen] = useState(false)
    const [arrival, setArrival] = useState('')
    const [departure, setDeparture] = useState('')
    const [airport, setAirport] = useState('')
    const [airline, setAirline] = useState('')
    const [infoWndowAnimation, setInfoWndowAnimation] = useState(true)
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

    async function SendUserData(e){
      e.preventDefault()
      SetSearchWidowOpen(false)

      axios.post('http://localhost:4000/get-data', {
        NumberOfAdults,
        AgeOfChildArray,
        StartDateInput,
        EndDateInput,
        searchInputValueFrom,
        searchInputValueTo
      })
      .then(function(response) {
        SetFlightOffersData(response.data.data.offers)
        console.log(response.data);
      })

      .then(() => {
        setGotFlightData(true)
      })

      .catch(function (error) {
        console.log(error);
      })
    }

    function OpenInfoWindow(e){
      if (e.currentTarget.parentNode.querySelector('.vl2')){
        if (e.currentTarget.className === 'vl'){
          let arrival = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.arrival').textContent
          let departure = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.departure').textContent
          let airport = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.airport').textContent
          let airline = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.airline').textContent

          setArrival(arrival)
          setDeparture(departure)
          setAirport(airport)
          setAirline(airline)
        }
        if (e.currentTarget.className === 'vl2'){
          let arrival = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.arrival').textContent
          let departure = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.departure').textContent
          let airport = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.airport').textContent
          let airline = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.airline').textContent

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

      if (infoWndowAnimation === false){
        setInfoWndowAnimation(true)
      }

      setInfoWindowOpen(true)
      document.querySelector("body").classList.remove("unblurred-body")
      document.querySelector("body").classList.add("app-body")
    }

    function CloseInfoWindow(){
      setInfoWndowAnimation(false)
      document.querySelector("body").classList.remove("app.body")
      document.querySelector("body").classList.add("unblurred-body")
    }

    function CheckAnimationState(){
      if (infoWndowAnimation === true){
        setInfoWindowOpen(true)
      } else {
        setInfoWndowAnimation(true)
        setInfoWindowOpen(false)
      }
    }

    function msToTime(ms){
      return {
            hours: Math.trunc(ms/3600000),
            minutes: Math.trunc((ms/3600000 - Math.trunc(ms/3600000))*60) + ((ms/3600000 - Math.trunc(ms/3600000))*60 % 1 !== 0 ? 1 : 0)
          }
      }
      
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

          gotFlightData ? 

          <div className="offers-container">
            <div className="info-window" onAnimationEnd={CheckAnimationState} style={{display: !infoWindowOpen && 'none', animationName: infoWndowAnimation ? 'popup' : 'popdown'}}>
                <p className="arrival-header">Arrival:<span className="arrival-info">{arrival}</span></p>
                <p className="departure-header">Departure:<span className="departure-info">{departure}</span></p>
                <p className="airport-header">Airport:<span className="airport-info">{airport}</span></p>
                <p className="airline-header">Airline:<span className="airline-info">{airline}</span></p>
            </div>

            
            {flightOffersData.reverse().slice(0, 12).map(offer => {

              return <div key={offer.id} className="flight-offer">
                <div key={offer.slices[0].id} className={offer.slices[0].segments.length === 1 ? "first-flight-container" : offer.slices[0].segments.length === 2 ? "first-flight-container one-stop" : offer.slices[0].segments.length === 3 && "first-flight-container two-stops"}>

                  {offer.slices[0].segments.length === 1 ?

                    null : 

                    offer.slices[0].segments.length === 2 ?

                    <div style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[0].segments[0].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[0].segments[1].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[0].segments[0].destination.city_name + ` (${offer.slices[0].segments[0].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[0].segments[0].operating_carrier.name}</p>
                    </div> : 
                    
                    offer.slices[0].segments.length === 3 && 

                    <div>

                      <div className="first-stop" style={{display: 'none'}}>
                        <p className="arrival">{offer.slices[0].segments[0].arriving_at.split('T')[1]}</p>
                        <p className="departure">{offer.slices[0].segments[1].departing_at.split('T')[1]}</p>
                        <p className="airport">{offer.slices[0].segments[0].destination.city_name + ` (${offer.slices[0].segments[0].destination.iata_city_code})`}</p>
                        <p className="airline">{offer.slices[0].segments[0].operating_carrier.name}</p>
                      </div>

                      <div className="second-stop" style={{display: 'none'}}>
                        <p className="arrival">{offer.slices[0].segments[1].arriving_at.split('T')[1]}</p>
                        <p className="departure">{offer.slices[0].segments[2].departing_at.split('T')[1]}</p>
                        <p className="airport">{offer.slices[0].segments[1].destination.city_name + ` (${offer.slices[0].segments[1].destination.iata_city_code})`}</p>
                        <p className="airline">{offer.slices[0].segments[1].operating_carrier.name}</p>
                      </div>

                    </div>}

                  <span className="time-origin">{offer.slices[0].segments[0].departing_at.split('T')[1].slice(0, 5) + ' ' + offer.slices[0].segments[0].departing_at.split('T')[0].replace(offer.slices[0].segments[0].departing_at.split('T')[0].slice(0,4), offer.slices[0].segments[0].departing_at.split('T')[0].slice(2,4))}</span>
                  <span className="IATA-code-origin">{offer.slices[0].segments[0].origin.iata_city_code}</span>
                  <i className="fas fa-plane-departure"></i>

                  {offer.slices[0].segments.length === 1 ?

                    null :

                  offer.slices[0].segments.length === 2 ?

                    <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div> :

                  offer.slices[0].segments.length === 3 &&

                    <div className="vl-container">
                      <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                      <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                    </div>}

                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">{offer.slices[0].segments.slice(-1)[0].arriving_at.split('T')[1].slice(0, 5) + ' ' + offer.slices[0].segments.slice(-1)[0].arriving_at.split('T')[0].replace(offer.slices[0].segments.slice(-1)[0].arriving_at.split('T')[0].slice(0,4), offer.slices[0].segments.slice(-1)[0].arriving_at.split('T')[0].slice(2, 4))}</span>
                  <span className="IATA-code-destenation">{offer.slices[0].segments.slice(-1)[0].destination.iata_city_code}</span>

                  {offer.slices[0].segments.length === 1 ?
                    <span className="flight-stops">no stop</span> :
                   offer.slices[0].segments.length === 2 ?
                    <span className="flight-stops">one stop</span> :
                   offer.slices[0].segments.length === 3 &&
                    <span className="flight-stops">two stops</span>}
                    {console.log(flightOffersData)}
                  {offer.slices[0].segments.length === 1 ? <span className="flight-time">{msToTime(new Date(offer.slices[0].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[0].segments[0].departing_at)).hours + 'h - ' + msToTime(new Date(offer.slices[0].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[0].segments[0].departing_at)).minutes + 'm'}</span> : null}
                </div>

                <div key={offer.slices[1].id} className={offer.slices[1].segments.length === 1 ? "return-flight-container" : offer.slices[1].segments.length === 2 ? "return-flight-container one-stop" : offer.slices[1].segments.length === 3 && "return-flight-container two-stops"}>


                {offer.slices[1].segments.length === 1 ?

                null :

                offer.slices[1].segments.length === 2 ?

                  <div style={{display: 'none'}}>
                    <p className="arrival">{offer.slices[1].segments[0].arriving_at.split('T')[1]}</p>
                    <p className="departure">{offer.slices[1].segments[1].departing_at.split('T')[1]}</p>
                    <p className="airport">{offer.slices[1].segments[0].destination.city_name + ` (${offer.slices[1].segments[0].destination.iata_city_code})`}</p>
                    <p className="airline">{offer.slices[1].segments[0].operating_carrier.name}</p>
                  </div> :

                offer.slices[1].segments.length === 3 &&

                  <div>
                    <div className="first-stop" style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[1].segments[0].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[1].segments[1].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[1].segments[0].destination.city_name + ` (${offer.slices[1].segments[0].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[1].segments[0].operating_carrier.name}</p>
                    </div>

                    <div className="second-stop" style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[1].segments[1].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[1].segments[2].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[1].segments[1].destination.city_name + ` (${offer.slices[1].segments[1].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[1].segments[1].operating_carrier.name}</p>
                    </div>
                  
                </div>}

                  <span className="time-origin">{offer.slices[1].segments[0].departing_at.split('T')[1].slice(0, 5) + ' ' + offer.slices[1].segments[0].departing_at.split('T')[0].replace(offer.slices[1].segments[0].arriving_at.split('T')[0].slice(0,4), offer.slices[1].segments[0].arriving_at.split('T')[0].slice(2,4))}</span>
                  <span className="IATA-code-origin">{offer.slices[1].segments[0].origin.iata_city_code}</span>
                  <i className="fas fa-plane-departure"></i>

                  {offer.slices[1].segments.length === 1 ?

                    null :

                  offer.slices[1].segments.length === 2 ?

                    <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div> :

                  offer.slices[1].segments.length === 3 &&

                    <div className="vl-container">
                      <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                      <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                    </div>}

                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>
                  <span className="time-destenation">{offer.slices[1].segments.slice(-1)[0].arriving_at.split('T')[1].slice(0, 5) + ' ' + offer.slices[1].segments.slice(-1)[0].arriving_at.split('T')[0].replace(offer.slices[1].segments.slice(-1)[0].arriving_at.split('T')[0].slice(0,4), offer.slices[1].segments.slice(-1)[0].arriving_at.split('T')[0].slice(2, 4))}</span>
                  <span className="IATA-code-destenation">{offer.slices[1].segments.slice(-1)[0].destination.iata_city_code}</span>

                  {offer.slices[1].segments.length === 1 ?
                    <span className="flight-stops">no stop</span> :
                   offer.slices[1].segments.length === 2 ?
                    <span className="flight-stops">one stop</span> :
                   offer.slices[1].segments.length === 3 &&
                    <span className="flight-stops">two stops</span>}

                  {offer.slices[1].segments.length === 1 ? <span className="flight-time">{msToTime(new Date(offer.slices[1].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[1].segments[0].departing_at)).hours + 'h -' + msToTime(new Date(offer.slices[1].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[1].segments[0].departing_at)).minutes + 'm'}</span> : null}
                </div>

                <div className="price-and-airline-container">
                  <p className="price-header">Price:</p>
                  <p className="price-number">{offer.base_amount + '$'}</p>
                  <p className="inbound-airline">Inbound Airline:<span className="airline-span">{offer.slices[0].segments[0].operating_carrier.name}</span></p>
                  <p className="outbound-airline">Outbound Airline:<span className="airline-span">{offer.slices[1].segments.slice(-1)[0].operating_carrier.name}</span></p>
                </div>

                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
              </div>
            })} 
          </div> : <Loading/>}
          
          <Footer/>
        </div>
      )
}

export default Homepage