import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for using <Link> tags
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const SignupPage = (props) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const navigate = useNavigate()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nameHandler = (event) => {
    setName(event.target.value)
  }
  const emailHandler = (event) =>{
    setEmail(event.target.value)
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please Fill All Fields!');
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('Signup Successful!');
        setTimeout(() => navigate("/login"), 1000); // Redirect after 1s
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email is already registered. Please use a different email.');
      } else {
        toast.error("Signup failed. Please try again later.");
      }
      console.error("Error posting data", error);
    }
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center ${props.theme}`}>
      <div className={`w-fit h-fit p-10 px-5 flex flex-col items-center justify-center rounded-xl ${props.theme==='bg-black'?'bg-white':'bg-black'}`}>
        <h1 className={`text-2xl mb-4 ${props.theme==='bg-black'?'text-black':'text-white'}`}>Signup</h1>
        <form onSubmit={handleSignup} className={`flex flex-col text-lg gap-2 ${props.theme==='bg-black'?'text-black':'text-white'}`} action="">
            <label htmlFor="name">Name</label>
            <input onChange={nameHandler} required value={name} className={`p-1 border-1 bg-transparent rounded-md ${props.theme==='bg-white'?'border-white':'border-black'}`} type='text' id='name' />
            <label htmlFor="email">Email</label>
            <input onChange={emailHandler} required value={email} placeholder='name@example.com' className={`p-1 border-1 bg-transparent rounded-md ${props.theme==='bg-white'?'border-white':'border-black'}`} type="email" id='email' />
            <label htmlFor="password">Password</label>
            <input onChange={passwordHandler} required value={password} placeholder='Atleast 8 characters' style={{fontFamily: "Readex Pro", fontWeight: "400"}} className={`p-1 border-1 bg-transparent rounded-md ${props.theme==='bg-white'?'border-white':'border-black'}`} type="password" id='password' />
            <button type='submit' className={`w-full p-1 rounded-md ${buttonTransition} ${props.theme==='bg-black'?'text-white':'text-black'} ${props.theme==='bg-black'?'bg-black':'bg-white'}`}>Signup</button>
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

export default SignupPage
