import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { Box } from '@material-ui/core'
import { Context, Store } from '../../state/state';
import { History } from 'history'
import ChatAppPending from './../ChatAppPending';
import { BasicUser, WebSocketMessage, Message } from '../../types/types'
import { jsonMessage } from '../../api/socket';
import { Route } from 'react-router-dom';
import ChatAppActive from './ChatAppActive';



export interface IAppProps {
  history: History
}

export interface IAppState {
  connected: boolean
  socketState: SocketState
  friendList: BasicUser[]
  chatHistories: ChatHistoriesObject
}

export type SocketState= 'STARTING' | 'OPEN' | 'ERROR' | 'CLOSED'



export interface ChatHistoriesObject {
  [key: string]: Message[]
}

export default class ChatApp extends Component<IAppProps, IAppState> {
  /* component holding all the chats and active states 
    todo: move the actual webrtc connection stuff to the chat component
  */

  static contextType: ContextInterface<Store> = Context;
  peer: any = null
  private socket: WebSocket | null = null;
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      connected: false,
      socketState: 'STARTING',
      friendList: [],
      chatHistories: {},

    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
      IAppState,
      keyof IAppState
    >)

  componentDidMount() {
    this.connectToSocket();
    window.addEventListener('beforeunload', this.storeChatHistory)
    this.recoverChatHistory();
  }


storeChatHistory=()=>{
  const {id}=this.context.state.user
  localStorage.setItem('chat_chat_history_'+id, JSON.stringify(this.state.chatHistories));
}

recoverChatHistory=(): ChatHistoriesObject | {}=>{
  // todo maybe add encryption
  console.log(this.context)
  const {id}=this.context.state.user  
  const historyString=localStorage.getItem('chat_chat_history_'+id);
  if(!historyString) return {};
  try {
      const history=JSON.parse(historyString);
      return history;
  } catch (error) {
      console.log(error);
      return {}
  }
}

  connectToSocket=()=>{
    // just a stupid wrapper to make passing the function easier
    this.createSocketConnection(this.context?.state?.user?.username, "kantemir");
  }

  createSocketConnection = (username: string, password: string) => {
    if (!username || !password) {
      this.setState({
        socketState: 'ERROR'
      })
      return;
    }
    this.setState({
      socketState: 'STARTING'
    })
    // todo once client and server run on the same oirigin go back to cookie auth
    const socket = new WebSocket("ws://127.0.0.1:5000?username=" + username + "&password=" + password);
    if (!socket) {
      this.setState({
        socketState: 'ERROR'
      })
      return;
    }
    socket.onopen = (event) => {
      console.log("[open] Connection established");
      console.log("Sending to server");
      socket.send(jsonMessage('message', 'hey'));
      this.setState({
        socketState: 'OPEN'
      })
    };

    socket.onmessage = (incomingMessage: MessageEvent) => {
      // add call / offer event to the socket. 
      // Could do that inside initSocket but cba adding callbacks and promises are even more code :<
      //console.log(incomingMessage);
      if (typeof incomingMessage.data === 'string') {
        try {
          console.log(incomingMessage.data)
          const message = JSON.parse(incomingMessage.data);
          if (message.type === "offer") {
            this.setState({
              callingUser: message.payload
            })
          }/* else if(message.type==="directMessage"){
            this.handleReceivingDm(message.payload)
          }else if(message.type==="directMessageSucces"){
            this.handleOwnDm(message.payload)
          } */
        }
        catch (e) {
          console.log(e);
        }
      }

    };


    socket.onclose = (event) => {
      // pass function to reconnect or redirect user to login
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        this.setState({
          socketState: 'CLOSED'
        })
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
        this.setState({
          socketState: 'ERROR'
        })
      }

    };

    socket.onerror = (error: any) => {
      console.log(`[error] ${error.message}`);
      this.setState({
        socketState: 'ERROR'
      })
    };
    this.socket = socket;
  }


  /* handleDirectMessages=(message: Message, returning: boolean)=>{
    const {from, to, data}=message;
    //if(!from || !to || !data) return;
    let bucket=returning? to : from;
    let messages=this.state.chatHistories[bucket];
    if(messages){
      messages=[...messages, message];
    }else {
      messages=[message];
    }
    this.setState({
      chatHistories: {...this.state.chatHistories, [bucket]: messages}
    })
  }

  handleReceivingDm=(message: Message)=>{
    if(message.from==message.to) return;
    this.handleDirectMessages(message, false);
  }
  handleOwnDm=(message: Message)=>{
    this.handleDirectMessages(message, true);
  }
 */
  
  // maybe create a socket context
  public render() {
    console.log(this.state.chatHistories)
    const {user}=this.context.state
    
    if (this.socket && this.state.socketState === "OPEN") return (
      <ChatAppActive
        socket={this.socket}
        user={this.context.state.user}
      />
    )
    // for any other case than socket==="OPEN" do error, loading and reconnect handeling
    return <ChatAppPending socketState={this.state.socketState} reconnect={this.connectToSocket}/>
  }
}



