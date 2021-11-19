/* eslint-disable no-useless-concat */
import '../styling/clientnumberinput.css'
import { useState, useEffect, useLayoutEffect } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDetectClickOutside } from 'react-detect-click-outside'

export default function Clientnumberinput(props){

    const [WindowOpen, SetWindowOpen] = useState(false)
    const [containerAnimation, SetContainerAnimation] = useState(false)
    const [fadeRemoveAdultsBtn, SetfadeRemoveAdultsBtn] = useState(false)
    const [fadeRemoveChildrenBtn, SetfadeRemoveChildrenBtn] = useState(false)
    const [fadeAddChildBtn, SetfadeAddChildBtn] = useState(false)
    const [containerResize, SetcontainerResize] = useState(false)
    const [enableAddChildrenOnClick, SetEnableAddChildrenOnClick] = useState(true)
    const [ensableRemoveChildrenOnClick, SetEnsableRemoveChildrenOnClick] = useState(false)
    const [enableRemoveAdultOnClick, SetEnableRemoveAdultOnClick] = useState(false)
    const [showChooseChildAge, SetshowChooseChildAge] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChild, SetAgeOfChild] = useState()

    useEffect(() => {
        props.GetValues(NumberOfAdults, NumberOfChildren)
    }, [props ,NumberOfAdults, NumberOfChildren])

    useLayoutEffect(() => {
        if (NumberOfChildren === 0) {
            SetshowChooseChildAge(false)
            SetcontainerResize(false)
            SetfadeRemoveChildrenBtn(true)
            SetEnsableRemoveChildrenOnClick(false)
        } else {
            SetfadeRemoveChildrenBtn(false)
            SetEnsableRemoveChildrenOnClick(true)
        }
        if (NumberOfAdults === 1){
            SetfadeRemoveAdultsBtn(true)
            SetEnableRemoveAdultOnClick(false)
        } else {
            SetfadeRemoveAdultsBtn(false)
            SetEnableRemoveAdultOnClick(true)
        }
    }, [fadeRemoveChildrenBtn, NumberOfAdults, NumberOfChildren])

    function ChangeAnimation(){
        if (containerAnimation === true){
            SetWindowOpen(false)
        }
    }

    function ChangeWindowState(){
        if (WindowOpen === false){
            SetWindowOpen(true)
            SetContainerAnimation(false)
        } else {
            SetContainerAnimation(true)
        }
    }

    function CloseWindowWhenNotFocused(){
        if (!WindowOpen === true){
            SetContainerAnimation(true)
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
        SetshowChooseChildAge(false)
        SetcontainerResize(false)
        SetfadeAddChildBtn(false)
        SetEnableAddChildrenOnClick(true)
    }

    function IncreseNumberAdults(){
        SetNumberOfAdults(NumberOfAdults + 1)
    }

    function IncreseNumberChildren(){
        SetNumberOfChildren(NumberOfChildren + 1)
        SetshowChooseChildAge(true)
        SetcontainerResize(true)
        SetfadeAddChildBtn(true)
        SetEnableAddChildrenOnClick(false)
    }

    function HandleChooseAge(event){
        SetAgeOfChild(event.target.value)
        SetshowChooseChildAge(false)
        SetcontainerResize(false)
        SetfadeAddChildBtn(false)
        SetEnableAddChildrenOnClick(true)
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
            onAnimationEnd={ChangeAnimation} style={{height: containerResize && '200px', animationName: containerAnimation && 'fade-out'}}>

                <div className="adults-span-container">
                    <p className="adults-span">Adults</p>
                    <RemoveCircleIcon 
                        onClick={enableRemoveAdultOnClick && DecreseNumberAdults} 
                        className="remove-icon" 
                        style={{color: fadeRemoveAdultsBtn && '#d3cece', cursor: enableRemoveAdultOnClick ? 'pointer' : 'default'}} 
                        fontSize="small"/>
                        <span className="adults-selected">{NumberOfAdults}</span>
                    <AddCircleIcon 
                        onClick={IncreseNumberAdults} 
                        className="add-icon" 
                        fontSize="small"/>
                </div>

                <hr className="line-break"/>
                <br/>

                <div className="children-span-container">
                    <p className="children-span">Children</p>
                    <RemoveCircleIcon onClick={ensableRemoveChildrenOnClick && DecreseNumberChildren} 
                        className="remove-icon" 
                        style={{color: fadeRemoveChildrenBtn && '#d3cece', cursor: ensableRemoveChildrenOnClick ? 'pointer': 'default'}} 
                        fontSize="small"/>
                        <span className="adults-selected">{NumberOfChildren}</span>
                    <AddCircleIcon onClick={enableAddChildrenOnClick && IncreseNumberChildren} 
                        className="add-icon" 
                        style={{color: fadeAddChildBtn && '#d3cece', cursor: enableAddChildrenOnClick ? 'pointer' : 'default'}} 
                        fontSize="small"/>

                    <div className="choose-child-age-container" style={{display: showChooseChildAge && 'inline'}}>
                        <br/>
                        <br/>
                        <p className="choose-age">Choose Age:</p>
                        <select value={''} className="choose-age-dropdown" onChange={HandleChooseAge}>
                            <option></option>
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
