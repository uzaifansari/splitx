import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import defaultExpensePic from "../assets/defaultExpensePic.png"
import AddExpenses from '../components/AddExpenses'
import ExpenseModal from '../components/ExpenseModal'

const HomePage = (props) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate()
  // Retrieving the currentUser data
  const [currentUser, setCurrentUser] = useState(()=>{
    return JSON.parse(sessionStorage.getItem("currentUser"))
  })
  // Assigning the expense data to "expenses" variable
  const [expenses, setExpenses] = useState(()=>{
    return currentUser?.expenses || [];
  })  
  const [settled, setSettled] = useState(()=>{
    return (expenses || []).filter((elem)=> elem.status==="settled")
  })
  const [unsettled, setUnsettled] = useState(()=>{
    return (expenses || []).filter((elem)=> elem.status==="unsettled")
  })
  // Updating expenses data everytime the Modal closes.
  useEffect(() => {
    const fetchExpenses = async ()=> {
      if (!props.isExpenseModalOpen) {
        const response = await axios.post(`${BASE_URL}/expenses`, {"email": currentUser.email} ) 
        const fetchedExpenses = response.data.expenses
        
        if (fetchedExpenses) {
          setExpenses(fetchedExpenses)
          setSettled(fetchedExpenses.filter((elem) => elem.status == "settled"))
          setUnsettled(fetchedExpenses.filter((elem) => elem.status == "unsettled"))
        } else {
          setExpenses([])
          setSettled([])
          setUnsettled([])
        }
      }
    }    
    fetchExpenses()
  }, [props.isExpenseModalOpen])

  const openExpense = (expense)=> {
    navigate('/expense', { state: { expense } })
  }
  
  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${props.theme==="bg-black"?"text-white":"text-black"} ${props.theme}`}>
      <h1 className='text-4xl'>Summary</h1>
      <div className='UNSETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Unsettled Expenses</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            {unsettled.map((exp, index) => (
              <button onClick={() => openExpense(exp)} key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                <div>
                  <img src={defaultExpensePic} alt="" className='bg-zinc-500 size-32 md:size-40 rounded-lg'/>
                </div>
                <div className='w-full flex items-start justify-between'>
                  <div  className='max-w-16 text-nowrap truncate text-sm'>{exp.name}</div>
                  <div className='max-w-16 text-green-500 text-sm'>${exp.amount}</div>
                </div>
              </button>
            ))}
        </div>
      </div>
      <div className='SETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Settled Expenses</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            {settled.map((exp, index)=>(
              <button onClick={() => openExpense(exp)} key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                <div>
                  <img src={defaultExpensePic} alt="" className='bg-zinc-500 size-32 md:size-40 rounded-lg' />
                </div>
                <div className='w-full flex items-start justify-between'>
                  <div className='max-w-16 text-nowrap truncate'>{exp.name}</div>
                  <div className='max-w-16 line-through'>${exp.amount}</div>
                </div>
              </button>
            ))}
        </div>
      </div>
      {/* Button to add new expenses */}
      <AddExpenses theme={props.theme} toggleModal={props.toggleExpenseModal} plusIcon={props.plusIcon}/>
      {/* Modal for creating a new expense */}
      {props.isExpenseModalOpen && (
        <ExpenseModal toggleModal={props.toggleExpenseModal} isModalOpen={props.isExpenseModalOpen} theme={props.theme}/>
      )}
    </div>
  )
}

export default HomePage