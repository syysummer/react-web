import React,{Component} from "react";
import {TabBar} from "antd-mobile";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom"
class NavFooter extends Component{
    static propTypes = {
        navList :PropTypes.array.isRequired
    };
    render(){
        const navList = this.props.navList.filter(nav => !nav.hide);
        const {pathname} = this.props.location;
        let unReadCount = this.props.unReadCount;
        return (
            <TabBar>
                {navList.map((nav,index) => (
                    <TabBar.Item
                        key={index}
                        badge = {nav.path === "/message" ? unReadCount : 0}
                        title={nav.text}
                        icon={{uri:require(`./imgs/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./imgs/${nav.icon}-selected.png`)}}
                        selected={pathname===nav.path}
                        onPress={() =>{this.props.history.replace(nav.path)}}
                    />
                ))}
            </TabBar>
        )
    }
}
export default withRouter(NavFooter);