import {AUTH_SUCCESS,ERROR_MSG} from "./action-types";
import {reqRegister,reqLogin} from "../api";

export const authSuccess = user => ({type:AUTH_SUCCESS,data:user});

export const errorMsg = msg => ({type:ERROR_MSG,data:msg});


export  function register(user){
    const {username,password,rePassword,type} = user;
    if(!username){
        return errorMsg("您的用户名不能为空!")
    }else if(!password){
        return errorMsg("您的密码不能为空!")
    }else if(!rePassword){
        return errorMsg("您的确认密码不能为空!")
    }else if(password !== rePassword){
        return errorMsg("您两次输入的密码不正确!")
    }
    // return dispatch => {
    // reqRegister({username,password,type})
    //     .then(respose =>{
    //         let result = respose.data;
    //         if(result.code === 0){
    //             console.log(result.data);
    //             dispatch(authSuccess(result.data))
    //         }else{
    //             dispatch(errorMsg(result.msg))
    //         }
    //     })
    //     .catch(err =>{
    //        console.log("请求注册失败");
    //     })
    // }

    return async dispatch => {
        const respose = await reqRegister({username,password,type});
        let result = respose.data;
        if(result.code === 0){
            console.log(result.data);
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export  function login(user){
    const {username,password} = user;
    return async dispatch => {
        if(!username){
            dispatch(errorMsg("您的用户名不能为空!"));
            return;
        }else if(!password) {
            dispatch(errorMsg("您的密码不能为空!"));
            return;
        }
        const respose = await reqLogin({username,password});
        let result = respose.data;
        if(result.code === 0){
            console.log(result.data);
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}