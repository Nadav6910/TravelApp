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
    const [showChildAgesContainer, SetshowChildAgesContainer] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChildArray, SetAgeOfChildArray] = useState([])

    useEffect(() => {
        props.GetValues(NumberOfAdults, NumberOfChildren)
    }, [props ,NumberOfAdults, NumberOfChildren])

    useLayoutEffect(() => {
        // console.log(AgeOfChildArray.length)
        if (AgeOfChildArray.length === 0){
            SetshowChildAgesContainer(false)
            SetfadeRemoveChildrenBtn(true)
            SetEnsableRemoveChildrenOnClick(false)
        }
        if (NumberOfChildren === 0) {
            SetshowChooseChildAge(false)
            SetcontainerResize(false)
            SetfadeRemoveChildrenBtn(true)
            SetEnsableRemoveChildrenOnClick(false)
            SetshowChildAgesContainer(false)
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
    }, [fadeRemoveChildrenBtn, NumberOfAdults, NumberOfChildren, AgeOfChildArray, enableRemoveAdultOnClick])

    const optionsArray = []

    for (let i = 0; i < 18; i++){
        optionsArray.push(<option key={i}>{i}</option>)
    }

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
            SetAgeOfChildArray(AgeOfChildArray.slice(0, -1))
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
        SetAgeOfChildArray(AgeOfChildArray.concat(event.target.value))
        SetshowChildAgesContainer(true)
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
                value={NumberOfAdults + ' Adult' + '  -  ' + AgeOfChildArray.length + ' Children' }>
            </input>
            <i className="fas fa-user"></i>

            {WindowOpen && <div className="select-number-container" 
            onAnimationEnd={ChangeAnimation} style={{height: containerResize && '200px', animationName: containerAnimation && 'fade-out'}}>

                <div className="adults-span-container">
                    <p className="adults-span">Adults</p>
                    <RemoveCircleIcon 
                        onClick={enableRemoveAdultOnClick ? DecreseNumberAdults : undefined} 
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
                    <RemoveCircleIcon onClick={ensableRemoveChildrenOnClick ? DecreseNumberChildren : undefined} 
                        className="remove-icon" 
                        style={{color: fadeRemoveChildrenBtn && '#d3cece', cursor: ensableRemoveChildrenOnClick ? 'pointer': 'default'}} 
                        fontSize="small"/>
                        <span className="adults-selected">{AgeOfChildArray.length }</span>
                    <AddCircleIcon onClick={enableAddChildrenOnClick ? IncreseNumberChildren : undefined} 
                        className="add-icon" 
                        style={{color: fadeAddChildBtn && '#d3cece', cursor: enableAddChildrenOnClick ? 'pointer' : 'default'}} 
                        fontSize="small"/>

                    <div className="choose-child-age-container" style={{display: showChooseChildAge && 'inline'}}>
                        <br/>
                        <br/>
                        <p className="choose-age">Choose Age:</p>
                        <select value={''} className="choose-age-dropdown" onChange={HandleChooseAge}>
                            <option></option>
                            {optionsArray.map(option => {return option})}
                        </select>
                    </div>

                    <br/>
                </div>

                <div className="chosen-children-ages-container" style={{display: showChildAgesContainer && 'inline-block', bottom: showChooseChildAge && '50px'}}>
                    {AgeOfChildArray.map((age, index) => {return <div key={index}>{age}</div>})}
                </div>

            </div>}
        </div>
    )
}
