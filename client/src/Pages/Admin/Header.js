import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
function Header() {
  const navigate=useNavigate()
  
  const handleLogout=()=>{
    localStorage.removeItem('adminInfo')
    navigate('/adminlogin')
  }
  
  return (
    
    <div className='main-div'>
        <div className='header-div'>
                <span className='header-title'>User Management</span>
                <span className='logout' onClick={handleLogout}>Logout</span>
        </div>
    </div>
  )
}

export default Header