// 引入客户端io
import io from 'socket.io-client'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_MSGS,RECEIVE_CHAT_MSG,CHAT_MSG_COUNT} from "./action-types";
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUsers,reqChatMsgList,reqReadChatMsg} from "../api";

export const authSuccess = user => ({type:AUTH_SUCCESS,data:user}); //登录成功或注册成功的同步action

export const errorMsg = msg => ({type:ERROR_MSG,data:msg}); //登录成功或注册失败的同步action

export const receiveUser = user => ({type:RECEIVE_USER,data:user});//更新用户信息的同步action

export const resetUser = msg => ({type:RESET_USER,data:msg});//重置用户信息的同步action

export const receiveUserList = userList => ({type:RECEIVE_USER_LIST,data:userList});//获取用户列表的同步action

export const receiveChatMsgs = (chatMsgs,meId) => ({type:RECEIVE_CHAT_MSGS,data:{chatMsgs,meId}});//获取用户消息列表的同步action

export const receiveChatMsg = (chatMsg,meId) => ({type:RECEIVE_CHAT_MSG,data:{chatMsg,meId}});

export const chatMsgCount = (from,to,count) => ({type:CHAT_MSG_COUNT,data:{from,to,count}});
// 注册的异步action
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
            getChatMsgs(dispatch,result.data._id);
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

//登录的异步action
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
            getChatMsgs(dispatch,result.data._id);
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户信息的异步actions (信息完善时)
export function updateUser(user){
 return async dispatch => {
     const response = await reqUpdateUser(user);
     const result = response.data;
     if(result.code === 0){
        dispatch(receiveUser(result.data))
     }else{
        dispatch(resetUser(result.msg))
     }
 }
}

//获取用户信息(根据cookies)
export function getUser(){
    return async dispatch => {
        let response = await reqUser();
        let result = response.data;
        getChatMsgs(dispatch,result.data._id);
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表
export function getUserList(type){
  return async dispatch => {
    const response = await reqUsers(type);
      const result = response.data;
      if(result.code === 0){
        dispatch(receiveUserList(result.data))
    }
  }
}


// 连接服务器, 得到代表连接的socket对象(只需连接一次)
const socket = io('ws://localhost:4000');

function initChat(dispatch,meId){
    if(!io.socket){
        io.socket = socket;
        // 绑定事件监听
        socket.on('receiveMsg', function (chatMsg) {
            console.log(chatMsg);
            if(meId === chatMsg.from || meId === chatMsg.to){
                console.log(meId, chatMsg.from);
                dispatch(receiveChatMsg(chatMsg,meId));
        }
        });
    }
}


//聊天时发送信息的异步action
export function sendMessage({content,from,to}){
    return dispatch => {
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        // 向服务器发送消息(信息名字为sendMsg)
        socket.emit('sendMsg',{content,from,to});
    }
}

//获取消息列表的异步action
async function getChatMsgs(dispatch,meId){
      initChat(dispatch,meId);
      const response = await reqChatMsgList();
      const result = response.data;
      if(result.code === 0){
          dispatch(receiveChatMsgs(result.data,meId))
      }
}

//reqReadChatMsg
//读取信息的异步action
export function readChatMsg(from,to){
  return async dispatch => {
      const response = await reqReadChatMsg(from);
      const count = response.data.data;
      dispatch(chatMsgCount(from,to,count))
  }
}