import ajax from "./ajax";
const BASE = "";
const reqRegister = ({username,password,type}) => ajax(BASE+"/register",{username,password,type},"POST");
const reqLogin = ({username,password}) => ajax(BASE+"/login",{username,password},"POST");
const reqUpdateUser = (user) => ajax(BASE+"/update",user,"POST");
const reqUser = () => ajax(BASE+"/user");
const reqUsers = type => ajax(BASE+"/userlist",{type});

// 请求获取当前用户的所有聊天记录
const reqChatMsgList = () => ajax(BASE+'/msglist');
// 标识查看了指定用户发送的聊天信息
const reqReadChatMsg = (from) => ajax(BASE+'/readmsg', {from}, 'POST');

export {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUsers,reqChatMsgList,reqReadChatMsg}