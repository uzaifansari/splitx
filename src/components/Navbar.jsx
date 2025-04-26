import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom"; //useLocation is a hook which returns the info about the current url of the webpage.
import { motion } from "framer-motion" //Framer motion library for using transitions and animations.
import { useEffect } from "react";


function Navbar(props) {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105" //contains tailwind classes for button transition, for reusability.
  const location = useLocation();
  const [menu, setMenu] = useState(false) //State of Hamburger Menu (false=closed | true=open)
  // Function to toggle the state of Hamburger Menu
  const toggleMenu = () => {
    setMenu(!menu) // "!" operator will make the value from false to true and vice versa
  }
  
  return (
    <>
      <div className={`fixed w-full h-16 flex px-3 items-center justify-between bg-opacity-50 backdrop-blur-lg ${props.theme}`}>
        {/* SplitX Logo */}
        <div className="h-full w-fit flex items-center bg-transparent cursor-default">
          {/* <Link to='/'> */}
            {/* <button className={`${buttonTransition} cursor-pointer`}> */}
              <h1 className={`text-3xl bg-transparent ${props.theme==="bg-black"?"text-white":"text-black"}`} style={{fontFamily: "Righteous", fontWeight: "400"}}>SplitX</h1>
            {/* </button> */}
          {/* </Link> */}
        </div>
        {/*Buttons */}
        <div className={`flex items-start gap-2 bg-transparent ${location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" ? "" : "hidden"}`}>
          <button onClick={props.toggleTheme} className={`w-10 h-10 flex justify-center items-center rounded-full ${props.theme==="bg-black"?"bg-white":"bg-black"} ${buttonTransition}`}>
            {props.themeIcon}
          </button>
          <Link to='/login'>
            <button className={`w-20 h-10 rounded-xl font-semibold ${props.theme==="bg-black"?"text-black bg-white":"text-white bg-black"} ${buttonTransition}`}>Log in</button>
          </Link>
          <Link to='/signup'>
            <button className={`w-20 h-10 rounded-xl font-semibold ${props.theme==="bg-black"?"text-black bg-white":"text-white bg-black"} ${buttonTransition}`}>Sign up</button>
          </Link>
        </div>
        {/* Three Dot Menu */}
        <div className={`relative ${location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" ? "hidden" : ""}`}>
          <button onClick={toggleMenu} className={`w-10 h-10 flex flex-col justify-center items-center rounded-full ${buttonTransition}`}>
            {props.threeDotIcon}
          </button>   
        </div>
        {/* Hamburger Menu */}
        {menu && (
          <motion.div animate={{ y: 10 }} transition={{ type: "Tween", stiffness: 100 }} className={`w-fit h-fit absolute top-14 right-4 overflow-hidden shadow-lg rounded-xl ${location.pathname === "/home" || "/account"?  "" : "hidden"} ${props.theme==="bg-black"?"bg-white text-black":"bg-black text-white"}`}>
            <ul className="flex flex-col w-fit gap-0">
              <li className={`${buttonTransition} w-full flex items-center justify-start gap-2 p-2 cursor-pointer`}>
                <button className={`w-10 h-10 flex justify-center items-center rounded-full`}>
                  {props.plusIcon}
                </button>
                <h1>Add Expense</h1>
              </li>
              <li className={`${buttonTransition} w-full flex items-center justify-start gap-2 p-2 cursor-pointer`}>
                <button className={`w-10 h-10 flex justify-center items-center rounded-full`}>
                  {props.newFriendIcon}
                </button>
                <h1>Add Friend</h1>
              </li>
              <li className={`${buttonTransition} w-full flex items-center justify-start gap-2 p-2 cursor-pointer`}>
                <button className={`w-10 h-10 flex justify-center items-center rounded-full `}>
                  {props.newGroupIcon}
                </button>
                <h1>Create Group</h1>
              </li>
              <li onClick={props.toggleTheme} className={`${buttonTransition} ${location.pathname === "/account"? "hidden" : ""} w-full flex items-center justify-start gap-2 p-2 cursor-pointer`}>
                <button className={`w-10 h-10 flex justify-center items-center rounded-full`}>
                  {props.themeIcon}
                </button>
                <h1>Theme</h1>
              </li>
            </ul>
          </motion.div >
        )}
      </div>
    </>
  );
}

export default Navbar;
