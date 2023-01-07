import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileImage, uploadImage } from '../../Redux/Actions/userActions'
import Loading from '../Loading'

function Profile() {
  const dispatch=useDispatch()
  const [profile,setUserProfile]=useState()
  const [cloudinary,setCloudinary]=useState()
  const [profileImage,setProfileImage] = useState()
  const state=useSelector(state=>state.userReducer)
  console.log('state',state);
  const profileData=useSelector(state=>state.profileReducer)
  console.log("profile data",profileData.profileData);
  let profileUrl

  profileData ? profileUrl = profileData.profileData : profileUrl=''
 

  const savedItem=localStorage.getItem('userInfo')
  const parsedItem=JSON.parse(savedItem)
  
  useEffect(()=>{
    dispatch(getProfileImage())
  },[state])
  


  const setImage = async (e) =>{
    localStorage.removeItem('profileImage')
    const data=new FormData()
    data.append("file",cloudinary);
    data.append("upload_preset","ml_default");
    data.append("cloud_name","dxt9i7gl6")
    fetch("https://api.cloudinary.com/v1_1/dxt9i7gl6/image/upload",{
      method:'post',
      body:data
    })
    .then((res)=> res.json())
    .then((data)=>{
      
      const profileUrl=data.url;
      let id=parsedItem.data._id
      setProfileImage(profileUrl)
      dispatch(uploadImage(profileUrl,id))
      
    })
  }

  return (
    <div>
      <Header/>
      <h1 class="title-pen"> User Profile <span>UI</span></h1>
<div class="user-profile">
  
  {
    profileImage ? <img className='avatar' src={profile} alt="Ash" /> :<img className='avatar' src={profileUrl} alt='Ash' />
  }
	
    <div class="username">{parsedItem.data.name}</div>
  <div class="bio">
  	Senior UI Designer
  </div>
    <div class="description">
      I use to design websites and applications
      for the web.
  </div>
 
  <ul class="data">
    
    <li>
    <input type="file"  onChange={(e)=>{
      setCloudinary(e.target.files[0])
       profileData.profileData=URL.createObjectURL(e.target.files[0])
      setUserProfile(URL.createObjectURL(e.target.files[0]))
      
    }}/>
    <button style={{backgroundColor:'green'}} onClick={(e)=>{
      
      setImage(e)
    }}>Update Profile image</button>
      
    </li>
    
 </ul>
</div>
  
    </div>
  )
}

export default Profile