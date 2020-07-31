import React from 'react'
import { Box } from '@material-ui/core'
import ChatMessage from './ChatMessage'
import { Message } from './Chat'

interface Props {
    messages: Message[]
    userId: string
}

const ChatMessageList = ({messages=[], userId}: Props) => {
    return (
        <Box flex={1} flexDirection='column' display='flex' maxWidth='40rem'> {/* chat messages */}
            {messages.map(message=><ChatMessage userId={userId} key={Math.random()} message={message}/>)}
        </Box>
    )
}

export default ChatMessageList
