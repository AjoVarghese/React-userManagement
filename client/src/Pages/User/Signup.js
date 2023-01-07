import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Loading from '../Loading'
import { userRegister } from '../../Redux/Actions/userActions'
import './Signup.css'

function Signup() {
  const [userName,setUserName]=useState('')
  const [userEmail,setUserEmail]=useState('')
  const [userPassword,setUSerPassword]=useState('')
  const [userProfile,setProfile ] = useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.userReducer)
  console.log("state",state);
  
  const  { register,handleSubmit,errors } =useForm()

  const handleSignup = (e) => {
    e.preventDefault()
    dispatch(userRegister(userName,userEmail,userPassword,userProfile))
      navigate('/login')
  }
  return (
   
    <div className='signup'>
      
      <div className="signup-form">
      <form >
        {
          state.data ? <h2 style={{color:'red'}}>{state.data.data}</h2> : <h1>Sign up now!</h1>  
        }
        {
          state.loading ? <Loading/> : null 
        }
             <input 
                type="text"
                className="form--input"
                placeholder="Name"
                name="name"
                required
                onChange={(e)=>setUserName(e.target.value)}
             />
            
             <input 
                type="email"
                className="form--input"
                placeholder="Email Address"
                name="email"
                required
                onChange={(e)=>setUserEmail(e.target.value)}
               
             />
             <input 
                type="password"
                className="form--input"
                placeholder="Password"
                name="password"
                required
                onChange={(e)=>setUSerPassword(e.target.value)}
               
             />
             
             <button onClick={handleSignup}>Submit</button>
           </form>
      </div>
    </div>
  )
}

export default Signup