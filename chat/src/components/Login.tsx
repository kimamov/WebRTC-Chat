import React, { Component } from 'react'
import { Box, Typography } from '@material-ui/core';

interface Props {
    login: () => void
}
interface State {

}

export default class Login extends Component<Props, State> {
    state = {}

    render() {
        return (
            <Box>
                <Typography>
                    Login
                </Typography>
            </Box>
        )
    }
}
