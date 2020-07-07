import React from 'react'
import { useStateContext } from '../state/state'
import RouterLink from './RouterLink'
import { Box, Avatar, styled } from '@material-ui/core'
import NavUserMenu from './NavUserMenu'

interface Props {}

const StyledRouterLink=styled(RouterLink)(({theme})=>({
      marginLeft: theme.spacing(2)
}))

const AvatarWithMargin=styled(Avatar)(({theme})=>({
  marginLeft: theme.spacing(1),
  /* marginRight: theme.spacing(1) */
}))

const NavUserDisplay = (props: Props) => {
  const { state } = useStateContext()
  console.log(state.user)
  return (
    <Box marginLeft="auto">
      {state.user ? (
        <Box display="flex">
          <NavUserMenu />
        </Box>
      ) : (
        <>
          <RouterLink to="/login">login</RouterLink>
          <StyledRouterLink to="/signup">signup</StyledRouterLink>
        </>
        
      )}
    </Box>
  )
}

export default NavUserDisplay
