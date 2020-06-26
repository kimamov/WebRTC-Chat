import React, { Component } from 'react'
import { Box, Typography } from '@material-ui/core'
import Login from './components/Login'
import Chat from './Chat'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'

export interface IAppProps {}

export interface IAppState {}

export default class Router extends Component<IAppProps, IAppState> {
  public render() {
    return (
      <BrowserRouter>
        <Box>
          <Nav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/welcome">
              <Typography>Welcome :)</Typography>
            </Route>
            <ProtectedRoute redirectPath="/welcome">
              <Chat />
            </ProtectedRoute>
          </Switch>
        </Box>
      </BrowserRouter>
    )
  }
}
