import React from 'react'
import { Box, Typography } from '@material-ui/core'

interface Props {
    socketState: string
}

const ChatAppPending = ({ socketState }: Props) => {
    return (
        <Box>
            <Typography>
                {socketState}
            </Typography>
        </Box>
    )
}

export default ChatAppPending
