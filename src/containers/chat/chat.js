/*
对话聊天的路由组件
 */
import React, {Component} from 'react'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
import {connect} from "react-redux";
import {sendMessage,readChatMsg} from "../../redux/actions";
import QueueAnim from 'rc-queue-anim'

const Item = List.Item;

class Chat extends Component {
    state = {
        content: "",
        isShow: false
    };
    send = () => {
        const content = this.state.content;
        if(!(content.trim())){
            return;
        }
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        this.props.sendMessage({from,content,to});
        this.setState({content: ""})
    };

    componentDidMount() {
        //首次刷新消息列表时,自动滚动到底部
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() {
        //当状态更新时,自动滚动到底部
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentWillMount(){
        let emojisStr = "😀,😄,😙,😂,😅,😆,🤗,🤔,😐,😣,🤐,😪,😖,😭,😧,😰,😵,🤕,😈,😀,😄,😙,😂,😅,😆,🤗,🤔,😐,😣,🤐,😪,😖,😭,😧,😰,😵,🤕,😈,😀,😄,😙,😂,😅,😆,🤗,🤔,😐,😣,🤐,😪,😖,😭,😧,😰,😵,🤕,😈,😀,😄,😙,😂,😅,😆,🤗,🤔,😐,😣,🤐,😪,😖,😭,😧,😰,😵,🤕,😈,😭,😧,😰,😵,🤕,😭,😧,😰,😵,🤕,😭,😧,😰,😵,🤕,😰,😵,🤕";
        let emojis =[];
        emojisStr.split(",").forEach(text => {
           emojis.push({text})
        });
        this.emojis = emojis;
    }
    toggleShow = ()=>{
      const isShow = !this.state.isShow;
      this.setState({isShow});
      if(isShow){
        setTimeout(() => {
           window.dispatchEvent(new Event('resize'))
        },0)
      }
     };
     componentWillUnmount(){
       const from = this.props.match.params.userid;
       const to = this.props.user._id;
       this.props.readChatMsg(from,to);
     }
    render() {
        const targetId = this.props.match.params.userid;
        const {users, chatMsgs} = this.props.chat;
        if (!users[targetId]) {
            return null //暂时先不显示
        }
        const user = this.props.user;
        const meId = user._id;
        const chatId = [targetId, meId].sort().join("_");
        const msgs = chatMsgs.filter(msg => {
            return chatId === msg.chat_id
        });
        const headerIcon = require(`../../assets/imgs/${users[targetId].header}.png`);
        return (
            <div id='chat-page'>
                <NavBar className="fix-top"
                        icon={<Icon type='left'/>}
                        onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}</NavBar>
                <QueueAnim type='scale' delay={100}>
                    <List style={{marginTop: 50, marginBottom: 50}}>
                        {
                            msgs.map(msg => {
                                if (msg.to === meId) {
                                    return (<Item
                                        key={msg._id}
                                        thumb={headerIcon}
                                    >
                                        {msg.content}
                                    </Item>)
                                } else if (msg.from === meId) {
                                    return (<Item
                                        key={msg._id}
                                        className='chat-me'
                                        extra='我'
                                    >
                                        {msg.content}
                                    </Item>)
                                }
                            })
                        }
                    </List>
                </QueueAnim>
                <div className='am-tab-bar'>
                    <InputItem
                        onChange={(val) => this.setState({content: val})}
                        placeholder="请输入"
                        value={this.state.content}
                        extra={
                            <div>
                                <span onClick={this.toggleShow} style={{marginRight: 10}}>
                                😀
                                </span>
                                <span onClick={this.send}>发送</span>
                            </div>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMessage,readChatMsg}
)(Chat)