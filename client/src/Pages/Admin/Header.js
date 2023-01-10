import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogoutModal from '../../components/AdminLogoutModal'
import './Header.css'
function Header() {
  const navigate=useNavigate()
  
  // const handleLogout=()=>{
  //   localStorage.removeItem('adminInfo')
  //   navigate('/adminlogin')
  // }

  const [modal,setModal] = useState(false)
  const [logout,setLogout] = useState()
  
  return (
    
    <div className='main-div'>
      {
        modal ? <AdminLogoutModal closeModal={setModal} /> : ''
      }
        <div className='header-div'>
                <span className='header-title'>User Management</span>
                <span className='logout' onClick={(e)=>{
                  // handleLogout()
                   setModal(true)
                   
                }
                 
                  }>Logout</span>
        </div>
    </div>
  )
}

export default Header