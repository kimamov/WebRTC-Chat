import React from 'react'
import RouterLink from '../RouterLink'
import { Box, styled } from '@material-ui/core'

interface Props {}

const StyledRouterLink=styled(RouterLink)(({theme})=>({
      marginLeft: theme.spacing(2)
}))



const NavGuest = (props: Props) => {
  return (
    <Box marginLeft="auto">
        <RouterLink to="/login">login</RouterLink>
        <StyledRouterLink to="/signup">signup</StyledRouterLink>
    </Box>
  )
}

export default NavGuest
