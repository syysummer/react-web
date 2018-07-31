import React,{Component} from "react";
import {connect} from "react-redux";
import {NavBar,List,InputItem,Button,WingBlank,TextareaItem} from "antd-mobile";
import {updateUser} from "../../redux/actions";
import {Redirect} from "react-router-dom";

import HeaderSelector from "../../components/header-selector/header-selector";



class DaShenInfo extends Component{
    state = {
        header: "",
        info:"",
        post:""
    };
    setHeader = (header) =>{
       this.setState({header})
    };
    handleChange = (name,val) =>{
      this.setState({
          [name]:val
      })
    };
    save = ()=>{
        this.props.updateUser(this.state)
    };
    render(){
        const {user} = this.props;
        if (user.header) {
            return <Redirect to='/dashen'/>
        }
        return (
            <div>
                <NavBar>大神列表</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange("post",val)}>求职岗位:</InputItem>
                        <TextareaItem title="个人介绍:" rows={3} onChange={val => this.handleChange("info",val)}/>
                        <Button type="primary" onClick = {this.save}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(DaShenInfo);