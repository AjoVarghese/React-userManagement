import { combineReducers } from "redux";
import { userReducers } from "./user/userReducer";
import { adminBlockReducer, adminReducer } from "./admin/adminReducer";
import { getProfileImage } from "./user/userReducer";
import { adminBlockUnblock } from "../Actions/adminActions";

const reducers=combineReducers({
    userReducer:userReducers,
    adminReducer:adminReducer,
    adminBlockReducer:adminBlockReducer,
    profileReducer:getProfileImage,

    
})

export default reducers