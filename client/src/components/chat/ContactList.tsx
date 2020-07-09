import React, { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import useFetch from '../hooks/useFetch'
import { BasicUser, WebSocketMessage } from '../../types/types'

//const [friendList, loading, error] = useFetch<BasicUser[]>('http://localhost:5000/api/activefriends')


interface Props {
    ws: WebSocket
}

const ContactList: React.FC<Props> = ({ ws }) => {
    // get active users via WebSocket
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [friendList, setList] = useState<BasicUser[]>([]);

    useEffect(() => {
        function messageHandler(incomingMessage: any) {
            if (typeof incomingMessage.data === 'string') {
                try {
                    const message: WebSocketMessage = JSON.parse(incomingMessage.data);
                    if (message.type === 'returnUsers') {
                        if (Array.isArray(message.data)) {
                            return setList(message.data);
                        }
                        setLoading(false);
                        throw new TypeError('received invalid data')
                    }
                } catch (error) {
                    console.dir(error)
                    setLoading(false);
                    setError('and error occured while getting active users');
                }
            }
        }
        ws.addEventListener('message', messageHandler);

        getActiveUsers();
        return () => {
            ws.removeEventListener('message', messageHandler)
        }
    }, [])

    const getActiveUsers = () => {
        setLoading(true);
        ws.send(JSON.stringify({
            type: 'getUsers',
            data: { // tell the WebSocket server to get active state for the friends of user with userId
                userId: '2'
            }
        }))
    }

    if (error) return <Typography>error</Typography>
    if (loading) return <Typography>loading</Typography>
    if (friendList && friendList.length) return (
        <List>
            {friendList.map((friend) => (
                <ListItem button key={friend.id + '_' + Date.now()}>
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
