import React from 'react'
import { useStateContext } from '../state/state'
import { Button } from '@material-ui/core'

interface Props {}

const Nav = (props: Props) => {
  const { state, dispatch } = useStateContext()
  console.log(state)
  return (
    <header>
      <Button
        onClick={() =>
          dispatch({
            type: 'toggleDark',
          })
        }
      >
        dark
      </Button>
    </header>
  )
}

export default Nav
