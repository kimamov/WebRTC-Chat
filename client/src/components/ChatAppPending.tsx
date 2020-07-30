import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'

interface Props {
    socketState: string,
    reconnect():void
}

const ChatAppPending = ({ socketState, reconnect }: Props) => {
    return (
        <Box marginTop={6}>
            <Typography>
                {socketState}
            </Typography>
            <Button 
                onClick={reconnect}
                variant='contained'
                color='primary'
            >
                reconnect
            </Button>
        </Box>
    )
}

export default ChatAppPending
