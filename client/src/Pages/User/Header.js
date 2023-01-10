import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserLogoutModal from '../../components/UserLogoutModal'


import './Header.css'
function Header() {
  const navigate=useNavigate()

  // const handleLogout=()=>{
  //   localStorage.removeItem('userInfo')
  //   navigate('/login')
  // }
   
  const [modal,setModal] = useState(false)
    
  
  return (
    
    <div className='main-div'>
      {
        modal ? <UserLogoutModal closeModal={setModal}/> : ''
      }
      
        <div className='header-div'>
                <span className='header-title'>User Management</span>
                <span onClick={()=>navigate('/')}>Home</span>
                <span onClick={()=>navigate('/profile')}>Profile</span>
                <span className='logout' onClick={()=>{
                    setModal(true)
                }}>Logout</span>
        </div>
    </div>
  )
}

export default Header