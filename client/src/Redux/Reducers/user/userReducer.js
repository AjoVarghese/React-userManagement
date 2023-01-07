import { ActionTypes } from "../../Constants/ActionTypes";

const initialState=[{}]

export const userReducers =(state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.REGISTER_REQUEST:
            
            return{
                ...state,
                loading:true,
                emailStatus:false,
                redirectStatus:false
                
            }

        case ActionTypes.REGISTER_REQUEST_FAILED:
            
            return{
                ...state,
                loading:true,
                emailStatus:true,
                data:payload,
                redirectStatus:false
            }
            case ActionTypes.REGISTER:
                return{
                    ...state,
                    emailStatus:false,
                    loading:false,
                    redirectStatus:true
            }
        case ActionTypes.LOGIN_REQUEST:
            console.log("login request",payload);
            return{
                ...state,
                loading:true,
                redirectStatus:false,
                emailStatus:true
                }
        case ActionTypes.LOGIN:
            console.log("loginpayload",payload);
            return{
                ...state,
                loading:false,
                redirectStatus:true,
                emailStatus:false,
                userData:payload
            }        
        case ActionTypes.LOGIN_REQUEST_FAILED:
            console.log("login_failed payload",payload);
            return{
                ...state,
                loading:true,
                redirectStatus:false,
                emailStatus:true,
                errorData:payload
            }
            default:
                return state

    }
}

export const getProfileImage = (state = {},{type,payload})=>{
    
    switch(type){
        case ActionTypes.IMAGE_GET_REQUEST:
            return{
                profileloading:true
            }
        case ActionTypes.IMAGE_GET_SUCCESS:
            console.log('image payload',payload);
            return{
                profileloading:false,
                profileData:payload.image
            } 
        case ActionTypes.IMAGE_GET_FAILED:
            return{
                profileloading:false,
                error:payload
            } 
            default:
                return state;      
    }
}


