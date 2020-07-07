import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { useStateContext } from '../../state/state'
import { logOut } from '../../api/api'
import {
    Typography,
    IconButton,
    Switch,
    withStyles,
    Theme
  } from '@material-ui/core'

interface Props {
    user: any,
}

const StyledSwitch = withStyles((theme: Theme) => ({
    root: {
      marginLeft: 'auto',
      //marginLeft: theme.spacing(2),
    },
  }))(Switch)

const NavUser = ({user}: Props) => {
    const { dispatch } = useStateContext()
    const handleLogOut=async()=>{
        // move to the sidebar later
        try{
          await logOut()
          dispatch({type: 'logOut'})
        }
        catch(e){
          console.log(e);
          dispatch({type: 'logOut'})
        }
      }
    return (
        <>
            <IconButton onClick={handleLogOut} edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
                {user.username || "chat"}
            </Typography>
            <StyledSwitch onChange={() => dispatch({ type: 'toggleDark' })} />  
        </>
    )
}

export default NavUser
