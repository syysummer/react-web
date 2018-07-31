import {combineReducers} from "redux";

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_CHAT_MSGS,
    RECEIVE_CHAT_MSG,
    CHAT_MSG_COUNT
} from "./action-types";
import {getRedirectTo} from "../utils"

const initUser = {
    username: "",
    type: "",
    msg: "",
    redirectTo: ""
};

function user(preState = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const user = action.data;
            return {...user, redirectTo: getRedirectTo(user.type, user.header)};
        case ERROR_MSG:
            return {...preState, msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default :
            return preState;
    }
}

const initUserList = [];

function userList(preState = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default :
            return preState;
    }
}

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
};

function chat(preState = initChat, action) {
    switch (action.type) {
        case RECEIVE_CHAT_MSGS:
            let {users,chatMsgs} = action.data.chatMsgs;
            let meId = action.data.meId;
            let unReadCount = chatMsgs.reduce((pre,msg) => {
            return pre + ((!msg.read && msg.to === meId) ? 1 : 0)
            },0);
            return {
                users,
                chatMsgs,
                unReadCount: unReadCount
            };
        case RECEIVE_CHAT_MSG:
            const data = action.data;
            return {
             users:preState.users,
             chatMsgs:[...preState.chatMsgs,data.chatMsg],
             unReadCount: preState.unReadCount + (!data.chatMsg.read && data.chatMsg.to === data.meId ? 1 : 0)
            };
        case CHAT_MSG_COUNT:
            const {count,from,to} = action.data;
            return {
              users:preState.users,
              chatMsgs : preState.chatMsgs.map(msg => {
                if(msg.from === from && msg.to === to && !msg.read){
                    return {...msg, read: true}
                }
                return msg
              }),
              unReadCount:preState.unReadCount - count
            };
        default :
            return preState
    }
}
export default combineReducers({
    user,
    userList,
    chat
});