import React, { Component } from 'react'
import { Box } from '@material-ui/core'
import Login from './components/Login'
import Chat from './Chat'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'

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
            <Route>
              <Chat />
            </Route>
          </Switch>
        </Box>
      </BrowserRouter>
    )
  }
}
