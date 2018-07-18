import HeaderSelector from "../../components/header-selector/header-selector";

import {connect} from "react-redux";
import {NavBar,List,InputItem,Button,WingBlank,TextareaItem} from "antd-mobile";

import React,{Component} from "react";

class LaoBanInfo extends Component{
    render(){
        return (
         <div>
             <NavBar>老板列表</NavBar>
             <HeaderSelector />
             <WingBlank>
                 <List>
                     <InputItem placeholder="请输入招聘职位">招聘职位:</InputItem>
                     <InputItem placeholder="请输入公司名称">公司名称:</InputItem>
                     <InputItem placeholder="请输入职位薪资">职位薪资:</InputItem>
                     <TextareaItem title="职位要求:" rows={3}/>
                     <Button type="primary">保存</Button>
                 </List>
             </WingBlank>
         </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(LaoBanInfo);