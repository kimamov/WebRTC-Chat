import React from 'react'
import { Box } from '@material-ui/core'
import { MessageSharp } from '@material-ui/icons'
import ChatMessage from './ChatMessage'

interface Props {
    messages: string[]
}

const ChatMessageList = ({messages=[]}: Props) => {
    return (
        <Box style={{backgroundColor: 'red'}} flex={1}> {/* chat messages */}
            {messages.map(message=><ChatMessage message={message}/>)}
        </Box>
    )
}

export default ChatMessageList
