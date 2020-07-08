import React, {useState} from 'react'
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import useFetch from '../hooks/useFetch'
import {BasicUser} from '../../types/types'

interface Props {
    
}

const ContactList:React.FC<{}> = (props: Props) => {
    const [friendList, loading, error]=useFetch<BasicUser[]>('http://localhost:5000/api/activefriends')
    
    if(loading) return <Typography>loading</Typography>
    if(error) return <Typography>error</Typography>
    if(friendList && friendList.length) return (
        <List>
            {friendList.map((friend) => (
                <ListItem button key={friend.id+'_'+Date.now()}>
                    <ListItemAvatar>
                        <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={friend.username} />
                </ListItem>
            ))}
        </List>
    )
    return <Typography>Loading</Typography>
}

export default ContactList
