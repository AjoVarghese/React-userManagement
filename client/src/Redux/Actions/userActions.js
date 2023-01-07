import { ActionTypes } from "../Constants/ActionTypes";
import axios from 'axios'


export const userRegister = (name,email,password,profile) => async(dispatch)=>{
   
    dispatch(
        {
       
        type:ActionTypes.REGISTER_REQUEST
       })

    const config={
        headers:{
            "Content-Type":"application/json",
        },
    }

    axios.post(
        'http://localhost:3001/signup',{
         name,
         email,
         password
        },
       config
    ).then((data)=>{
        console.log("REGISTER DATA",data);
        dispatch({
            type:ActionTypes.REGISTER
        })
    })
    .catch((err)=>{
       dispatch({
        type:ActionTypes.REGISTER_REQUEST_FAILED,
        payload:err.response
       })
    })
}


export const userLogin=(email,password) => async (dispatch)=>{
    dispatch({
        type:ActionTypes.LOGIN_REQUEST
    })
    const config={
        headers:{
            "Content-Type":"application/json",
        }
    }

     axios.post(
        'http://localhost:3001/login',{
            email,
            password
        },
        config
    ).then((Data)=>{
        console.log("LOGIN DATA",Data);
        localStorage.setItem("userInfo",JSON.stringify(Data))
        dispatch({
            type:ActionTypes.LOGIN,
            payload:Data.data
        })
        
    })
    .catch((err)=>{
        console.log("login error",err);
        console.log(err.response.data);
        dispatch({
           
            type:ActionTypes.LOGIN_REQUEST_FAILED,
            payload:err.response.data
        })
    })
}

export const userHome = () => async (dispatch) => {
    try{
        const token=JSON.parse(localStorage.getItem('userInfo'))
       
        const config={
            headers:{
                Authorization:"Bearer" + token.data.token,
                id : token.data._id
            }
        }

        axios.get(
            'http://localhost:3001?id=' + token.data._id,
            config
        ).then((response)=>{
            console.log('home response',response);
            dispatch({
                type:ActionTypes.HOME_SUCESS,
                payload:response
            })
        })
    } catch (error) {
      dispatch({
        type:ActionTypes.HOME_FAIL,
        payload:error.response && error.response.data.message ?
        error.response.data.message :
        error.response.data,
      })
    }
}


export const uploadImage=(image,id) => async(dispatch) =>{
    console.log('dipatch',image,id);
    try{
        dispatch({
          type:ActionTypes.ADMIN_BLOCK_REQUEST
        })

        const config={
            headers:{
                "Content-type": "application/json",
            }
        }
          
         axios.post('http://localhost:3001/profile',
       
        {image,id},
        config
        ).then((data)=>{
         console.log('uploaded data',data);
         localStorage.setItem('profileImage',JSON.stringify(data.data.image))
         
         dispatch({
            type:ActionTypes.IMAGE_UPLOAD_SUCCESS,
            payload:data.data
         })
        })

    } catch(error){

    }
}


export const  getProfileImage = () => async (dispatch) => {
    try{
        const token=JSON.parse(localStorage.getItem('userInfo'))
       console.log(token.data.token);
        const config={
            headers:{
                Authorization:"Bearer"+' '+token.data.token
                // id : token.data._id
            }
        }
        console.log(config);
        const savedItem=localStorage.getItem('userInfo');
        const parsedItem=JSON.parse(savedItem)

        const id=parsedItem.data._id
        
        dispatch({
            type:ActionTypes.IMAGE_GET_REQUEST
        })

        
        axios.get('http://localhost:3001/get-profile?id='+id,config).then((data)=>{
            console.log("image datasaaaa",data.data);
        dispatch({
            type:ActionTypes.IMAGE_GET_SUCCESS,
            payload:data.data
        })
        })
        

    } catch (error) {
     dispatch({
        type:ActionTypes.IMAGE_GET_FAILED,
        payload:error.response.message
     })
    }
}


