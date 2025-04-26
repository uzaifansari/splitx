import React from 'react'

const AddExpenses = (props) => {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105" //contains tailwind classes for button transition, for reusability.
  return (
    <button onClick={props.toggleModal} className={`flex justify-between items-center gap-3 p-3 rounded-2xl bottom-24 right-5 fixed bg-opacity-50 backdrop-blur-lg ${props.theme==="bg-black"?"text-black bg-white":"text-white bg-black"} ${buttonTransition} `}>
      {props.plusIcon}
      <h1>New Expense</h1>
    </button>
  )
}

export default AddExpenses
