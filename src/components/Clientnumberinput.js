/* eslint-disable no-useless-concat */
import "../styling/clientnumberinput.css"
import { useState } from "react"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDetectClickOutside } from 'react-detect-click-outside'


export default function Clientnumberinput(){

    const [WindowOpen, SetWindowOpen] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)

    function ChangeWindowState(){
        SetWindowOpen(!WindowOpen)
    }

    const ref = useDetectClickOutside({
        onTriggered: CloseWindowWhenNotFocused
      });

    function CloseWindowWhenNotFocused(){
        if (!WindowOpen === true){
            SetWindowOpen(false)
        }
    }

    function DecreseNumberAdults(){
        if (NumberOfAdults > 1){
            SetNumberOfAdults(NumberOfAdults - 1)
        }
    }

    function DecreseNumberChildren(){
        if (NumberOfChildren > 0){
            SetNumberOfChildren(NumberOfChildren - 1)
        }
    }

    function IncreseNumberAdults(){
        SetNumberOfAdults(NumberOfAdults + 1)
}

    function IncreseNumberChildren(){
            SetNumberOfChildren(NumberOfChildren + 1)
    }

    return (
        <div ref={ref} className="client-number-container">
            <input 
                onBlur={CloseWindowWhenNotFocused}
                onClick={ChangeWindowState} 
                className="number-input" 
                value={NumberOfAdults + ' Adult' + '  -  ' + NumberOfChildren + ' Children' }>
            </input>
            <i class="fas fa-user"></i>
            {WindowOpen ? <div className="select-number-container">
                <div className="adults-span-container">
                    <p className="adults-span">Adults</p>
                    <RemoveCircleIcon onClick={DecreseNumberAdults} className="remove-icon" fontSize="small"/>
                    <span className="adults-selected">{NumberOfAdults}</span>
                    <AddCircleIcon onClick={IncreseNumberAdults} className="add-icon" fontSize="small"/>
                </div>
                <hr className="line-break"/>
                <br/>
                <div className="children-span-container">
                    <p className="children-span">Children</p>
                    <RemoveCircleIcon onClick={DecreseNumberChildren} className="remove-icon" fontSize="small"/>
                    <span className="adults-selected">{NumberOfChildren}</span>
                    <AddCircleIcon onClick={IncreseNumberChildren} className="add-icon" fontSize="small"/>
                </div>
            </div> : null}
        </div>
    )
}
