import React, { Component } from 'react'
import { Box, Typography, Snackbar } from '@material-ui/core'
import Login from './components/auth/Login'
import Chat from './Chat'
import { Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import Notifications from './components/notifications/Notifications'
import SignUp from './components/auth/Signup'

export interface IAppProps {}

export interface IAppState {}

export default class Routes extends Component<IAppProps, IAppState> {
  public render() {
    // app shell and routes
    return (
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/welcome">
              <Typography>Welcome :)</Typography>
            </Route>
            <ProtectedRoute redirectPath="/welcome">
              <Chat />
            </ProtectedRoute>
          </Switch>
    )
  }
}
