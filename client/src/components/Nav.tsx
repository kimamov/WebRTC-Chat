import React from 'react'
import { useStateContext } from '../state/state'
import {
  AppBar,
  Toolbar,
  withStyles,
  Theme
} from '@material-ui/core'
import RouterLink from './RouterLink'
import NavUser from './navHeader/NavUser'
import NavGuest from './navHeader/NavGuest'


interface Props { }


/* const StyledLink = withStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
}))(RouterLink) */

const AppBarOnTop = withStyles((theme: Theme) => ({
  // put AppBar above drawer and actually anything else :)
  root: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))(AppBar)

const Nav = (props: Props) => {
  const { state } = useStateContext()
  const isLoggedIn=state.user && state.user.username;

  return (
    <AppBarOnTop position="fixed">
      <Toolbar variant="dense">
        {/* toggle drawer! only display when logged in */}
        {isLoggedIn?
          <NavUser user={state.user}/>
          :
          <NavGuest/>  
        }
      </Toolbar>
    </AppBarOnTop>
  )
}

export default Nav
