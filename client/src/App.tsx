import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import Nav from './components/Nav'
import Notifications from './components/notifications/Notifications'
import Routes from './Routes'

interface Props {

}


// app shell (template) also handles persistant state
const App = (props: Props) => {

    return (
        <Box>
            <Nav />
            <main>
                <Routes />
            </main>
            <Notifications />
        </Box>
    )
}

export default App
