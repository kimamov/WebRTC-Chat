import React, { useState } from 'react'
import { Box, Button, FormHelperText, TextField, Typography } from '@material-ui/core'
import { useStateContext } from '../../state/state'
import FormCard from '../FormCard'
import {signUp} from '../../api/api'
import { useHistory } from 'react-router-dom'
import { authFormStyles } from '../../styles/styles'

const SignUp = () => {
  const classes = authFormStyles()
  const history = useHistory()
  
  const { dispatch } = useStateContext()

  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe]=useState('')

  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordReError, setPasswordReError]=useState('')

  const [formError, setFormError] = useState('')

  const validate = () => {
    let passed = true
    // username field errors
    if (!username) {
      setNameError('name is required')
      passed = false
    }
    if (username.length < 4) {
      setNameError('min length for name is 4')
      passed = false
    }
    // password field errors
    if (password.length < 6) {
      setPasswordError('min length for password is 6')
      passed = false
    }
    // password repeat errors
    if(password!==passwordRe){
      setPasswordReError('passwords do not match')
      passed=false
    }
    return passed
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // if no errors try to submit
    if (validate()) {
      signUp(username, password)
        .then((response) => response.text())
        .then(() => {
          // open snackbar and notify user that he successfully logged in
          dispatch({
            type: 'createNotification',
            payload: {
              type: 'snackbar',
              alertType: 'success',
              message: 'successfully signed up. Please login now',
            },
          })
          // go to home after
          history.push('/login')
        })
        .catch((e) => {
          // tell the user login failed keep it for 4 seconds the remove it
          console.log(e)
          setFormError('could not sign up. Most likely the user already exists')
          setTimeout(() => setFormError(''), 4000)
          dispatch({
            type: 'createNotification',
            payload: {
              type: 'snackbar',
              alertType: 'error',
              message: 'could not sign up. Most likely the user already exists',
            },
          })
        })
    }
  }

  return (
    <Box display="flex" minHeight="100vh">
      <FormCard elevation={4}>
        <Typography align='center' display='block' variant="h4">
          Sign Up
        </Typography>
        <form className={classes.root} onSubmit={submit}>
          <TextField
            name="username"
            label="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
            required
            error={!!nameError}
            helperText={nameError}
          />

          <TextField
            name="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password"
            fullWidth
            size="small"
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            name="passwordRepeat"
            label="repeat password"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            variant="outlined"
            type="password"
            fullWidth
            size="small"
            required
            error={!!passwordReError}
            helperText={passwordReError}
          />

          <Button
            className={classes.submitButton}
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

export default SignUp
