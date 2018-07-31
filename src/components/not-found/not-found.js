import React,{Component} from "react";
import {Button} from "antd-mobile";
import "./index.less";

class NotFound extends Component{
    render(){
        return (
         <div>
             <p className="not-found">没有找到相应的页面404</p>
             <Button type="primary" onClick={()=>this.props.history.replace("/")}>返回首页</Button>
         </div>
        )
    }
}
export default NotFound;