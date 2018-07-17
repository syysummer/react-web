import {combineReducers} from "redux";

const initReducerOne = 0;
function reducerOne(preState = initReducerOne,action){
    switch(action.type){
        default :
            return preState;
    }
}

const initReducerTwo = {};
function reducerTwo(preState = initReducerTwo,action){
    switch(action.type){
        default :
            return preState;
    }
}

export default combineReducers({
    reducerOne,
    reducerTwo
});