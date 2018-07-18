import React,{Component} from "react";
import {List,Grid} from "antd-mobile";

class HeaderSelector extends Component{
    headerSelect = () =>{

    };
    render(){
        let hederList = [];
        for(let i = 0; i < 20;i++){
            let text = "头像" + (i+1);
            hederList.push({
                text,
                icon:require(`./imgs/${text}.png`)
            })
        }

        const header = "请选择您的头像";
        return (
            <List renderHeader={() => header} className="my-list">
                <Grid data={hederList}
                      columnNum={5}
                      onClick={this.headerSelect}/>
            </List>
        )
    }
}
export default HeaderSelector;