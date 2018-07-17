import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Switch} from "react-router-dom";
import {Provider} from "react-redux";

import Login from "./containers/login/Login";
import Register from "./containers/register/Register";
import Main from "./containers/main/Main";
import store from "./redux/store";

ReactDOM.render(
    (
   <Provider store={store}>
    <HashRouter>
      <Switch>
         <Route path="/login" component={Login}/>
         <Route path="/register" component={Register}/>
         <Route component={Main}/>
      </Switch>
    </HashRouter>
   </Provider>
    ),
    document.getElementById('root')
);