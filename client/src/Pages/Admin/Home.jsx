import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Loading from '../Loading'
import { adminHome } from '../../Redux/Actions/adminActions'
import { adminBlockUnblock } from '../../Redux/Actions/adminActions'
import { adminUpdate } from '../../Redux/Actions/adminActions'
import './Home.css'

function Home() {
   const [dummy,setDummy]=useState();
   const [selectedUser,setSelectedUser]=useState()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const adminhome = useSelector((state)=>state.adminReducer)
  const {adminData}=adminhome;
  const userBlockData = useSelector((state)=>state.adminBlockReducer)
  const {blockData} = userBlockData;

//   let blockData=useSelector((state)=>state.adminBlockReducer)
//   const {blockdata} = blockData;
//   console.log(blockData);
  console.log("sttee",blockData);
 
  useEffect(()=>{

   dispatch(adminHome())
   // if(adminInfo){
   //    dispatch(adminHome())
   //    navigate('/admin/')
   // }else{
   //   navigate('/adminlogin')
   // }

    },[blockData])


  const block=(user)=>{
   dispatch((adminBlockUnblock(user))
   )
  }

  const userDetails = (data) =>{
    setSelectedUser(data)
    dispatch(adminUpdate(data))
    navigate('/edit-user')
  }



  return (
    <div className='admin-home'>
        <Header/>
        <div className='admin-home'>
         
        <table cellspacing="0" cellpadding="0" className="user-table">
   <tr id="user-table-top">
   
      <th>
         <h3>Name</h3>
      </th>
      <th>
         <h3>Email</h3>
      </th>
      <th>
         <h3>Edit user</h3>
      </th>
      <th>
         <h3>Action</h3>
      </th>
   </tr>
   {
      

   adminData? adminData.length > 0 ? adminData.map((user)=>{
      
         return(
            <tr>
               
         <th>
            <h5>{user.name}</h5>
         </th>
         <th>
            <h5>{user.email}</h5>
         </th>
         
         
         <th><button key={user._id} onClick={(e)=>{
            console.log("clicked user",user);
            userDetails(user)
           
         
          
         }}><i class="fas fa-edit"></i></button></th>
         {
            user.loginStatus === true ? <th><button onClick={(e)=>{block(user)}} key={user._id}><i className="fas fa-user-times" ></i></button>
            </th> : <th><button key={user._id} onClick={(e)=>{
               block(user)
                setDummy()
                }}><i className="fas fa-user-times" style={{color:'green'}} ></i></button>
            </th>
         }
         
      </tr>
         )
       }) : '' : ''
   }
   
  
   
   
</table>
        </div>
        
    </div>
  )
}

export default Home