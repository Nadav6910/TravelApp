import "../styling/searchinput.css"
import { usePlacesWidget } from "react-google-autocomplete";
import { useState } from "react";
import $ from 'jquery'


export default function Searchinput() {

    const [SearchInputValue, SetSearchInputValue] = useState('')

    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => console.log(place)
      })

    function DeleteText(){
        SetSearchInputValue('')
    }

    // const inputWidth = $('.search-input-container').css('width')

    // if ($('.search-input').length > 0 && $('#user_inp').val() !== ''){
    //     $('.fa-times-circle').css('width', '15px')

    // }

    return (
        <div className="search-input-container">
            <input onChange={e => SetSearchInputValue(e.target.value)} value={SearchInputValue} className="search-input" ref={ref} placeholder="Where To.."></input>
            {SearchInputValue.length > 0 ? <i onClick={DeleteText} className="fas fa-times-circle"></i> : <i className="fas fa-plane"></i>}
        </div>
    )
}
