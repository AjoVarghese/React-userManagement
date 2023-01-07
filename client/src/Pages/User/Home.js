import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userHome } from '../../Redux/Actions/userActions'
import Header from './Header'
import './Home.css'


function Home() {
  const state=useSelector((state)=>state.userReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {userData}=state
  
  let userInfo=JSON.parse(localStorage.getItem('userInfo'))
  console.log('userHome',userInfo.data.name);

  if(userInfo != null){
    dispatch(userHome())
  }else{
    navigate('/login')
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    } else {
      navigate('/login')
    }
  },[userData])

  return (
    <div className='home'>
      <Header/>
        <div className='home-div'>
         <h1>Welcome {userInfo.data.name}!</h1>
        </div>
    </div>
  )
}

export default Home