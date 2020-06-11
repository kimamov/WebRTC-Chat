import React, { Component } from 'react';
import { Container, Grid, Box } from '@material-ui/core'
import './App.css';
import Login from './components/Login';
import Chat from './Chat';




export interface IAppProps {
}

export interface IAppState {
  user: {} | null
}

export default class App extends Component<IAppProps, IAppState> {
  peer: any = null;
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      user: null
    }
  }


  public render() {
    return (
      <Box>
        {this.state.user ?
          <Chat />
          :
          <Login login={() => console.log("done")} />
        }
      </Box>
    );
  }
}

