import React, { ReactElement } from 'react'
import { Card, Typography, IconButton, withStyles, Theme } from '@material-ui/core'
import {VideoCall, Call } from '@material-ui/icons'


interface Props {
    id: String
}

const FlexCard=withStyles((theme: Theme)=>({
    root: {
        display: 'flex',
        paddingTop:  theme.spacing(1),
        paddingBottom:  theme.spacing(1),
        paddingRight:  theme.spacing(2),
        paddingLeft:  theme.spacing(2),
        alignItems: 'center',
        '& *:nth-child(n+2)': {
            marginLeft: '2rem'
        }
    },
    
}))(Card);

export default function ChatHeader({id}: Props): ReactElement {
    return (
        <FlexCard> {/* chat header */}
            <Typography variant='h6'>
                Chat with {id}
            </Typography>
            <IconButton>
                <VideoCall/>
            </IconButton>
            <IconButton>
                <Call/>
            </IconButton>                   
        </FlexCard>
    )
}
