import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage"
import FlightSearchResults from "./pages/flightSearchResults"

function App() {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/flight-search-results">
            <FlightSearchResults/>
          </Route>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
