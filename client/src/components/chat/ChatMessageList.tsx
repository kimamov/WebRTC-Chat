import React from 'react'
import { Box } from '@material-ui/core'
import ChatMessage from './ChatMessage'
import { Message } from './Chat'

interface Props {
    messages: Message[]
}

const ChatMessageList = ({messages=[]}: Props) => {
    return (
        <Box flex={1} flexDirection='column' display='flex' maxWidth='40rem'> {/* chat messages */}
            {messages.map(message=><ChatMessage message={message}/>)}
        </Box>
    )
}

export default ChatMessageList
