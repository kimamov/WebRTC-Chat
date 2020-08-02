import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { Box } from '@material-ui/core'
import { Context, Store } from '../../state/state';
import { History } from 'history'
import ChatAppDrawer from './ChatAppDrawer';
import Chat, { Message } from './Chat'
import ChatAppPending from './../ChatAppPending';
import { BasicUser, WebSocketMessage } from '../../types/types'
import { jsonMessage } from '../../api/socket';
import { Route } from 'react-router-dom';



export interface IAppProps {
  history: History
}

export interface IAppState {
  textInput: string
  data: string
  connected: boolean
  targetUserId: string
  callingUser: any
  socketState: string
  friendList: BasicUser[]
  chatHistories: ChatHistoriesObject
}



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
      textInput: '',
      data: '',
      connected: false,
      targetUserId: '',
      callingUser: null,
      socketState: 'STARTING',
      friendList: [],
      chatHistories: {"test": [], "passed": []}
    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
      IAppState,
      keyof IAppState
    >)

  componentDidMount() {
    this.connectToSocket();
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
          }else if(message.type==="directMessage"){
            this.handleReceivingDm(message.payload)
          }else if(message.type==="directMessageSucces"){
            this.handleOwnDm(message.payload)
          }
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


  handleDirectMessages=(message: Message, returning: boolean)=>{
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

  createPeer = (targetUserId: string, userId: string) => {
    if (!targetUserId || !userId) {
      console.log("invalid arguments");
      return;
    }
    this.peer = new SimplePeer({
      initiator: true,
      trickle: false,
    })
    this.peer.on('error', (err: Error) => console.log('error', err))

    this.peer.on('signal', (data: any) => {
      console.log('SIGNAL', data)
      this.socket?.send(jsonMessage('offer',
        {
          target: targetUserId,
          from: userId,
          data: data
        }))
      this.setState({ data: JSON.stringify(data, null, 2) })
    })

    this.peer.on('connect', () => {
      console.log('CONNECT')
      this.setState({ connected: true, data: '' })
      this.peer.send('any' + Math.random())
    })


    this.peer.on('data', (data: any) => {
      console.log('data: ' + data)
      this.setState({ data: String(data) })
    })

    if (this.socket) {
      this.socket.onmessage = (incomingMessage: MessageEvent) => {
        if (typeof incomingMessage.data === 'string') {
          try {
            const message = JSON.parse(incomingMessage.data);
            if (message.type === "answer") {
              console.log(message)
              this.peer.signal(message.payload.data)
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }

  createTargetPeer = () => {
    this.createPeer(this.state.targetUserId, this.context.state.user.id);
  }
  acceptPeer = () => {
    this.addPeer(this.state.callingUser.from, this.context.state.user.id, this.state.callingUser.data);
  }

  addPeer = (targetUserId: string, userId: string, signal: any) => {
    console.log(targetUserId, userId);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
    })

    peer.on('error', (err: Error) => console.log('error', err))

    peer.on('signal', (data: any) => {
      console.log('SIGNAL', data)
      this.socket?.send(jsonMessage('answer',
        {
          target: targetUserId,
          from: userId,
          data: data
        }
      ))
      this.setState({ data: JSON.stringify(data, null, 2) })
    })


    peer.on('data', (data: any) => {
      console.log('data: ' + data)
      this.setState({ data: String(data) })
    })

    peer.signal(signal);
    return peer;
  }

  initConnection = () => this.createPeer(this.context.user.id, this.state.targetUserId)

  
  // maybe create a socket context
  public render() {
    console.log(this.state.chatHistories)
    const {user}=this.context.state
    if (this.socket && this.state.socketState === "OPEN") return (
      <Box display='flex'>
        <ChatAppDrawer ws={this.socket} />
        <Route path="/chat/:id"
          render={(props) =>
            <Chat
              socket={this.socket as WebSocket}
              user={user}
              chatHistories={this.state.chatHistories}
              {...props}
            />
          }
        />

      </Box>
    )
    // for any other case than socket==="OPEN" do error, loading and reconnect handeling
    return <ChatAppPending socketState={this.state.socketState} reconnect={this.connectToSocket}/>
  }
}
