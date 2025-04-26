import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdOutlineGroups, MdOutlinePerson, MdOutlineManageAccounts } from "react-icons/md";

const BottomBar = (props) => {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const location = useLocation()
  const [activeButton, setActiveButton] = useState("home") 
  
  const toggleButton = (buttonName) => {
    setActiveButton(buttonName)
  }

  const getButtonStyle = (buttonName) => {
    if (activeButton === buttonName) {
      return props.theme === "bg-black" ? "bg-zinc-700" : "bg-zinc-300";
    } 
    else {
      return "bg-transparent";
    }
  };

  return (
    <div className={`shadow-2xl w-full h-20 fixed flex bottom-0 bg-opacity-50 backdrop-blur-lg ${props.theme} ${props.theme==="bg-black"?"text-white":"text-black"} ${location.pathname==="/login" || location.pathname==="/signup" || location.pathname==="/" ?"hidden":""}`}>
      <div className='w-1/4 h-full p-3 flex flex-col items-center justify-center'>
        <Link to="/home">
          <button onClick={() => toggleButton("home")} className={`${buttonTransition} h-14 w-20 flex flex-col justify-center items-center rounded-full ${getButtonStyle("home")}`}><GoHome className='size-full'/></button>
        </Link>
        <h1 className='text-sm'>Home</h1>
      </div>
      <div className='w-1/4 h-full p-3 flex flex-col items-center justify-center'>
        <Link to="/groups">
          <button onClick={() => toggleButton("groups")} className={`${buttonTransition} h-14 w-20 flex flex-col justify-center items-center rounded-full ${getButtonStyle("groups")}`}><MdOutlineGroups className='size-full'/></button>
        </Link>
        <h1 className='text-sm'>Groups</h1>
      </div>
      <div className='w-1/4 h-full p-3 flex flex-col items-center justify-center'>
        <Link to="/friends">
          <button onClick={() => toggleButton("friends")} className={`${buttonTransition} h-14 w-20 flex flex-col justify-center items-center rounded-full ${getButtonStyle("friends")}`}><MdOutlinePerson className='size-full'/></button>
        </Link>
        <h1 className='text-sm'>Friends</h1>
      </div>
      <div className='w-1/4 h-full p-3 flex flex-col items-center justify-center'>
        <Link to="/account">
          <button onClick={() => toggleButton("account")} className={`${buttonTransition} p-1 h-14 w-20 flex flex-col justify-center items-center rounded-full ${getButtonStyle("account")}`}><MdOutlineManageAccounts className='size-full'/></button>
        </Link>
        <h1 className='text-sm'>Account</h1>
      </div>
    </div>
  )
}

export default BottomBar
