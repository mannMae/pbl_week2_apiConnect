import './App.css';
import React, { memo, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {history} from '../redux/configureStore';
import {CookiesProvider} from "react-cookie";
import Apped from "./Apped";

import Header from '../components/Header';
import { Login, SignUp, Main, Detail, Write, Update } from '../pages';

import { useDispatch } from 'react-redux';
import { actionCreator as userActions } from '../redux/modules/user';
import { getCookie } from './Cookie';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    const token = getCookie("token")
    if (token) {
      dispatch(userActions.loginCheck(token));
    }
  }, []);

  return (
    <CookiesProvider>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Box>
          <Header></Header>
          <ConnectedRouter
          history={history}
          >
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/write" exact component={Write} />
            <Route path="/write/:id" exact component={Update} />
            <Route path="/post/:id" exact component={Detail} />
          </ConnectedRouter>
        </Box>
      </Container>
    </CookiesProvider>
  );
}

export default App;
