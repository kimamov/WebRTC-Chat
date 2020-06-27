import React, { Component } from 'react'
import { StateProvider } from './state/state'
import ThemeWrapper from './ThemeWrapper'
import { BrowserRouter } from 'react-router-dom'


export default class StateWrapper extends Component {
  // this only wraps the app inside the global state and router
  componentDidMount(){
    window.addEventListener('beforeunload',()=>{

    })
  }
  public render() {
    return (
      <StateProvider>
        <BrowserRouter>
          <ThemeWrapper />
        </BrowserRouter>
      </StateProvider>
    )
  }
}
