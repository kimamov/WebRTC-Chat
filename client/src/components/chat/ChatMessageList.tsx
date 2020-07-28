import React from 'react'
import { Box } from '@material-ui/core'
import { MessageSharp } from '@material-ui/icons'
import ChatMessage from './ChatMessage'

interface Props {
    messages: string[]
}

const ChatMessageList = ({messages=[]}: Props) => {
    return (
        <Box flex={1} flexDirection='column' display='flex'> {/* chat messages */}
            {messages.map(message=><ChatMessage message={message}/>)}
        </Box>
    )
}

export default ChatMessageList
