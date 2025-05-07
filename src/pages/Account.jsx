import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import profilePic from "../assets/defaultProfilePic.png"
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { RiDoorLockFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { FaExclamationTriangle } from "react-icons/fa";

const Account = (props) => {
    const navigate = useNavigate()
    const account = JSON.parse(sessionStorage.getItem('currentUser') || '{}' );
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === "true";
    const handleLogout = ()=> {
        if (isLoggedIn) {
            sessionStorage.setItem('isLoggedIn',"false")
            sessionStorage.removeItem("currentUser");
            props.setIsLoggedIn(false)
            navigate("/")
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false); //Modal state

  return (
    // Parent div
    <div className={`pb-4 overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-4 pt-20 px-3 md:p-24 ${props.theme==="bg-black"?"text-white":"text-black"} ${props.theme}`}>
        <h1 className='text-4xl'>Account</h1>
        {/* Child div */}
        <div className='flex flex-col sm:flex-row sm:flex-wrap sm:w-2/3 gap-2 p-1'>
            {/* GrandChild div-1 */}
            <div className={`md:w-fit md:h-fit p-4 rounded-3xl gap-5 flex items-center ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                <div>
                    <img src={profilePic} alt="ProfilePic" className='size-24 md:size-40 bg-zinc-500 rounded-lg' />
                </div>
                <div>
                    <h1 className='text-2xl md:text-4xl'>{account.name}</h1>
                    {/* <h1>{account.email}</h1> */}
                </div>
            </div>
            {/* GrandChild div-2 */}
            <div className={`md:w-fit md:h-fit p-4 rounded-3xl gap-4 flex items-center ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                <div className='flex gap-4'>
                    <VscColorMode className='size-8'/>
                    <h1 className='text-xl'>Theme</h1>
                </div>
                <div className='flex gap-[1px] md:gap-[2px]'>
                    <button onClick={() => { if (props.theme === "bg-white") props.toggleTheme() }} className={`w-20 h-16 border-2 rounded-s-xl ${props.theme==="bg-black"?"border-white bg-zinc-800":"border-black"}`}>Dark</button>
                    <button onClick={() => { if (props.theme === "bg-black") props.toggleTheme() }} className={`w-20 h-16 border-2 rounded-e-xl ${props.theme==="bg-black"?"border-white":"border-black bg-zinc-700 text-white"}`}>Light</button>
                </div>
            </div>
            {/* GrandChild div-3 */}
            <div className={`md:w-fit md:h-fit p-4 rounded-3xl gap-4 flex items-center ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                <MdPayment className='size-8'/>
                <h1 className='text-xl'>Currency</h1>
            </div>
            {/* GrandChild div-4 */}
            <div className={`md:w-fit md:h-fit p-4 rounded-3xl gap-4 flex items-center ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                <RiDoorLockFill className='size-8'/>
                <h1 className='text-xl'>Security</h1>
            </div>
            {/* GrandChild div-5 */}
            <div className={`md:w-fit md:h-fit p-4 rounded-3xl gap-4 flex items-center ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                <HiMiniQuestionMarkCircle className='size-8'/>
                <h1 className='text-xl'>About</h1>
            </div>
        </div>
        <button onClick={()=> setIsModalOpen(true)} className={`w-fit mb-24 h-fit mx-auto flex justify-center items-center p-3 border-2 rounded-xl ${props.theme==="bg-black"?"border-white":"border-black"}`}>Logout</button>
        
        {/* Logout Modal */}
        {isModalOpen && (
        <div onClick={()=> setIsModalOpen(false)} className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md flex justify-center items-center">
            <motion.div onClick={(event)=>event.stopPropagation()} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01]}} className={`w-60 h-48 md:h-80 md:w-80 flex flex-col justify-around rounded-xl ${props.theme==="bg-black"?"bg-white text-black":"bg-black text-white"}`}>
                <div className="pl-8 md:pl-16 flex gap-3 items-center">
                    <div>
                        <FaExclamationTriangle className="size-8 fill-red-500"/>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl">Logout</h1>
                        <p className="text-lg md:text-lg">Are you sure?</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end p-2">
                    <button onClick={()=> setIsModalOpen(false)} className={`w-fit h-fit p-2 rounded-lg border-1 ${props.theme==="bg-black"?"bg-slate-200 border-black hover:bg-slate-100":"bg-slate-800 border-white hover:bg-slate-700"}`}>Cancel</button>
                    <button onClick={handleLogout} className="w-fit h-fit p-2 bg-red-500 rounded-lg text-white">Logout</button>
                </div>
            </motion.div>
        </div>
        )}
    </div>      
  )
}

export default Account
