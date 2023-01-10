import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
import Loading from '../Loading'
import { userRegister } from '../../Redux/Actions/userActions'
import './Signup.css'
import { Form,Button }  from 'semantic-ui-react'

function Signup() {
  const [userName,setUserName]=useState('')
  const [userEmail,setUserEmail]=useState('')
  const [userPassword,setUSerPassword]=useState('')
  const [userProfile,setProfile ] = useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.userReducer)
  console.log("state",state);
  
  const  { register,handleSubmit,formState:{errors} } =useForm()

  const onSubmit = (data,e) => {
    e.preventDefault()
    console.log("signup",data);
    dispatch(userRegister(userName,userEmail,userPassword,userProfile))
      navigate('/login')
  }
  return (
   
    <div className='signup'>
      
      <div className="signup-form">
        <Form onSubmit={handleSubmit(onSubmit)}>
      
        {
          state.data ? <h2 style={{color:'red'}}>{state.data.data}</h2> : <h1>Sign up now!</h1>  
        }
        {
          state.loading ? <Loading/> : null 
        }
        <Form.Field>
             <input 
                type="text"
                className="form--input"
                placeholder="Name"
                {...register('name',
                {
                  required:true,
                  maxLength:10
                }
                )}
                 onChange={(e)=>setUserName(e.target.value)}
             />
            </Form.Field>
            {errors.name && <p style={{color:'red'}}>Please check the name</p>}
            <Form.Field>
             <input 
                type="email"
                className="form--input"
                placeholder="Email Address"
                {...register('email',
                {
                  required:true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                }
                )}
                 onChange={(e)=>setUserEmail(e.target.value)}
             />
             </Form.Field>
             {errors.email && <p style={{color:'red'}}>Please check the email</p>}
             <Form.Field>
             <input 
                type="password"
                className="form--input"
                placeholder="Password"
                {...register('password',
                {
                  required:true,
                  minLength:3,
                  maxLength:10
                })}
                 onChange={(e)=>setUSerPassword(e.target.value)}
             />
             </Form.Field>
             {errors.password && <p style={{color:'red'}}>Please check the password</p>}
             <Button type='submit'>Submit</Button>
             
           </Form>
      </div>
    </div>
  )
}

export default Signup