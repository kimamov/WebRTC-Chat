import React from 'react'
import { Box } from '@material-ui/core'
import ChatMessage from './ChatMessage'
import { Message } from '../../types/types'

interface Props {
    messages: Message[]
    userId: string
}

const ChatMessageList = ({messages=[], userId}: Props) => {
    return (
        <Box flex={1}  overflow='auto'> {/* chat messages */}
            <Box flexDirection='column' display='flex' maxWidth='40rem' paddingTop={2} paddingBottom={4}>
                {messages.map(message=><ChatMessage userId={userId} key={Math.random()} message={message}/>)}
            </Box>
        </Box>
    )
}

export default ChatMessageList
