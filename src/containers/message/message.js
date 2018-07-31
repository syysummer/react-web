/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
    getLastMsgs = (chatMsgs,meId) =>{
     const lastObjMsgs = {};
     chatMsgs.forEach(msg => {
         if(msg.to === meId && !msg.read){
           msg.unReadCount = 1;
         }else {
           msg.unReadCount = 0;
         }
         const chat_id = msg.chat_id;
         let lastMsg = lastObjMsgs[chat_id];
         if(!lastMsg){
           lastObjMsgs[chat_id] = msg;
         }else{
             const unReadCount = lastMsg.unReadCount + msg.unReadCount;
             if(msg.create_time > lastMsg.create_time){
                 lastObjMsgs[chat_id] = msg;
             }
             lastObjMsgs[chat_id].unReadCount = unReadCount;
         }

     });
        let lastMsgs = Object.values(lastObjMsgs);
        lastMsgs.sort(function (msg1, msg2) {
            return msg2.create_time-msg1.create_time
        });
        return lastMsgs;
    };
    render(){
        const {user,chat} = this.props;
        const {users,chatMsgs} = chat;
        const meId = user._id;
        let lastMsgs = this.getLastMsgs(chatMsgs,meId);
        return (
            <List style={{marginTop:50,marginBottom:50}}>
                {lastMsgs.map(msg =>{
                    let targetId = "";
                    if(msg.to === meId){
                        targetId = msg.from;
                    }else if(msg.from === meId){
                        targetId = msg.to;
                    }
                    return (
                        <Item
                            onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={require(`../../assets/imgs/${users[targetId].header}.png`)}
                            arrow='horizontal'
                        >
                            {msg.content}
                            <Brief>{users[targetId].username}</Brief>
                        </Item>
                    )
                    }
                )}
            </List>
        )
    }
}

export default connect(
    state => ({chat:state.chat,user:state.user}),
    {}
)(Message);