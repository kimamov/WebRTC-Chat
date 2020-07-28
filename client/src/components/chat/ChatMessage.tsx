import React from 'react'
import { Card, styled, Theme } from '@material-ui/core'

interface Props {
    message: string
}

const MessageCard=styled(Card)({
    padding: '0.2rem 1rem',
    marginTop: '1rem',
    marginRight: 'auto',
    marginLeft: '1rem',
    display: 'inline-block'
})

const ChatMessage = ({message}: Props) => {
    return (
        <MessageCard>
            {message}
        </MessageCard>
    )
}

export default ChatMessage
