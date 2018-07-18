import HeaderSelector from "../../components/header-selector/header-selector";

import {connect} from "react-redux";
import {NavBar,List,InputItem,Button,WingBlank,TextareaItem} from "antd-mobile";

import React,{Component} from "react";

class DaShenInfo extends Component{
    render(){
        return (
            <div>
                <NavBar>大神列表</NavBar>
                <HeaderSelector />
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入求职岗位">求职岗位:</InputItem>
                        <TextareaItem title="个人介绍:" rows={3}/>
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
)(DaShenInfo);