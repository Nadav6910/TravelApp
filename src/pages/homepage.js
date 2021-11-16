import "../styling/homepage.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Searchinput from "../components/Searchinput"
import DateRangePicker from "../components/Daterangepicker"
import Clientnumberinput from "../components/Clientnumberinput"
import Button from '@mui/material/Button';

function Homepage() {
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
            <Searchinput/>
            <DateRangePicker/>
            <Clientnumberinput/>
            <Button className="search-btn" size="large" variant="outlined">Search</Button>
          </div>

          <Footer/>
        </div>
      )
}

export default Homepage