import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import {useForm} from 'react-hook-form'
import { userLogin } from '../../Redux/Actions/userActions'
import './Login.css'

function Login() {
  const [userEmail,setUserEmail]=useState('')
  const [userPassword,setUserPassword]=useState('')
  const state=useSelector((state)=>state.userReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {userData}=state
  
  const {register,handleSubmit,formState:{errors}} = useForm()

  const onSubmit=(data,e)=>{
    console.log(data);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
    
      {
        state.emailStatus === true && state.errorData  ? <h2 style={{color:'red'}}>{state.errorData}...</h2> : <h1>User Login</h1>  
      }
           <Form.Field>
           <input 
              type="email"
              className="form--input"
              placeholder="Email Address"
              {...register('email',
               {
                required:true
               }
              )}
              onChange={(e)=>setUserEmail(e.target.value)}
           />
           </Form.Field>
           {errors.email && <p style={{color:'red'}}>Please check the mail</p>}
           <Form.Field>
           <input 
              type="password"
              className="form--input"
              placeholder="Password"
              {...register('password',
              {
                required:true
              }
              )}
              onChange={(e)=>setUserPassword(e.target.value)}
           />
           </Form.Field>
           {errors.password && <p style={{color:'red'}}>Please check the password</p>}
           <Button type='submit'>Login</Button>
           {/* <button onClick={handleLogin}>Submit</button> */}

           <div>
           <a href="" onClick={()=>navigate('/signup')}>Signup</a>
           </div>
          
        
         </Form>
    </div>
  </div>
  )
}

export default Login