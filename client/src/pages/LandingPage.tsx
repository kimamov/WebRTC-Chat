import React from 'react'
import { Typography, Box, styled, Button, ButtonGroup } from '@material-ui/core'
import AppContainer from '../components/AppContainer'
import bgImage from '../static/chat.svg'

interface Props {
    
}

/* const ContainerWithBackground=styled(AppContainer)(({theme})=>({
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    minHeight: "100vh"
})) */

const LandingPage = (props: Props) => {
    return (
        <AppContainer 
            display="flex"
            justifyContent="center"
            flexWrap="wrap-reverse"
            /* display="grid" 
            gridTemplateColumns="repeat(auto-fill, minmax(16rem, 1fr))" */
        >
            <Box display="flex" flexBasis="20rem">
                <Box margin="auto">
                    <Typography>
                        Welcome to my chat app :)
                    </Typography>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    <Button style={{marginLeft: "1rem"}} variant="contained" color="secondary">
                        Sign Up
                    </Button>
                    
                </Box>
            </Box>
            <Box marginY={4} flex="auto" marginX="auto" maxWidth="100%" flexBasis="20rem">
                <img style={{
                        objectFit: "cover", 
                        maxWidth: "94%", 
                        maxHeight: "80vh",
                        display: "block",
                        margin: "0 auto"
                    }}

                    src={bgImage} 
                    alt="bg"
                />
            </Box>
            
        </AppContainer>
    )
}

export default LandingPage
