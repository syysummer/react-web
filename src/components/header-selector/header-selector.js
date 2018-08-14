import React,{Component} from "react";
import {List,Grid} from "antd-mobile";
import PropTypes from "prop-types";

class HeaderSelector extends Component{
    constructor (props){
        super(props);
        this.headerList = [];
        for(let i = 0; i < 20;i++){
            let text = "头像" + (i+1);
            this.headerList.push({
                text,
                icon:require(`../../assets/imgs/${text}.png`)
            })
        }
    }
    static propTypes = {
        setHeader : PropTypes.func.isRequired
    };
    state = {
        icon : null
    };
    headerSelect = ({text,icon}) =>{
      this.setState({icon});
        this.props.setHeader(text);
    };
    render(){
        let icon = this.state.icon;
        const header = icon ? <span>已选择头像<img src={icon} alt={""}/></span> :"请选择您的头像";
        return (
            <List renderHeader={() => header} className="my-list">
                <Grid data={this.headerList}
                      columnNum={5}
                      onClick={this.headerSelect}/>
            </List>
        )
    }
}
export default HeaderSelector;