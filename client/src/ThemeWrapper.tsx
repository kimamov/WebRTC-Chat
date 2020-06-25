import React, { Component } from 'react'
import theme, { darkTheme } from './theme/theme'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Context } from './state/state'
import Router from './Router'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Context.Consumer>
        {({ state }) => (
          <ThemeProvider theme={state.darkMode ? darkTheme : theme}>
            <CssBaseline />
            <Router />
          </ThemeProvider>
        )}
      </Context.Consumer>
    )
  }
}
