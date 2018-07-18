import React,{Component} from "react";
import {Switch,Route} from "react-router-dom";
import LaoBanInfo from "../laoban-info/laoban-info";
import DaShenInfo from "../dashen-info/dashen-info";
class Main extends Component{
    render(){
        return (
            <Switch>
                <Route path="/laobaninfo" component={LaoBanInfo}/>
                <Route path="/dasheninfo" component={DaShenInfo}/>
            </Switch>
        )
    }
}
export default Main;