import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for the use of <Link/> tags, instead of traditional <a> tags which reloads the whole page unnecessarily.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function loginPage(props) {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const loadingDoneIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m5 14l3.233 2.425a1 1 0 0 0 1.374-.167L18 6"></path></svg>
  const loadingIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={16} strokeDashoffset={16} d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.24s" values="16;0"></animate><animateTransform attributeName="transform" dur="1.2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path><path strokeDasharray={64} strokeDashoffset={64} strokeOpacity={0.3} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.96s" values="64;0"></animate></path></g></svg>
  const navigate = useNavigate()
  const [buttonContent, setButtonContent] = useState("Login")
  
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
      setButtonContent(loadingIcon)
      const response = await axios.post(`https://splitx-backend.onrender.com/login`, { email, password });

      if (response.status === 200 && response.data.message === "Success!") {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("currentUser", JSON.stringify(response.data.user));

          setButtonContent(loadingDoneIcon)
          toast.success("Login Successful!");
          setTimeout(() => {
            navigate("/home");
          }, 500);
      } else {
          setButtonContent("Login")
          toast.error("Invalid Credentials!");
      }
    }
    catch (error) {
      setButtonContent("Login")
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
            <button type='submit' className={`w-full flex justify-center items-center p-1 rounded-md ${buttonTransition} ${props.theme==='bg-black'?'text-white bg-black':'text-black bg-white'}`}>{buttonContent}</button>
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
