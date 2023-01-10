import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../Redux/Actions/adminActions'
import Loading from '../Loading'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import {useForm} from 'react-hook-form'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const state=useSelector((state)=>state.adminReducer)
    const {adminData}=state


    const onSubmit=(data,e)=>{
      console.log('adminlogin data',data);
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

    const {register,handleSubmit,formState:{errors}} = useForm()

  return (
    <div>
        <div className="signup-form">
          <Form onSubmit={handleSubmit(onSubmit)}>
   
      
      {
        state.emailStatus === true && state.adminErrorData ? <h1 style={{color:'red'}}>{state.adminErrorData.data}</h1> :<h1> Admin Login</h1>
      }
            <Form.Field>
           <input 
              type="email"
              className="form--input"
              placeholder="Email Address"
             {...register('adminEmail',
             {
              required:true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
             })}
             onChange={(e)=>setEmail(e.target.value)}
           />
           </Form.Field>
           {errors.adminEmail && <p style={{color:'red'}}>Please check the email</p>}
           <Form.Field>
           <input 
              type="password"
              className="form--input"
              placeholder="Password"
              {...register('adminPassword',
            {
              required:true
            })}
              onChange={(e)=>setPassword(e.target.value)}
           />
           </Form.Field>
           {errors.adminPassword && <p style={{color:'red'}}>Please check the password</p>}
          
           <Button type='submit'>Login</Button>
         </Form>

    </div>
    </div>
  )
}

export default Login