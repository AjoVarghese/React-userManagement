import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import './Modal.css'
import { adminBlockUnblock } from '../Redux/Actions/adminActions'
import { useNavigate } from 'react-router-dom';

function Modal({closeModal,doAction}) {
  const dispatch=useDispatch()
  const [modal,setModal] = useState(false)
  const navigate=useNavigate()
const doBlock = () =>{
  
  dispatch(adminBlockUnblock(doAction))
  closeModal(false)
}

//  useEffect = (()=>{
//    if(modal === true){
//     navigate('/admin/')
//    }
// },[modal])


  console.log('doAction',doAction);
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
            <button onClick={doBlock}>Continue</button>
           </div>
        </div>
        
    </div>
  )
}

export default Modal