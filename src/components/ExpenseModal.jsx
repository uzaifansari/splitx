import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion" //Framer motion library for using transitions and animations.
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios';

const ExpenseModal = (props) => {
  const {isModalOpen, toggleModal, theme} = props;
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  //For Inputs
  const [name,setName] = useState("")
  const [amount, setAmount] = useState("")
  const [split,setSplit] = useState([])
  const [status, setStatus] = useState("unsettled")
  const [friends, setFriends] = useState([])
  
  const expenseHandler = (event)=>{
    setName(event.target.value)
  }
  const amountHandler = (event)=>{
    setAmount(event.target.value)
  }
  const splitHandler = (event)=>{
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    selectedOptions.push(currentUser.email)
    setSplit(selectedOptions);
  }
  // For submitting the form and storing the expense data in sessionStorage.
  const submitHandler = async (event)=> {
    event.preventDefault();
    try {
      if (name && amount && split) {
        const currentUserEmail = currentUser.email;
        const newExpense = { name, amount, status, split };
        const response = await axios.post(`https://splitx-backend.onrender.com/new-expense`, {currentUserEmail, newExpense})
        toggleModal()
      }
    } catch (error) {
      console.error("Error", error)
    }
  }
  
  // Update the friends list everytime the modal opens.
  useEffect(() => {
    const fetchFriends = async ()=> {
      try {
        if (isModalOpen) {
          const currentUserEmail = currentUser.email;
          const response = await axios.post(`https://splitx-backend.onrender.com/friends`, { currentUserEmail });
          setFriends(response.data.friends || []);
        }
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    } 
  
    fetchFriends()
  }, [isModalOpen])
  
  return (
    <div onClick={toggleModal} className='fixed inset-0 z-10 bg-black/50 backdrop-blur-md p-20' >
        <motion.div onClick={(event)=> event.stopPropagation()} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01]}} className={`w-72 h-72 lg:w-96 lg:h-96 z-1000 flex flex-col items-center inset-0 absolute rounded-xl m-auto ${theme==="bg-black"?"bg-white":"bg-black"}`}>
            <div className="flex justify-between p-3 w-full">
                <h1 className={`text-2xl ${theme==="bg-black"?"text-black":"text-white"}`}>New Expense</h1>
                <button onClick={toggleModal}>
                    <IoMdCloseCircle className="w-8 h-8 fill-red-500 hover:fill-red-400"/>
                </button>
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <form onSubmit={submitHandler} className="flex flex-col items-center gap-2">
                    <input type="text" value={name} onChange={expenseHandler} required placeholder="Expense Name" className={`w-60 lg:w-72 lg:h-12 rounded p-2 ${theme}`} />
                    <input type="number" value={amount} onChange={amountHandler} required placeholder="Amount" className={`w-60 lg:w-72 lg:h-12 rounded p-2 ${theme}`} />
                    <div className={`w-60 lg:w-72 lg:h-12 flex justify-between p-2`}>
                      <label htmlFor="friends" className={`${theme=="bg-black"?"text-black":"text-white"}`}>Split with:</label>
                      <select required multiple value={split} onChange={splitHandler} name="Friends" id="friends" className={`p-1 md:h-10 rounded ${theme=="bg-black"?"text-white bg-black":"text-black bg-white"}`}>
                        <option value="" disabled >Select a friend</option>
                        {friends.map((friend, index)=> (
                          <option key={index} value={friend.email}>{friend.name}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className={`w-fit rounded-lg p-2 ${theme}`}>Submit</button>
                </form>
            </div>
        </motion.div>
    </div>
  )
}

export default ExpenseModal
