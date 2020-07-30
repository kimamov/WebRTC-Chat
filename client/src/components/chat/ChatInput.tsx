import React, { useState } from 'react'
import { Box, TextField } from '@material-ui/core'

interface Props {
    sendMessage(message: string):void
}

const ChatInput = ({sendMessage}: Props) => {
    const [value, setValue]=useState('');
    return (
        <Box>
            <form onSubmit={(e)=>{
                    e.preventDefault();
                    sendMessage(value);
                    setValue('');
                }}>
                <TextField 
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    fullWidth
                    variant='outlined'
                    size='small'
                    
                />
            </form>
        </Box>
    )
}

export default ChatInput
