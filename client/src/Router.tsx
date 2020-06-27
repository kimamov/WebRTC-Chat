import React, { Component } from 'react'
import { Box, Typography, Snackbar } from '@material-ui/core'
import Login from './components/auth/Login'
import Chat from './Chat'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import Notifications from './components/notifications/Notifications'
import SignUp from './components/auth/Signup'

export interface IAppProps {}

export interface IAppState {}

export default class Router extends Component<IAppProps, IAppState> {
  public render() {
    // app shell and routes
    return (
      <BrowserRouter>
        <Box>
          <Nav />
          {/* ROUTES */}
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
          {/* ROUTES END */}
          <Notifications />
        </Box>
      </BrowserRouter>
    )
  }
}
