/* eslint-disable no-useless-concat */
import '../styling/clientnumberinput.css'
import { useState,useEffect } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDetectClickOutside } from 'react-detect-click-outside'
import $ from 'jquery'


export default function Clientnumberinput(props){

    useEffect(() => {
        props.GetValues(NumberOfAdults, NumberOfChildren)
        if (NumberOfChildren === 0) {
            $('.choose-child-age-container').css('display', 'none')
            $('.select-number-container').css('height', '165px')
        }
    })

    const [WindowOpen, SetWindowOpen] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChild, SetAgeOfChild] = useState()

    function ChangeAnimation(){
        if ($('.select-number-container').css('animation-name') === 'fade-out'){
            SetWindowOpen(false)
        }
    }

    function ChangeWindowState(){
        if (WindowOpen === false){
            SetWindowOpen(true)
        } else {
            $('.select-number-container').css('animation-name', 'fade-out')
        }
    }

    function CloseWindowWhenNotFocused(){
        if (!WindowOpen === true){
            $('.select-number-container').css('animation-name', 'fade-out')
        }
    }
    
    const ref = useDetectClickOutside({
        onTriggered: CloseWindowWhenNotFocused
      });

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
        $('.choose-child-age-container').css('display', 'inline')
        $('.select-number-container').css('height', '200px')
    }

    return (
        <div ref={ref} className="client-number-container">

            <input 
                readOnly
                onBlur={CloseWindowWhenNotFocused}
                onClick={ChangeWindowState} 
                className="number-input" 
                value={NumberOfAdults + ' Adult' + '  -  ' + NumberOfChildren + ' Children' }>
            </input>
            <i className="fas fa-user"></i>

            {WindowOpen && <div className="select-number-container" 
            onAnimationEnd={ChangeAnimation}>

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
                    <div className="choose-child-age-container">
                        <br/>
                        <br/>
                        <p className="choose-age">Choose Age:</p>
                        <select className="choose-age-dropdown" onChange={e => {SetAgeOfChild(e.target.value)}}> 
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                        </select>
                    </div>
                    <br/>
                </div>

            </div>}
        </div>
    )
}
