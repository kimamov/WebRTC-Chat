import React from 'react'
import Button from '@material-ui/core/Button'
import SnackbarAlert from './SnackbarAlert'

export default function Notifications() {
  // use this to handle all kinds of alerts snackbar modal etc
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <SnackbarAlert open={open} onClose={handleClose}>
        successfully logged in
      </SnackbarAlert>
    </div>
  )
}
