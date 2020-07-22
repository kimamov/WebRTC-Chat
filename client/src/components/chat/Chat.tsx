import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { TextField, Button, Box, Card, Typography } from '@material-ui/core'
import { Context, Store } from '../../state/state';
import { initSocket } from '../../api/socket'
import { RouteComponentProps, match } from 'react-router-dom'

export interface MatchParams {
    id: string
}

export interface IAppProps extends RouteComponentProps<MatchParams> {
    socket: WebSocket
}



export interface IAppState {
    textInput: string

}


export default class Chat extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props)
        this.state = {
            textInput: '',

        }
    }
    onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
            IAppState,
            keyof IAppState
        >)


    public render() {
        const { id } = this.props.match.params;
        console.log(id)
        return (
            <Box flex={1} display='flex' paddingLeft={1} paddingTop={6} flexDirection='column' minHeight='100vh'>
                <Card> {/* chat header */}
                    <Typography variant='h6'>
                        Chat with {id}
                    </Typography>
                </Card>
                <Box style={{backgroundColor: 'red'}} flex={1}> {/* chat messages */}
                    test
                </Box>
                <Box marginTop='auto'> {/* chat input */}
                    <Typography>
                        suc
                    </Typography>
                </Box>
            </Box>
        )
    }
}
