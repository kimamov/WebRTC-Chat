import React, { Component } from 'react'
import { Box, Typography, Snackbar } from '@material-ui/core'
import Login from './components/auth/Login'
import ChatApp from './components/chat/ChatApp'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'

export interface IAppProps { }

export interface IAppState { }

export default class Routes extends Component<IAppProps, IAppState> {
  public render() {
    // app shell and routes
    return (
      <Switch>
        {/* <Route path="/welcome">
          <LandingPage/>
        </Route> */}
        <ProtectedRoute redirectComponent={LandingPage} component={ChatApp} />
      </Switch>
    )
  }
}
