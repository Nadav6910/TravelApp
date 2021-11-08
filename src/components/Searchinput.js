import "../styling/searchinput.css"
import { usePlacesWidget } from "react-google-autocomplete";



export default function Searchinput() {

    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => console.log(place)
      })

    return (
        <div className="search-input">
            <input className="search-input" ref={ref} placeholder="Where To.."></input>
        </div>
    )
}
