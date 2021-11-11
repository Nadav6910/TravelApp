/* eslint-disable no-useless-concat */
import "../styling/clientnumberinput.css"
import { useState } from "react"

export default function Clientnumberinput(){

    const [WindowOpen, SetWindowOpen] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)

    return (
        <div className="client-number-container">
            <input onClick={SetWindowOpen} className="number-input" value={NumberOfAdults + ' Adult' + '  -  ' + NumberOfChildren + ' Children' }></input>
            <i class="fas fa-user"></i>
            {WindowOpen ? <div className="select-number-container">
                <div className="adults-span-container">
                    <p className="adults-span">Adults</p>
                </div>
                <br/>
                <div className="children-span-container">
                    <p className="children-span">Children</p>
                </div>
            </div> : null}
        </div>
    )
}
