import React, { ReactElement } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStateContext } from '../state/state'

interface Props {
  children: ReactElement
  redirectPath?: string
  redirectMessage?: string
}

const ProtectedRoute = ({
  children,
  redirectPath = '/login',
  redirectMessage = 'you need to beed logged in to access this page',
  ...rest
}: Props) => {
  // check if user is logged in and redirect them to /login with some extra info if not
  const { state } = useStateContext()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: {
                from: location,
                message: redirectMessage,
              },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
