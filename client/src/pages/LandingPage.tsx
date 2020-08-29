import React from 'react'
import { Typography, Box, styled, Button, Container } from '@material-ui/core'
import AppContainer from '../components/AppContainer'
import bgImage from '../static/chat.svg'
import { Link } from 'react-router-dom'
import UnstyledLink from '../components/chat/UnstyledLink'
import AuthRoutes from '../components/AuthRoutes'

interface Props {
    
}

const ContainerWithBackground=styled(AppContainer)(({theme})=>({
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'bottom right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: "100vh"
}))

const InfoBox=styled(Box)(({theme})=>({
    backgroundColor: `rgba(0,0,0,0.4)`,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2)
}))

const LandingPage = (props: Props) => {
    return (
        <>
            <ContainerWithBackground 
                display="flex"
                justifyContent="center"
                flexWrap="wrap-reverse"
                /* display="grid" 
                gridTemplateColumns="repeat(auto-fill, minmax(16rem, 1fr))" */
            >
                <Container>
                    <Box display="flex" width="100%" height="100%">
                        <InfoBox 
                            marginY="auto" 
                        >
                            <Typography>
                                Welcome to my chat app :)
                            </Typography>
                            
                            <UnstyledLink to="/login">
                                <Button variant="contained" color="primary">
                                    Login
                                </Button>
                            </UnstyledLink>
                            <UnstyledLink style={{marginLeft: "1rem"}} to="/signup">
                                <Button  variant="contained" color="secondary">
                                    Sign Up
                                </Button>
                            </UnstyledLink>
                        </InfoBox>
                    </Box>
                </Container>
            </ContainerWithBackground>
            <AuthRoutes/>
        </>
        
    )
}

export default LandingPage
