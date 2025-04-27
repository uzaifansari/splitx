import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for the use of <Link/> tags, instead of traditional <a> tags which reloads the whole page unnecessarily.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function loginPage(props) {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailHandler = (event) =>{
    setEmail(event.target.value)
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // Retrieve users from database.
    try {
      const response = await axios.post(`https://splitx-backend.onrender.com/login`, { email, password });

      if (response.status === 200 && response.data.message === "Success!") {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("currentUser", JSON.stringify(response.data.user));

          toast.success("Login Successful!");
          navigate("/home");
      } else {
          toast.error("Invalid Credentials!");
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
          toast.error("Invalid Credentials!");
      } else {
          toast.error("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <div className={`w-full h-screen flex items-center justify-center ${props.theme}`}>
      <div className={`w-fit h-fit p-10 flex flex-col items-center justify-center rounded-xl ${props.theme==='bg-black'?'bg-white text-black':'bg-black text-white'}`}>
        <h1 className='text-2xl mb-4'>Login</h1>
        <form onSubmit={handleLogin} className={`flex flex-col gap-2 text-lg`}>
            <label htmlFor="email">Email</label>
            <input required onChange={emailHandler} value={email} placeholder='name@example.com' style={{fontFamily: "Readex Pro", fontWeight: "400"}} className={`p-1 border-1 bg-transparent rounded-md ${props.theme==='bg-white'?'border-white':'border-black'}`} type="email" id='email' />
            <label htmlFor="password">Password</label>
            <input required onChange={passwordHandler} value={password} placeholder='Atleast 8 characters' style={{fontFamily: "Readex Pro", fontWeight: "400"}} className={`p-1 border-1 bg-transparent rounded-md ${props.theme==='bg-white'?'border-white':'border-black'}`} type="password" id='password' />
            <button style={{fontFamily: "Readex Pro", fontWeight: "500"}} className='text-xs m-auto'>forgot your password?</button>
            <button type='submit' className={`w-full p-1 rounded-md ${buttonTransition} ${props.theme==='bg-black'?'text-white bg-black':'text-black bg-white'}`}>Login</button>
        </form>
      </div>
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
        theme={props.theme==="bg-black"?"light":"dark"}
      />
    </div>
  )
}

export default loginPage
