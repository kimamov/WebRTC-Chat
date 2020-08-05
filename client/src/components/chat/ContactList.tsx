import React, { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import { BasicUser, WebSocketMessage } from '../../types/types'
import { jsonMessage } from '../../api/socket'
import { Link } from 'react-router-dom'

//const [friendList, loading, error] = useFetch<BasicUser[]>('http://localhost:5000/api/activefriends')


interface Props {
    socket: WebSocket
}

const ContactList: React.FC<Props> = ({ socket }) => {
    // get active users via WebSocket
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [friendList, setList] = useState<BasicUser[]>([]);

    useEffect(() => {
        function messageHandler(incomingMessage: MessageEvent) {
            if (typeof incomingMessage.data === 'string') {
                try {
                    const message: WebSocketMessage = JSON.parse(incomingMessage.data);
                    if (message.type === 'returnUsers') {
                        console.log(message.payload)

                        if (Array.isArray(message.payload)) {
                            setLoading(false);
                            return setList(message.payload);
                        }
                        throw new TypeError('received invalid data')
                    }
                } catch (error) {
                    console.dir(error)
                    setLoading(false);
                    setError('and error occured while getting active users');
                }
            }
        }
        socket.addEventListener('message', messageHandler);

        getActiveUsers();
        return () => {
            socket.removeEventListener('message', messageHandler)
        }
    }, [])

    const getActiveUsers = () => {
        setLoading(true);
        socket.send(jsonMessage('getUsers', { useId: 2 }))
    }

    if (error) return <Typography>error</Typography>
    if (loading) return <Typography>loading</Typography>
    if (friendList && friendList.length) return (
        <List>
            {friendList.map((friend) => (
                <Link key={Math.random()} to={`/chat/${friend.id}`}>
                    <ListItem button key={friend.id + '_' + Date.now()}>
                        <ListItemAvatar>
                            <Avatar></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={friend.username} />
                    </ListItem>
                </Link>

            ))}
        </List>
    )
    return <Typography>Loading</Typography>
}

export default ContactList
