import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../Redux/Actions/userActions'
import './Login.css'

function Login() {
  const [userEmail,setUserEmail]=useState('')
  const [userPassword,setUserPassword]=useState('')
  const state=useSelector((state)=>state.userReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {userData}=state
  

  const handleLogin=(e)=>{
    e.preventDefault()
    dispatch(userLogin(userEmail,userPassword))
  }

  useEffect(()=>{
    let userInfo=localStorage.getItem('userInfo')
    if(userInfo){
      navigate('/')
    }else{
      navigate('/login')
    }
  },[userData])

  return (
    <div className='signup'>
      
    <div className="signup-form">
    <form >
      {
        state.emailStatus === true && state.errorData  ? <h2 style={{color:'red'}}>{state.errorData}...</h2> : <h1>User Login</h1>  
      }
           
           <input 
              type="email"
              className="form--input"
              placeholder="Email Address"
              name="email"
              onChange={(e)=>setUserEmail(e.target.value)}
             required
           />
           <input 
              type="password"
              className="form--input"
              placeholder="Password"
              name="password"
              onChange={(e)=>setUserPassword(e.target.value)}
             required
           />
           <button onClick={handleLogin}>Submit</button>
           <div>
           <a href="" onClick={()=>navigate('/signup')}>Signup</a>
           </div>
          
         </form>
    </div>
  </div>
  )
}

export default Login