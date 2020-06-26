import React from 'react'
import { useStateContext } from '../state/state'
import RouterLink from './RouterLink'
import { Box, Avatar } from '@material-ui/core'
import NavUserMenu from './NavUserMenu'

interface Props {}

const NavUserDisplay = (props: Props) => {
  const { state } = useStateContext()
  console.log(state.user)
  return (
    <Box marginLeft="auto">
      {state.user ? (
        <Box display="flex">
          <Avatar alt="user avatar" />
          <NavUserMenu />
        </Box>
      ) : (
        <RouterLink to="/login">login</RouterLink>
      )}
    </Box>
  )
}

export default NavUserDisplay
