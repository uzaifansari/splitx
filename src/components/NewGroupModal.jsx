import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion" //Framer motion library for using transitions and animations.
import { IoMdCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const NewGroupModal = (props) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const {theme, toggleModal, isModalOpen} = props
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  
  //For Inputs
  const [groupName, setGroupName] = useState("")
  const groupNameHandler = (event) =>{
    setGroupName(event.target.value)
  }

  const [members, setMembers] = useState([])
  
  const [split,setSplit] = useState([])
  const splitHandler = (event)=>{
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    selectedOptions.push(currentUser.email)
    setSplit(selectedOptions);
  }
  
  // Update the friends list everytime the modal opens. 
  useEffect(() => {  
    const fetchFriends = async ()=> {
      try {
        if (isModalOpen) {
          const currentUserEmail = currentUser.email;
          const response = await axios.post(`${BASE_URL}/friends`, { currentUserEmail });
          setMembers(response.data.friends || []);
        }
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    } 
    fetchFriends()
  }, [isModalOpen])

  const submitHandler = async (event) => {
      event.preventDefault();
      try{
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        const currentUserEmail = currentUser.email
        const response = await axios.post(`"${BASE_URL}/new-group`, { "email": currentUserEmail, "group_name": groupName , "members": split  })
        toast.success(response.data.message)
        setTimeout(() => toggleModal(), 1000);
      }
      catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User not found!");
          } else if (error.response.status === 409) {
            toast.error("Already a friend!");
          } else {
            toast.error("Something went wrong!");
          }
        } else {
          console.error("Network error:", error);
          toast.error("Network error. Please try again!");
        }
      }
  }
  
  return (
    <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] }} className={`w-72 h-72 lg:w-96 lg:h-96 z-1000 flex flex-col items-center inset-0 absolute rounded-xl m-auto ${theme === "bg-black" ? "bg-white" : "bg-black"}`}>
        <div className="flex items-center justify-between p-3 w-full">
          <h1 className={`text-2xl ${theme === "bg-black" ? "text-black" : "text-white"}`}>New Group</h1>
          <button onClick={toggleModal}>
            <IoMdCloseCircle className="w-8 h-8 fill-red-500 hover:fill-red-400" />
          </button>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <form onSubmit={submitHandler} className="flex flex-col items-center gap-2">
            <input type="text" value={groupName} onChange={groupNameHandler} required placeholder="Group Name" className={`w-60 lg:w-72 lg:h-12 rounded p-2 ${theme}`} />
            <div className={`w-60 lg:w-72 lg:h-12 flex justify-between p-2`}>
                <label htmlFor="members" className={`${theme=="bg-black"?"text-black":"text-white"}`}>Members:</label>
                <select required multiple value={split} onChange={splitHandler} name="Members" id="members" className={`p-1 md:h-10 rounded ${theme=="bg-black"?"text-white bg-black":"text-black bg-white"}`}>
                <option value="" disabled >Select members</option>
                {members.map((member, index)=> (
                    <option key={index} value={member.email}>{member.name}</option>
                ))}
                </select>
            </div>
            <button type="submit" className={`w-fit rounded-lg p-2 ${theme}`}>Submit</button>
          </form>
        </div>
      </motion.div>
      {/* Toast Container to render notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={props.theme === "bg-black" ? "light" : "dark"}
      />
    </div>
  );
}

export default NewGroupModal
