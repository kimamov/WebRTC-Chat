import React from 'react'
import SnackbarAlert from './SnackbarAlert'
import { useStateContext } from '../../state/state'

export default function Notifications() {
  // use this to handle all kinds of alerts snackbar modal etc
  const { state, dispatch } = useStateContext()

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: 'deleteNotification' })
  }

  const isOpen=(type: string)=>{
    return Boolean(state.notification && state.notification.type === type)
  }

  return (
    <>
      <SnackbarAlert
        open={isOpen('snackbar')}
        onClose={handleClose}
        severity={state.notification?.alertType}
      >
        {state.notification?.message}
      </SnackbarAlert>
    </>
  )
}
