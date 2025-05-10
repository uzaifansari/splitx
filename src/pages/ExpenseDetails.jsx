import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from "../assets/defaultProfilePic.png";
import { MdOutlineDelete } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ExpenseDetails = (props) => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const expense = state?.expense
    const currentUserEmail = JSON.parse(sessionStorage.getItem("currentUser")).email

    const [membersDetails, setMembersDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async ()=> {  
            setLoading(true)
            try {
                const response = await axios.post(`https://splitx-backend.onrender.com/expense-details`, {"expense_id": expense._id})
                const fetched_member_details = response?.data.members_details
                setMembersDetails(fetched_member_details)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchDetails()
    }, [expense])
    
    const deleteExpense = async ()=> {
        if (currentUserEmail==expense.created_by.email) {
            const expense_id = expense?._id
            const response = await axios.delete(`https://splitx-backend.onrender.com/delete-expense/${expense_id}`)
    
            if (response.data.message == "success!") {
                console.log(response.data);
                toast.success("Expense deleted successfully!")
                setIsModalOpen(false)
                setTimeout(() => {
                    navigate(-1); //go back to previous page
                }, 500);
            } else {
                console.log(response.data.message);
            }
        }
        else {
            toast.error("Only the creator of this expense can delete it!");
            setIsModalOpen(false)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${props.theme === "bg-black" ? "text-white" : "text-black"} ${props.theme}`}>
        
        <div className="flex items-center justify-between md:justify-normal md:gap-4">
            <h1 className="text-4xl">Expense Details</h1>
            <button onClick={()=>setIsModalOpen(true)}>
                <MdOutlineDelete className="size-6 md:size-8 fill-red-400" />
            </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:gap-32 md:px-10">
            {loading ? (
                <Skeleton className={`rounded-lg mt-8 w-full h-48 md:w-[40.5rem] md:h-48 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
            ) : (
                <div className={`Card w-full h-fit mt-8 rounded-lg ${props.theme==="bg-black"?"bg-zinc-700":"bg-zinc-400"}`}>
                    <div className="flex justify-between items-center pt-6 px-6 text-xl">
                        <h1>{expense?.name}</h1>
                        <h1>${expense?.amount}</h1>
                    </div>
                    <div className={`flex px-6 mt-2 ${props.theme==="bg-black"?"text-zinc-400":"text-zinc-700"}`}>
                        <h1>Apr 12, 2025</h1>
                    </div>
                    <div className="flex items-center justify-between p-6">
                        <div className="flex flex-col items-start justify-between gap-2">
                            <h1 className={`text-lg ${props.theme==="bg-black"?"text-zinc-400":"text-zinc-700"}`}>Created By</h1>
                            <h1 className={`text-lg font-semibold truncate ${props.theme==="bg-black"?"text-zinc-300":"text-zinc-700"}`}>{expense?.created_by.name}</h1>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-2">
                            <h1 className={`text-lg ${props.theme==="bg-black"?"text-zinc-400":"text-zinc-700"}`}>Status</h1>
                            <h1 className={`text-lg font-semibold ${props.theme==="bg-black"?"text-zinc-300":"text-zinc-700"}`}>{expense?.status=="unsettled"?"Unsettled":"Settled"}</h1>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-2">
                            <h1 className={`text-lg ${props.theme==="bg-black"?"text-zinc-400":"text-zinc-700"}`}>Split</h1>
                            <h1 className={`text-lg font-semibold ${props.theme==="bg-black"?"text-zinc-300":"text-zinc-700"}`}>Equally</h1>
                        </div>
                    </div>
                </div>
            )}

            <div className="Members w-full mt-4">
                <h1 className="text-2xl font-semibold mb-2">Members</h1>
                <div className="grid grid-cols-4 text-sm font-medium text-gray-400 pb-2">
                    <div></div>
                    <div className="text-right">Share</div>
                    <div className="text-right">Paid</div>
                    <div className="text-right">Balance</div>
                </div>
                
                {/* Member Details Table for displaying members and their respective share and balances (To Do: CREATE A SEPARATE COMPONENT) */}
                {loading ? (
                    Array(3).fill().map((_,index) => (
                        <div key={index} className="grid grid-cols-4 items-center py-3 text-base">
                            <div className="flex items-center gap-2">
                                <Skeleton className={`rounded-lg w-20 h-8 md:w-24 md:h-10 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className={`rounded-lg w-20 h-8 md:w-24 md:h-10 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className={`rounded-lg w-20 h-8 md:w-24 md:h-10 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className={`rounded-lg w-20 h-8 md:w-24 md:h-10 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                            </div>
                        </div>
                    ))
                ) : (
                    membersDetails.map((member,index) => (
                    <div key={index} className="grid grid-cols-4 items-center py-3 text-base">
                        <div className="flex items-center gap-2">
                            <img src={profilePic} alt="profilepic" className="w-8 h-8 rounded-md bg-zinc-500"/>
                            <span className="font-medium">{member.name}</span>
                        </div>
                        <div className="text-right">{member.share}</div>
                        <div className="text-right">{member.paid}</div>
                        <div className="text-right text-green-500 font-semibold">{member.balance}</div>
                    </div>
                    ))
                )}
            </div>
        </div>

        {/* Delete Expense Confirmation Modal (To Do: CREATE A SEPARATE COMPONENT)  */}
        {isModalOpen &&(
            <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md flex justify-center items-center">
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01]}} className={`w-60 h-48 md:h-80 md:w-80 flex flex-col justify-around rounded-xl ${props.theme==="bg-black"?"bg-white text-black":"bg-black text-white"}`}>
                    <div className="pl-8 md:pl-16 flex gap-3 items-center">
                        <div>
                            <FaExclamationTriangle className="size-8 fill-red-500"/>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl">Delete Expense</h1>
                            <p className="text-lg md:text-lg">Are you sure?</p>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end p-2">
                        <button onClick={()=> setIsModalOpen(false)} className={`w-fit h-fit p-2 rounded-lg border-1 ${props.theme==="bg-black"?"bg-slate-200 border-black hover:bg-slate-100":"bg-slate-800 border-white hover:bg-slate-700"}`}>Cancel</button>
                        <button onClick={deleteExpense} className="w-fit h-fit p-2 bg-red-500 rounded-lg text-white">Delete</button>
                    </div>
                </motion.div>
            </div>
        )}

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
};

export default ExpenseDetails;
