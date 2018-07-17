import React,{Component} from "react";
import {Button,WingBlank,WhiteSpace,InputItem,List,NavBar} from "antd-mobile";

import Logo from "../../components/logo/Logo";

class Login extends Component{
    state = {
        username : "",
        password : ""
    };

    handleChange = (name,value) => {
        this.setState({
            [name]:value
        })
    };
    toRegister = () => {
        this.props.history.replace("/register")
    };
    render(){
        return (
            <div>
                <NavBar>大神直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={val=>this.handleChange("username",val)}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" placeholder="请输入密码" onChange={val=>this.handleChange("password",val)}>密码:</InputItem>
                        <WhiteSpace />
                        <Button type="primary">登&nbsp;&nbsp;录</Button>
                        <Button onClick={this.toRegister}>没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Login;