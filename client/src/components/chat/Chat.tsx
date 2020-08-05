import React, { Component, Context as ContextInterface } from 'react'
import {  Box } from '@material-ui/core'
import {  jsonMessage } from '../../api/socket'
import { RouteComponentProps } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { User } from '../../types/types';
import { userInfo } from 'os';
import { ChatHistoriesObject } from './ChatApp';


export interface MatchParams {
    id: string
}

export interface IAppProps extends RouteComponentProps<MatchParams> {
    socket: WebSocket
    user: User
    chatHistories: ChatHistoriesObject
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
    componentDidMount(){
        /* TODO get the chat history here */
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
            IAppState,
            keyof IAppState
        >)
    sendMessage=(message: string)=>{
        const {socket, user, match}=this.props;
        if(!message || !socket) return;
        socket.send(jsonMessage('directMessage', {
            from: user.id,
            to: match.params.id,
            data: message 
        }))
    }

    public render() {
        const { id } = this.props.match.params;
        const messages=this.props.chatHistories[id] || [];
        console.log(id)
        return (
            <Box flex={1} display='flex' paddingTop={6} flexDirection='column' height='100vh'>
                <ChatHeader id={id}/>
                <ChatMessageList userId={this.props.user.id} messages={messages}/>
                <ChatInput sendMessage={this.sendMessage}/>
            </Box>
        )
    }
}
