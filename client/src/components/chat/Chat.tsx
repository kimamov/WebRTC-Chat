import React, { Component, Context as ContextInterface } from 'react'
import {  Box } from '@material-ui/core'
import {  jsonMessage } from '../../api/socket'
import { RouteComponentProps } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { User } from '../../types/types';


export interface MatchParams {
    id: string
}

export interface IAppProps extends RouteComponentProps<MatchParams> {
    socket: WebSocket
    user: User
}



export interface IAppState {
    textInput: string
    messages: Message[]
}

export interface Message {
    from: string
    to: string
    data: string
}
    
function handleJsonMessage<T>(incomingMessage: MessageEvent, messageType: string):Promise<T>{
    return new Promise((resolve,reject)=>{
        if (typeof incomingMessage.data === 'string') {
            try {
                const message = JSON.parse(incomingMessage.data);
                if (message.type === messageType) {
                    resolve(message.payload)
                }
            } catch (e) {
                console.log(e);
                reject(e)
            }
        }
    })
}

  


export default class Chat extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props)
        this.state = {
            textInput: '',
            messages: [
                {from: 'kantemir', to: '1',  data: 'hello world'},
                {from: 'kantem', to: '1',  data: 'hello world'},
                {from: 'kantemir', to: '1',  data: 'hello world'},
                {from: 'kant', to: '1',  data: 'hello world'},
                {from: 'kan', to: '1',  data: 'hello world'},
                {from: 'kantemir', to: '1',  data: 'hello world'},
            ]
        }
    }
    componentDidMount(){
        const historyKey: string=`chatAppHistory_${this.props.match.params.id}`;

        this.storeChatHisory(historyKey);
        this.getChatHistory(historyKey);
        // add event handler to receive direct messages
        this.props.socket.onmessage=(message)=>
            handleJsonMessage<Message>(message, 'directMessage')
            .then((messageData: Message)=>this.setState({messages: [...this.state.messages, messageData]}))
    
    }

    getChatHistory=(historyKey: string)=>{
        // get chat history from local storage of it exists
        const historyString=localStorage.getItem(historyKey);
        if(historyString){
            try {
                const history=JSON.parse(historyString);
                // if its valid data set the messages state with it
                if(Array.isArray(history)){
                    this.setState({messages: history.map((message)=>{
                            if(typeof message.data === 'string' && message.data!==''){
                                return message
                            }
                        })
                        }
                    )
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
