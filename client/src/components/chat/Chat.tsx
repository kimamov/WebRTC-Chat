import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { TextField, Button, Box, Card, Typography } from '@material-ui/core'
import { Context, Store } from '../../state/state';
import { initSocket } from '../../api/socket'
import { RouteComponentProps, match } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';

export interface MatchParams {
    id: string
}

export interface IAppProps extends RouteComponentProps<MatchParams> {
    socket: WebSocket
}



export interface IAppState {
    textInput: string
    messages: Message[]
}

export interface Message {
    from: string
    to: string
    own?: boolean
    data: string
}


export default class Chat extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props)
        this.state = {
            textInput: '',
            messages: [
                {from: 'kantemir', to: '1', own: true, data: 'hello world'},
                {from: 'kantem', to: '1', own: false, data: 'hello world'},
                {from: 'kantemir', to: '1', own: true, data: 'hello world'},
                {from: 'kant', to: '1', own: false, data: 'hello world'},
                {from: 'kan', to: '1', own: false, data: 'hello world'},
                {from: 'kantemir', to: '1', own: true, data: 'hello world'},
            ]
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
            <Box flex={1} display='flex' paddingTop={6} flexDirection='column' minHeight='100vh'>
                <ChatHeader id={id}/>
                <ChatMessageList messages={this.state.messages}/>
                <Box marginTop='auto'> {/* chat input */}
                    <Typography>
                        suc
                    </Typography>
                </Box>
            </Box>
        )
    }
}
