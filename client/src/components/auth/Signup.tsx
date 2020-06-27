import React, { useState } from 'react'
import { Box, Button, FormHelperText, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useStateContext } from '../../state/state'
import FormCard from '../FormCard'
import login from '../../api/login'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  formCard: {
    margin: 'auto',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}))

const Signup = () => {
  const classes = useStyles()
  const history = useHistory()
  const { dispatch } = useStateContext()
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')

  const validate = () => {
    let passed = true
    if (!username) {
      setNameError('name is required')
      passed = false
    }
    if (username.length < 4) {
      setNameError('min length for name is 4')
      passed = false
    }
    if (password.length < 6) {
      setPasswordError('min length for password is 6')
      passed = false
    }
    return passed
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    // if no errors try to submit
    if (validate()) {
      login(username, password)
        .then((data) => data.json())
        .then((json) => {
          // check if response has the required field
          if (!json.user) throw new Error('invalid response')
          dispatch({
            type: 'logIn',
            payload: json.user,
          })
          // open snackbar and notify user that he successfully logged in
          dispatch({
            type: 'createNotification',
            payload: {
              type: 'snackbar',
              alertType: 'success',
              message: 'successfully logged in',
            },
          })
          // go to home after
          history.push('/')
        })
        .catch((e) => {
          // tell the user login failed keep it for 4 seconds the remove it
          console.log(e)
          setFormError('could not login')
          setTimeout(() => setFormError(''), 4000)
          dispatch({
            type: 'createNotification',
            payload: {
              type: 'snackbar',
              alertType: 'error',
              message: 'could not log in',
            },
          })
        })
    }
  }

  return (
    <Box display="flex" minHeight="100vh">
      <FormCard className={classes.formCard}>
        <form onSubmit={submit}>
          <TextField
            label="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            required
            error={!!nameError}
            helperText={nameError}
          />

          <TextField
            label="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className={classes.marginTop}
            type="password"
            fullWidth
            required
            error={!!passwordError}
            helperText={passwordError}
          />

          <Button
            className={classes.marginTop}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            SUBMIT
          </Button>

          <FormHelperText error={!!formError}>{formError}</FormHelperText>
        </form>
      </FormCard>
    </Box>
  )
}

export default Signup
