import React from 'react'
import { useStateContext } from '../state/state'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  withStyles,
  Theme
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import RouterLink from './RouterLink'
import NavUserDisplay from './NavUserDisplay'

interface Props { }

const StyledSwitch = withStyles((theme: Theme) => ({
  root: {
    //marginLeft: 'auto',
    marginLeft: theme.spacing(2),
  },
}))(Switch)

const StyledLink = withStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
}))(RouterLink)

const AppBarOnTop = withStyles((theme: Theme) => ({
  // put AppBar above drawer and actually anything else :)
  root: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))(AppBar)

const Nav = (props: Props) => {
  const { state, dispatch } = useStateContext()
  return (
    <AppBarOnTop position="fixed">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Chat
        </Typography>
        <NavUserDisplay />
        <StyledSwitch onChange={() => dispatch({ type: 'toggleDark' })} />
      </Toolbar>
    </AppBarOnTop>
  )
}

export default Nav
