import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { TextField, Button, Box, Card, Typography } from '@material-ui/core'
import { Context, Store } from '../../state/state';
import { initSocket, jsonMessage } from '../../api/socket'
import { RouteComponentProps, match } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { Socket } from 'net';

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
    componentDidMount(){
        const historyKey: string=`chatAppHistory_${this.props.match.params.id}`;

        this.storeChatHisory(historyKey);
        this.getChatHistory(historyKey);
    }
    getChatHistory=(historyKey: string)=>{
        // get chat history from local storage of it exists
        const historyString=localStorage.getItem(historyKey);
        if(historyString){
            try {
                const history=JSON.parse(historyString);
                // if its valid data set the messages state with it
                if(Array.isArray(history)){
                    this.setState({messages: history})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    storeChatHisory=(historyKey: string)=>{
        // store chat history inside local storage
        window.addEventListener('beforeunload',()=>{
            localStorage.setItem(historyKey, JSON.stringify(this.state.messages));

        })
    }
    onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
            IAppState,
            keyof IAppState
        >)
    sendMessage=(message: string)=>{
        const {socket}=this.props;
        /* socket.send(
            jsonMessage('')
        ) */
        this.setState({messages: [...this.state.messages, {from: 'kantemir', to: '1', own: true, data: message}]})
    }

    public render() {
        const { id } = this.props.match.params;
        console.log(id)
        return (
            <Box flex={1} display='flex' paddingTop={6} flexDirection='column' minHeight='100vh'>
                <ChatHeader id={id}/>
                <ChatMessageList messages={this.state.messages}/>
                <ChatInput sendMessage={this.sendMessage}/>
            </Box>
        )
    }
}
