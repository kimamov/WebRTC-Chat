import React, { Component } from 'react'
import './App.css'
import { StateProvider } from './state/state'
import ThemeWrapper from './ThemeWrapper'

export default class App extends Component {
  // this only wrapps the app inside the global state
  public render() {
    return (
      <StateProvider>
        <ThemeWrapper />
      </StateProvider>
    )
  }
}
