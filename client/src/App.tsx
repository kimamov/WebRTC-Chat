import React, { Component } from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import './App.css'
import Login from './components/Login'
import Chat from './Chat'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StateProvider } from './state/state'

export interface IAppProps {}

export interface IAppState {
  user: {} | null
}

export default class App extends Component<IAppProps, IAppState> {
  peer: any = null
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      user: null,
    }
  }

  public render() {
    return (
      <StateProvider>
        <BrowserRouter>
          <Box>
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
      </StateProvider>
    )
  }
}
