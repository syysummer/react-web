import React, {Component} from "react";
import {Redirect,Switch, Route} from "react-router-dom";
import {NavBar} from "antd-mobile";
import {connect} from "react-redux"
import Cookie from "js-cookie";

import LaoBanInfo from "../laoban-info/laoban-info";
import DaShenInfo from "../dashen-info/dashen-info";
import LaoBan from "../laoban/laoban";
import DaShen from "../dashen/dashen";
import Message from "../message/message";
import Personal from "../personal/personal";
import NavFooter from "../../components/nav-footer/nav-footer"
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";
import NotFound from "../../components/not-found/not-found";
import Chat from "../chat/chat";


class Main extends Component {
    navList = [
        {
            path: '/laoban', // 路由路径
            component: LaoBan,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: DaShen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ];
    componentDidMount(){
        let user_id = Cookie.get("user_id");
        let {_id} = this.props.user;
        //如果user_id有值(之前登录过),_id没有值(当前没有登录)此时需要发送ajax请求
        if(!_id && user_id){
         this.props.getUser();
        }
    }
    render() {
        let user = this.props.user;
        let path = this.props.location.pathname;

        //获取cookie中的user_id,查看本地是否有cookie,如果没有直接跳转到登录页面
        let user_id = Cookie.get("user_id");
        if(!user_id){
            return <Redirect to="/login"/>;
        }
        //如果!user._id没有值,说明当前没有登录,需要发送请求,获取用户信息
        if(!user._id){
            return null;
        }

        //用于确定当前是哪个路由,进行对应的显示
        let currentNav = this.navList.find((nav,index) => nav.path === path );
        if(path === "/"){
            return <Redirect to={getRedirectTo(user.type,user.header)}/>
        }
        let navList = this.navList;
        console.log(user.type);
        if(user.type === "dashen"){
            navList[1].hide = false;
            navList[0].hide = true;
        }else{
            navList[0].hide = false;
            navList[1].hide = true;
        }
        // if(user.type === "dashen"){
        //     navList[1].hide = false;
        //     navList[0].hide = true;
        // }else{
        //     navList[0].hide = false;
        //     navList[1].hide = true;
        // }
        let unReadCount = this.props.unReadCount;
        return (
            <div>
                { currentNav ? <NavBar className="fix-top">{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path="/laobaninfo" component={LaoBanInfo}/>
                    <Route path="/dasheninfo" component={DaShenInfo}/>
                    <Route path="/laoban" component={LaoBan}/>
                    <Route path="/dashen" component={DaShen}/>
                    <Route path="/message" component={Message}/>
                    <Route path="/personal" component={Personal}/>
                    <Route path="/chat/:userid" component={Chat} />
                    <Route component={NotFound}/>
                </Switch>
                { currentNav ? <NavFooter unReadCount={unReadCount} navList={navList}/> : null}
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main);