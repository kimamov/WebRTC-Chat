import React, { Component } from 'react'
import { StateProvider } from './state/state'
import ThemeWrapper from './ThemeWrapper'

export default class App extends Component {
  // this only wraps the app inside the global state
  public render() {
    return (
      <StateProvider>
        <ThemeWrapper />
      </StateProvider>
    )
  }
}
