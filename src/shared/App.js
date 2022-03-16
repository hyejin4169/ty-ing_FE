import React from "react";
import './App.css';

import Header from "../components/Header"
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import Typing from '../pages/Typing';

import styled from 'styled-components';
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'
import { getCookie } from './Cookie';
import KakaoRedirect from "../pages/Kakaoredirect";
import FeedbackButton from "../components/FeedbackButton";
import ScriptFiltering from "../pages/ScriptFiltering";


function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const is_login = useSelector(state => state.user.is_login);
  console.log("is_login : ", is_login);

  React.useEffect(()=>{
    // if (!token) {
    //   return;
    // }
    if (token && is_login === false){
      dispatch(userActions.loginCheckDB());
    }
  },[]);

  return (
    <>
        <ConnectedRouter history={history}>
            <AppWrapper>
              <Header/>
              <Route exact path="/" exact component={Main} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route exact path="/api/kakao/callback" component={KakaoRedirect}/>
              <Route exact path='/typing/:script_id'  component={Typing}/>
              <Route exact path="/filtering" component={ScriptFiltering}/>
              <FeedbackButton/> 
            </AppWrapper>
        </ConnectedRouter>
    </>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`

export default App;
