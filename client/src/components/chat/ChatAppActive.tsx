import React from 'react'
import { Box } from '@material-ui/core'

interface Props {
    
}

const ChatAppActive = (props: Props) => {
    return (
        <Box display='flex'> {/* create another component to handle inner state */}
        <ChatAppDrawer ws={this.socket} />
        
        <Route path="/chat/:id"
          render={(props) =>
            <Chat
              socket={this.socket as WebSocket}
              user={user}
              chatHistories={this.state.chatHistories}
              {...props}
            />
          }
        />

      </Box>
    )
}

export default ChatAppActive
