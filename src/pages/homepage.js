import Navbar from "../components/Navbar"
import "../styling/homepage.css"

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
        </div>
      )
}

export default Homepage