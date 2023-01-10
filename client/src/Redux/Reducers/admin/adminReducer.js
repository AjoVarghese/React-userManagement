import { ActionTypes } from "../../Constants/ActionTypes";

const initialState=[{}]


export const adminReducer= (state = initialState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.ADMIN_LOGIN_REQUEST:
           
            return{
                ...state,
                adminloading:true,
                emailStatus:false,
                redirectStatus:false
            }
         case ActionTypes.ADMIN_LOGIN:
           console.log('admin payload data',payload);
            return{
                ...state,
                adminloading:false,
                emailStatus:false,
                redirectStatus:true,
                adminData:payload
            } 
        case ActionTypes.ADMIN_LOGIN_REQUEST_FAILED:
            console.log('admin failed payload data',payload);
            return{
                ...state,
                adminloading:true,
                emailStatus:true,
                redirectStatus:false,
                adminErrorData:payload
            } 
        case ActionTypes.ADMIN_HOME_REQUEST:
            return{
                ...state,
                adminloading:true,
                emailStatus:true,
                redirectStatus:true,
            }    
         case ActionTypes.ADMIN_HOME:
            return{
                ...state,
                adminloading:true,
                emailStatus:false,
                redirectStatus:true,
                adminData:payload
            }   
           
            case ActionTypes.ADMIN_SELECT_DATA:
                console.log("Admin Selcted data",payload);
                return{
                    ...state,
                    adminloading:false,
                    emailStatus:false,
                    redirectStatus:true,
                    selectedUser:payload
                }     
            case ActionTypes.ADMIN_UPDATE_FAILED:
                return{
                    ...state,
                    adminloading : false,
                    emailStatus : true,
                    redirectStatus : true, 
                    adminerr : payload
                }         

            default:
                return state
    }
}



export const adminBlockReducer = (state={},action)=>{
    
    switch (action.type) {
        case ActionTypes.ADMIN_BLOCK_REQUEST:
            return({loading:true})

        case ActionTypes.ADMIN_BLOCK:
          
            return({loading:false,blockData:action.payload})

        case ActionTypes.ADMIN_BLOCK_FAILED:
            return({loading:false,blockError:action.payload})
    
        default:
            return state;
    }
}