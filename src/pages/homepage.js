import "../styling/homepage.css"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Searchinput from "../components/Searchinput"
import DateRangePicker from "../components/Daterangepicker"
import Clientnumberinput from "../components/Clientnumberinput"
import Button from '@mui/material/Button'
// import axios from "axios"

function Homepage() {

  const [NumberOfAdults, SetNumberOfAdults] = useState(2)
  const [NumberOfChildren, SetNumberOfChildren] = useState(0)
  const [AgeOfChildArray, SetAgeOfChildArray] = useState([])
  const [StartDateInput, SetStartDateInput] = useState('')
  const [EndDateInput, SetEndDateInput] = useState('')
  const [SearchInputValue, SetSearchInputValue] = useState('')

    // axios.post('http://localhost:4000/get_data', {
    //   adultNumber: NumberOfAdults,
    //   childNumber: NumberOfChildren
    // }).then((response) => {
    //   console.log(response)
    // }, (error) => {
    //   console.log(error)
    // })


    function GetValues(NumberOfAdults, NumberOfChildren, AgeOfChildArray){
      SetNumberOfAdults(NumberOfAdults) 
      SetNumberOfChildren(NumberOfChildren)
      SetAgeOfChildArray(AgeOfChildArray)
    }

    function GetDateValues(StartDateInput, EndDateInput){
      SetStartDateInput(StartDateInput)
      SetEndDateInput(EndDateInput)
    }

    function GetPlaceValue(SearchInputValue){
      SetSearchInputValue(SearchInputValue)
    }

    function SendUserData(){
      // console.log(NumberOfAdults)
      // console.log(NumberOfChildren)
    }


    return (

        <div className="homepage">
          <Navbar/>
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
            <form onSubmit={SendUserData}>
              <Searchinput GetPlaceValue={GetPlaceValue}/>
              <DateRangePicker GetDateValues={GetDateValues}/>
              <Clientnumberinput GetValues={GetValues}/>
              <Button type="submit" className="search-btn" size="large" variant="outlined">Search</Button>
            </form>
          </div>
          {console.log(NumberOfAdults, NumberOfChildren, AgeOfChildArray)}
          {console.log(StartDateInput._i, EndDateInput._i)}
          {console.log(SearchInputValue)}
          <Footer/>
        </div>
      )
}

export default Homepage