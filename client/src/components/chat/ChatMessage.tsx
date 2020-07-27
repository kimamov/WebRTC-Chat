import React from 'react'
import { Card } from '@material-ui/core'

interface Props {
    message: string
}

const ChatMessage = ({message}: Props) => {
    return (
        <Card>
            {message}
        </Card>
    )
}

export default ChatMessage
