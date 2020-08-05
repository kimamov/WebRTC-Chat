import React, {useState} from 'react'
import SimplePeer from 'simple-peer'
import { Box } from '@material-ui/core'
import { Route } from 'react-router-dom';
import ChatAppDrawer from './ChatAppDrawer';
import Chat from './Chat'
import { User, Message } from '../../types/types';



interface Props {
    socket: WebSocket
    user: User
}

const ChatAppActive = ({socket, user}: Props) => {
    const [chatHistories, setHistories]=useState({})
    return (
      <Box display='flex'> {/* create another component to handle inner state */}
        <ChatAppDrawer socket={socket} />
        
        <Route path="/chat/:id"
          render={(props) =>
            <Chat
              socket={socket as WebSocket}
              user={user}
              chatHistories={chatHistories}
              {...props}
            />
          }
        />

      </Box>
    )
}

export default ChatAppActive
