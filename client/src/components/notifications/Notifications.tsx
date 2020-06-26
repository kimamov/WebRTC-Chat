import React from 'react'
import Button from '@material-ui/core/Button'
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

  return (
    <>
      <SnackbarAlert
        open={Boolean(
          state.notification && state.notification.type === 'snackbar'
        )}
        onClose={handleClose}
      >
        successfully logged in
      </SnackbarAlert>
    </>
  )
}
