import "../styling/flightsearchresults.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"
import axios from "axios"

function FlightSearchResults() {

    useEffect(() => {
        axios.get('http://localhost:4000/get-data').then(response => {
        console.log(response)
        });
    }, [])
    
    return (

        <div className="flight-search-results">
            <Navbar/>
                <h1>hi</h1>
            <Footer/>
        </div>
      )
}

export default FlightSearchResults