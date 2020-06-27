import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import Nav from './components/Nav'
import Notifications from './components/notifications/Notifications'
import Routes from './Routes'
import { useStateContext } from './state/state'

interface Props {
    
}

// app shell (template) also handles persistant state
const App = (props: Props) => {
    const {state}=useStateContext();
    useEffect(() => {
        console.log("asd")
        window.addEventListener('beforeunload',()=>{
            alert("hey")
            localStorage.setItem('chatState', JSON.stringify(state))
        })
        
    }, [state])
    return (
        <Box>
          <Nav />
            <main>
                <Routes/>
            </main>
          <Notifications />
        </Box>
    )
}

export default App
