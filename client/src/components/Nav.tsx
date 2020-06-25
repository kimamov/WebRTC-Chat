import React from 'react'
import { useStateContext } from '../state/state'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  withStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import RouterLink from './RouterLink'

interface Props {}

const StyledSwitch = withStyles({
  root: {
    marginLeft: 'auto',
  },
})(Switch)

const StyledLink = withStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
}))(RouterLink)

const Nav = (props: Props) => {
  const { state, dispatch } = useStateContext()
  console.log(state)
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Chat
        </Typography>
        <StyledLink to="/login">LOGIN</StyledLink>
        <StyledSwitch onChange={() => dispatch({ type: 'toggleDark' })} />
      </Toolbar>
    </AppBar>
  )
}

export default Nav
