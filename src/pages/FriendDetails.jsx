import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultExpensePic from "../assets/defaultExpensePic.png"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FriendDetails = (props) => {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname
  const { theme } = props;
  const { state } = useLocation();
  const friend = state?.friend;
  const currentUser =  JSON.parse(sessionStorage.getItem("currentUser"))
  const [loading, setLoading] = useState(true)

  if (!friend) return <div>Friend not found!</div>;
  
  const [friendDetails, setFriendDetails] = useState("");
  const [commonExpenses, setCommonExpenses] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      try {
        if (friend?.email) {
          const currentUserEmail = currentUser.email
        
          const response = await axios.post(`https://splitx-backend.onrender.com/friend/${friend.email}`, {currentUserEmail});
          const friend_details = response.data.friend_details
          setFriendDetails(friend_details);
          setCommonExpenses(friend_details.common_expenses)
          console.log(friend_details);
          
        }
      } catch (error) {
        console.error("Failed to fetch friend details:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchDetails();
  }, [friend]);

  const handleSettleUp = async (expense) => {
    const response = await axios.put(`https://splitx-backend.onrender.com/settle-expense/${expense._id}`, {"current_user_email":currentUser.email})
    console.log(response.data);
    
  }
    
  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${theme === "bg-black" ? "text-white" : "text-black"} ${theme}`}>
      {loading ? (
        <Skeleton className={`rounded-lg w-32 h-10 md:w-40 md:h-10 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
      ) : (
        <h1 className="text-4xl">{friendDetails.name}</h1>
      )}
      {loading ? (
        <Skeleton className={`rounded-md w-52 h-5 md:w-60 md:h-5 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
      ) : (
        <h2 className="text-sm">
          {friendDetails.total_balance > 0 ?(
            <>
              {friendDetails.name} owes you <span className="text-green-400">${friendDetails.total_balance}</span> in total.
            </>
          ) : friendDetails.total_balance < 0 ? (
            <>
              you owe <span className="text-red-400">${Math.abs(friendDetails.total_balance)}</span> to {friendDetails.name}.
            </>
          ) : (
            <>
              <span className="text-green-400">You are settled up with {friendDetails.name}!</span>
            </>
          )}
        </h2>
      )}
      {loading ? (
        <div className="flex gap-2">
          <Skeleton className={`rounded-md w-24 h-8 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
          <Skeleton className={`rounded-md w-20 h-8 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
        </div>
      ) : (
        <div className="flex gap-2">
          <button className={`w-fit text-xl p-1 mt-2 rounded-lg ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>Expenses</button>
          <button disabled className={`line-through w-fit text-xl p-1 mt-2 rounded-lg opacity-50 cursor-not-allowed ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>Groups</button>
        </div>
      )}
      {/* Common Expenses Section */}
      <div className="w-full flex flex-col gap-2 mt-3 sm:flex-row overflow-y-scroll no-scrollbar sm:overflow-x-scroll">
        {loading ? (
          Array(3).fill().map((_,index) => (
            <Skeleton className={`rounded-lg w-full h-24 md:w-[18.5rem] md:h-26 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
          ))
        ) : (
          commonExpenses.length > 0 ? (
            commonExpenses.map((expense, index) => (
              <div 
              onClick={()=>{navigate('/expense', { state: { expense, route } })}} 
              key={index} className={`flex items-center gap-4 p-3 rounded-lg shadow-md cursor-pointer ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`} >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-600 rounded-lg overflow-hidden shrink-0">
                    <img src={defaultExpensePic} alt="expense" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className={`font-semibold ${props.theme=='bg-black'?"text-zinc-200":"text-zinc-800"}`}>{expense.name}</p>
                    <p className={`${expense.dues_cleared?"text-green-400 line-through":"text-red-500"}`}>${expense.each_share}</p>
                  </div>
                </div>
  
                <div className="flex justify-end items-start w-full">
                  <button disabled={expense.dues_cleared} onClick={()=>handleSettleUp(expense)} className={`p-1 rounded-lg text-sm ${expense.dues_cleared?"":buttonTransition} ${props.theme==="bg-black"?"bg-zinc-400 text-black":"bg-zinc-700 text-zinc-200"} ${expense.dues_cleared?"cursor-not-allowed":"cursor-pointer"}`}>{expense.dues_cleared?"Dues Clear!":"Settle Up"}</button>
                </div>
              </div>
            ))
          ) : (
            <p className="italic text-gray-500 text-sm md:text-xl">No common expenses yet!</p>
          )
        )}
      </div>
    </div>
  );
};

export default FriendDetails;
