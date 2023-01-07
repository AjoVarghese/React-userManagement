import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { adminLogin } from '../../Redux/Actions/adminActions'
import Loading from '../Loading'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const state=useSelector((state)=>state.adminReducer)
    const {adminData}=state


    const handleLogin=(e)=>{
      e.preventDefault()
      dispatch(adminLogin(email,password))
    }

    useEffect(()=>{
      let adminInfo=localStorage.getItem('adminInfo')
      if(adminInfo){
        navigate('/admin/')
      }else{
        navigate('/adminlogin')
      }
    },[adminData])

  return (
    <div>
        <div className="signup-form">
    <form >
      
      {
        state.emailStatus === true && state.loginErrorData ? <h1 style={{color:'red'}}>{state.adminErrorData.data}</h1> :<h1> Admin Login</h1>
      }
            
           <input 
              type="email"
              className="form--input"
              placeholder="Email Address"
              name="email"
             onChange={(e)=>setEmail(e.target.value)}
             required
           />
           <input 
              type="password"
              className="form--input"
              placeholder="Password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
             required
           />
           <button onClick={handleLogin}>Submit</button>
         </form>
    </div>
    </div>
  )
}

export default Login