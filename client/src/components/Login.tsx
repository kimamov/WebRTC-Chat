import React, { useState } from 'react'
import { Box, Typography, Button, Card, TextField } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStateContext } from '../state/state'

interface Props {
  login: () => void
}
const useStyles = makeStyles((theme) => ({
  formCard: {
    display: 'inline-flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    margin: 'auto',
  },
  passwordInput: {
    marginTop: theme.spacing(2),
  },
}))

const Login = () => {
  const classes = useStyles()
  const { state, dispatch } = useStateContext()
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  console.log(state)
  return (
    <Box display="flex" minHeight="100vh">
      <Card className={classes.formCard}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch({ type: 'signIn' })
          }}
        >
          <TextField
            label="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            type="password"
            fullWidth
            className={classes.passwordInput}
          />
          <Button type="submit" variant="contained" color="primary">
            SUBMIT
          </Button>
        </form>
      </Card>
    </Box>
  )
}

export default Login
