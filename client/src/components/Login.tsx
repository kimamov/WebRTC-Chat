import { Box, Typography, Card, TextField } from '@material-ui/core'
import React, { useState } from 'react'

interface Props {
  login: () => void
}

const Login = ({ login }: Props) => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box>
      <Card>
        <form onSubmit={login}>
          <TextField
            label="username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password"
          />
        </form>
      </Card>
    </Box>
  )
}

export default Login
