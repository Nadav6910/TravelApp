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
                </div>
                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
            </div>

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
                </div>
                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
            </div>

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