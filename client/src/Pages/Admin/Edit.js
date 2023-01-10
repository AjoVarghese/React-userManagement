import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminUpdateUser } from '../../Redux/Actions/adminActions'
import Header from './Header'

function Edit() {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const state=useSelector((state)=>state.adminReducer.selectedUser)
  console.log('edited state',state);
  const [name,setName]=useState(state.name)
  const [email,setEmail]=useState(state.email)
  const [inputName,setInputName] = useState(state.name)
  const [inputEmail,setInputEmail] = useState(state.email)
  
const changeName = e => {
  setInputName(e.target.value)
  setName(e.target.value)
}

const changeEmail = e =>{
  setInputEmail(e.target.value)
  setEmail(e.target.value)
}

  const handleUpdate=(e)=>{
    e.preventDefault()
    const oldEmail=state.email
    console.log(name+"TJIS IS THE OLD NA ME");
    dispatch(adminUpdateUser(name,email,oldEmail))
    let editInfo=localStorage.getItem('editedUser')
    if(editInfo){
      navigate('/admin/')
    }
  }
   
  
 
  return (
    
    <div className='signup'>
       <Header/>
      <div className="signup-form">
      <form >
          <h1>Edit User Profile</h1>
          <br />
             <input 
                type="text"
                className="form--input"
                value={inputName}
                onChange={changeName}
                 
             />
             
            
             <input 
                type="email"
                className="form--input"
                value={inputEmail}
                name="email"
                onChange={changeEmail}
             />
             
             
             <button onClick={handleUpdate}>Update</button>
           </form>
      </div>
    </div>
  )
}

export default Edit