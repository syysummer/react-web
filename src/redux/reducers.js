import {combineReducers} from "redux";

import {AUTH_SUCCESS,ERROR_MSG} from "./action-types";

const initUser = {
    username:"",
    type:"",
    msg:"",
    redirectTo:""
};
function user(preState = initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            let user = action.data;
            return {...user,redirectTo:getRedirectTo(user.type,user.header)};
        case ERROR_MSG:
            let msg = action.data;
            return {...preState,msg};
        default :
            return preState;
    }
}
function getRedirectTo(type,header){
    let path = "";
    if(type == "laoban"){
    path = "/laoban"
    }else{
    path = "/dashen"
    }
    if(!header){
        path += "info"
    }
    return path;
}


export default combineReducers({
    user
});