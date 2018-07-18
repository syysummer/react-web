import ajax from "./ajax";
const reqRegister = ({username,password,type}) => ajax("/register",{username,password,type},"POST");
const reqLogin = ({username,password}) => ajax("/login",{username,password},"POST");
export {reqRegister,reqLogin}