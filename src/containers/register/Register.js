import React,{Component} from "react";
import {NavBar,Button,WingBlank,WhiteSpace,Radio,InputItem,List} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import Logo from "../../components/logo/Logo";
import {register} from "../../redux/actions";

class Register extends Component{
    state = {
        username : "",
        password : "",
        rePassword : "",
        type : "dashen"
    };

    handleChange = (name,value) => {
        this.setState({
            [name]:value
        })
    };
    toLogin = () => {
        this.props.history.replace("/login")
    };
    register = ()=>{
       const {username,password,rePassword,type} = this.state;
       this.props.register({username,password,rePassword,type})
    };
    render(){
        const {type} = this.state;
        const {msg,redirectTo} = this.props.user;
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
         <div>
             <NavBar>大神直聘</NavBar>
             <Logo/>
             <WingBlank>
                 {msg ? <p className="error-msg">{msg}</p> : null}
                 <List>
                     <InputItem placeholder="请输入用户名" onChange={val=>this.handleChange("username",val)}>用户名:</InputItem>
                     <WhiteSpace />
                     <InputItem type="password" placeholder="请输入密码" onChange={val=>this.handleChange("password",val)}>密码:</InputItem>
                     <WhiteSpace />
                     <InputItem type="password" placeholder="请输入确认密码" onChange={val=>this.handleChange("rePassword",val)}>确认密码:</InputItem>
                     <WhiteSpace />
                     <List.Item>
                         <span>用户类型:</span>&nbsp;&nbsp;&nbsp;
                         <Radio checked = {type === "dashen"} onChange={val=>this.handleChange("type","dashen")}>大神</Radio>&nbsp;&nbsp;&nbsp;
                         <Radio checked = {type === "laoban"} onChange={val=>this.handleChange("type","laoban")}>老板</Radio>
                     </List.Item>
                     <WhiteSpace />
                     <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;册</Button>
                     <Button onClick={this.toLogin}>已有账户</Button>
                 </List>
             </WingBlank>
         </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {register}
)(Register);