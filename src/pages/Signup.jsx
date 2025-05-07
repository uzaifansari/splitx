import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for using <Link> tags
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const SignupPage = (props) => {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const loadingDoneIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m5 14l3.233 2.425a1 1 0 0 0 1.374-.167L18 6"></path></svg>
  const loadingIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={16} strokeDashoffset={16} d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.24s" values="16;0"></animate><animateTransform attributeName="transform" dur="1.2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path><path strokeDasharray={64} strokeDashoffset={64} strokeOpacity={0.3} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.96s" values="64;0"></animate></path></g></svg>
  const navigate = useNavigate()

  const [buttonContent, setButtonContent] = useState("Signup")
  
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
      setButtonContent(loadingIcon)
      const response = await axios.post(`https://splitx-backend.onrender.com/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('Signup Successful!');
        setButtonContent(loadingDoneIcon)
        setTimeout(() => navigate("/login"), 500); // Redirect after 500ms
      }
    } catch (error) {
      setButtonContent("Signup")
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
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
            <button type='submit' className={`w-full p-1 flex justify-center items-center rounded-md ${buttonTransition} ${props.theme==='bg-black'?'text-white':'text-black'} ${props.theme==='bg-black'?'bg-black':'bg-white'}`}>{buttonContent}</button>
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
