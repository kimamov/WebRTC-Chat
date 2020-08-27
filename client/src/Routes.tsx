import React, { Component } from 'react'
import { Box, Typography, Snackbar } from '@material-ui/core'
import Login from './components/auth/Login'
import ChatApp from './components/chat/ChatApp'
import { Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import Notifications from './components/notifications/Notifications'
import SignUp from './components/auth/Signup'
import LandingPage from './pages/LandingPage'

export interface IAppProps { }

export interface IAppState { }

export default class Routes extends Component<IAppProps, IAppState> {
  public render() {
    // app shell and routes
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/welcome">
          <LandingPage/>
        </Route>
        <ProtectedRoute redirectPath="/welcome" component={ChatApp} />
      </Switch>
    )
  }
}
