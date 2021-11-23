import "../styling/searchinput.css"
import { usePlacesWidget } from "react-google-autocomplete";
import { useState,useEffect } from "react";

export default function Searchinput(props) {

    const [searchInputValueFrom, SetSearchInputValueFrom] = useState('')
    const [searchInputValueTo, SetSearchInputValueTo] = useState('')

    useEffect(() => {
        props.GetPlaceValue(searchInputValueFrom, searchInputValueTo)
    }, [props, searchInputValueFrom, searchInputValueTo])

    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (placeFrom) => SetSearchInputValueFrom(placeFrom.formatted_address)
      })
 
    // const { ref } = usePlacesWidget({
    //     apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     onPlaceSelected: (placeTo) => SetSearchInputValueTo(placeTo.formatted_address)
    // })

    function DeleteTextFrom(){
        SetSearchInputValueFrom('')
    }

    function DeleteTextTo(){
        SetSearchInputValueTo('')
    }

    return (
        <div className="search-input-container">
            <input onChange={e => SetSearchInputValueFrom(e.target.value)} 
            value={searchInputValueFrom} 
            className="search-input-from" 
            ref={ref} 
            placeholder="From.."></input>
            {searchInputValueFrom.length > 0 ? <i onClick={DeleteTextFrom} className="fas fa-times-circle"></i> : <i className="fas fa-plane"></i>}

            <input onChange={e => SetSearchInputValueTo(e.target.value)} 
            value={searchInputValueTo} 
            className="search-input-to" 
            // ref={ref}
            placeholder="To.."></input>
            {searchInputValueTo.length > 0 ? <i onClick={DeleteTextTo} className="fas fa-times-circle"></i> : <i className="fas fa-plane"></i>}
        </div>
        
    )
}
