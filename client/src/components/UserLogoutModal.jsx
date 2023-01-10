import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogoutModal({closeModal}) {
    const navigate = useNavigate()

    const userLogout = () =>{
     localStorage.removeItem('userInfo')
     navigate('/login')
    }

  return (
    <div className='modalBackground'>
    <div className='modalContainer'>
        <div className='titleCloseBtn'> 
        <button onClick={()=>{
             closeModal(false)
        }}> X </button>
        </div>
       
       <div className="title">
          <h1>Are u sure u want to continue the action?</h1>
       </div>
       <div className="modalBody">
        <p></p>
       </div>
       <div className="footer">
        <button onClick={()=>{
             closeModal(false)
        }} id="cancelBtn">Cancel</button>
        <button onClick={()=>{
            userLogout()
        }}>Continue</button>
       </div>
    </div>
    
</div>
  )
}

export default UserLogoutModal