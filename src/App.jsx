import React, {useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; //Routes used for navigating to different pages and components. 
//Components
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
//Pages
import Landing from './pages/Landing';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import Account from './pages/Account';
import GroupsPage from './pages/Groups';
import FriendsPage from './pages/Friends';
import FriendDetails from './pages/FriendDetails';
import ExpenseDetails from './pages/ExpenseDetails';
//Icons
import { MdDarkMode, MdLightMode, MdGroupAdd } from "react-icons/md"; // Moon Icon for light mode, Sun Icon for light mode, New Group Icon
import { FaPlus } from "react-icons/fa"; // Plus Icon 
import { PiDotsThreeCircle } from "react-icons/pi"; //Three dot menu Icon
import { BsFillPersonPlusFill } from "react-icons/bs"; // Add Friend Icon

function App() {
  // const location = useLocation() //useLocation() is a hook in react which tells info about the URL of the current webpage.
  const [theme, setTheme] = useState("bg-black") //Theme State
  //Icons States
  const [themeIcon, setThemeIcon] = useState(<MdDarkMode className={`bg-transparent scale-150 ${theme==="bg-black"?"fill-black":"fill-white"}`}/>)
  const [threeDotIcon, setThreeDotIcon] = useState(<PiDotsThreeCircle className={`bg-transparent scale-150 ${theme==="bg-black"?"fill-white":"fill-black"}`}/>)
  const [plusIcon, setPlusIcon] = useState(<FaPlus className={`bg-transparent scale-150 ${theme==="bg-black"?"fill-black":"fill-white"}`}/>)
  const [newFriendIcon, setNewFriendIcon] = useState(<BsFillPersonPlusFill className={`bg-transparent scale-150 ${theme==="bg-black"?"fill-black":"fill-white"}`}/>)
  const [newGroupIcon, setNewGroupIcon] = useState(<MdGroupAdd className={`bg-transparent scale-150 ${theme==="bg-black"?"fill-black":"fill-white"}`}/>)
  
  // Funtion to implement system wide dark mode,This function is responsible for the theme toggle of all the app components and elements.
  const toggleTheme = () => {
    if (theme==="bg-black") {
      setTheme("bg-white")
      setThemeIcon(<MdLightMode className="bg-transparent scale-150 fill-white"/>)
      setPlusIcon(<FaPlus className="bg-transparent scale-150 fill-white"/>)
      setThreeDotIcon(<PiDotsThreeCircle className="bg-transparent scale-150 fill-black"/>)
      setNewFriendIcon(<BsFillPersonPlusFill className="bg-transparent scale-150 fill-white"/>)
      setNewGroupIcon(<MdGroupAdd className="bg-transparent scale-150 fill-white"/>)
    }
    else {
      setTheme("bg-black")
      setThemeIcon(<MdDarkMode className="bg-transparent scale-150 fill-black"/>)
      setPlusIcon(<FaPlus className="bg-transparent scale-150 fill-black"/>)
      setThreeDotIcon(<PiDotsThreeCircle className="bg-transparent scale-150 fill-white"/>)
      setNewFriendIcon(<BsFillPersonPlusFill className="bg-transparent scale-150 fill-black"/>)
      setNewGroupIcon(<MdGroupAdd className="bg-transparent scale-150 fill-black"/>)
    }
  }
  
  //For ExpenseModal State
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const toggleExpenseModal = () => {
    if (isExpenseModalOpen) {
      setIsExpenseModalOpen(false)
    }
    else{
      setIsExpenseModalOpen(true)
    }
  }
  //For NewFriend Modal State
  const [isNewFriendModalOpen,setIsNewFriendModalOpen] = useState(false)
  const toggleNewFriendModal = () =>{
    if (isNewFriendModalOpen) {
      setIsNewFriendModalOpen(false)
    }
    else {
      setIsNewFriendModalOpen(true)
    }
  }

  const [isNewGroupModalOpen,setIsNewGroupModalOpen] = useState(false)
  const toggleNewGroupModal = ()=> {
    setIsNewGroupModalOpen(!isNewGroupModalOpen)
  }

  const [isDeleteExpenseModalOpen,setIsDeleteExpenseModalOpen] = useState(false)
  const toggleDeleteExpenseModal = () => {
    setIsDeleteExpenseModalOpen(!isDeleteExpenseModalOpen)
  }

  const [isLoggedIn,setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} themeIcon={themeIcon} plusIcon={plusIcon} threeDotIcon={threeDotIcon} newGroupIcon={newGroupIcon} newFriendIcon={newFriendIcon}/>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to="/home" /> : <Landing theme={theme}/>}/>
        <Route path='/home' element={<HomePage theme={theme} isExpenseModalOpen={isExpenseModalOpen} toggleExpenseModal={toggleExpenseModal} plusIcon={plusIcon}/>}/>
        <Route path='/login' element={<LoginPage theme={theme}/>}/>
        <Route path='/signup' element={<SignupPage theme={theme}/>}/>
        <Route path="/groups" element={<GroupsPage theme={theme} isModalOpen={isNewGroupModalOpen} toggleModal={toggleNewGroupModal} plusIcon={plusIcon}/>}/>
        <Route path="/friends" element={<FriendsPage theme={theme} isModalOpen={isNewFriendModalOpen} toggleModal={toggleNewFriendModal} newFriendIcon={newFriendIcon}/>} />
        <Route path='/account' element={<Account theme={theme} toggleTheme={toggleTheme} setIsLoggedIn={setIsLoggedIn} themeIcon={themeIcon}/>}/>
        <Route path='/friend/:friendId' element={<FriendDetails theme={theme}  />} />
        <Route path='/expense' element={<ExpenseDetails theme={theme} toggleModal={toggleDeleteExpenseModal} isModalOpen={isDeleteExpenseModalOpen}/>} />
      </Routes>
      {/* {location.pathname !== '/' && <BottomBar theme={theme} />} */}
      <BottomBar theme={theme} />
    </>
  )
}

export default App
