import React,{Component} from "react";
import {connect} from "react-redux";
import {getUserList} from  "../../redux/actions";
import UserList from  "../userlist/userlist";

class DaShen extends Component{
    componentDidMount(){
        const {getUserList} = this.props;
        getUserList("laoban");
    }
    render(){
        const {userList} = this.props;
        return (
          <UserList userList={userList}/>
        )
    }
}
export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(DaShen);