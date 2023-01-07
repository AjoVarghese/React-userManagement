import { ActionTypes } from "../Constants/ActionTypes";
import axios from 'axios'

export const adminLogin=(email,password)=>async(dispatch)=>{
    dispatch({
        type:ActionTypes.ADMIN_LOGIN_REQUEST
    })

    const config={
        headers:{
            "Content-type":"application/json"
        }
    }

    axios.post(
        "http://localhost:3001/admin/login",
        {
            email,
            password
        },
        config
    ).then((data)=>{
        localStorage.setItem('adminInfo',JSON.stringify(data))
        dispatch({
            type:ActionTypes.ADMIN_LOGIN,
            payload:data
        })
    })
    .catch((err)=>{
        dispatch({
            type:ActionTypes.ADMIN_LOGIN_REQUEST_FAILED,
            payload:err.response
        })
    })
}

export const adminHome=()=> async (dispatch)=>{
    try{
        dispatch({
            type:ActionTypes.ADMIN_HOME_REQUEST
        })

        const config={
            headers:{
                "Content-type":"application/json"
            }
        }

        const {data}=await axios.post(
            'http://localhost:3001/admin/',
            config
        ).then((Data)=>{
            console.log("all users",Data);
           dispatch({
            type:ActionTypes.ADMIN_HOME,
            payload:Data.data
           })
        }).catch((err)=>{

        })
    }catch(error){

    }
}

export const adminBlockUnblock=(user) => async (dispatch) =>{
    console.log('adminBlockUnblock',user);
    try{
        dispatch({
          type:ActionTypes.ADMIN_BLOCK_REQUEST
        })
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          axios.post(
            "http://localhost:3001/admin/block",{user},
            config
          ).then((Data)=>{
            console.log('Block Data',Data);
            
            dispatch({
                type:ActionTypes.ADMIN_BLOCK,
                payload:Data.data
            })
            console.log(Data.data);
          }).catch((err)=>{
            console.log('block error',err);
            dispatch({
                type:ActionTypes.ADMIN_UPDATE_FAILED,
                payload:err.response
            })
          })
    }catch(error){

    }
}

export const adminUpdate=(data)=> async(dispatch)=>{
    console.log("adminUpdate data",data);
    try{
        dispatch({
            type:ActionTypes.ADMIN_SELECT_REQUEST
        })
        dispatch({
            type:ActionTypes.ADMIN_SELECT_DATA,
            payload:data
        })
    }catch(error){

    }
}

export const adminUpdateUser=(name,email,oldEmail)=>async(dispatch)=>{
    try{
        dispatch({
            type:ActionTypes.ADMIN_SELECT_REQUEST
        })
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
   
          axios.post(
           'http://localhost:3001/admin/update',{name,email,oldEmail},
           config
          ).then((Data)=>{
            console.log('updated data',Data);
            localStorage.setItem('editedUser',JSON.stringify(Data))
            dispatch({
                type:ActionTypes.ADMIN_SELECT_DATA,
                payload:Data.data
            })
          }).catch((err)=>{
            dispatch({
                type:ActionTypes.ADMIN_UPDATE_FAILED,
                payload:err.response
            })
          })
    }catch(error){

    }
}