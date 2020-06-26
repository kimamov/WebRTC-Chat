import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

interface IProps extends AlertProps {
  open: boolean
}

export default function SnackbarAlert(props: IProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.onClose}
    >
      <MuiAlert elevation={4} variant="filled" {...props}>
        {props.children}
      </MuiAlert>
    </Snackbar>
  )
}
