import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { TextField, Button, Box, Card, Typography } from '@material-ui/core'
import { Context, Store } from './state/state';
import { History } from 'history'
import { initSocket } from './api/socket'

export interface IAppProps {
  history: History
}

export interface IAppState {
  textInput: string
  data: string
  connected: boolean
  targetUserId: string
  callingUser: any
}

export interface WebSocketMessage {
  type: string,
  data: any
}

export default class Chat extends Component<IAppProps, IAppState> {
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
      callingUser: null
    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
      IAppState,
      keyof IAppState
    >)

  componentDidMount() {
    const socket = initSocket(this.context.state.user.username, "kantemir");
    if (!socket) {
      this.props.history.push('/login');
      return;
    }
    this.socket = socket;
    this.socket.onmessage = this.handleSocketMessage
  }

  handleSocketMessage = (incomingMessage: any) => {
    console.log(incomingMessage.data);
    try {
      const message = JSON.parse(incomingMessage.data);
      if (message.type === "offer") {
        this.setState({
          callingUser: message.payload
        })
      }
    }
    catch (e) {
      console.log(e);

    }
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
      this.socket?.send(JSON.stringify({
        type: 'offer',
        payload: {
          target: targetUserId,
          from: userId,
          data: data
        }
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
      console.log("working")
      this.socket.onmessage = (incomingMessage: WebSocketMessage) => {
        console.log("working too")
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
      this.socket?.send(JSON.stringify({
        type: 'answer',
        payload: {
          target: targetUserId,
          from: userId,
          data: data
        }
      }))
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
  /*  joinConnection = () => this.createPeer(false) */

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.signalOrMessage()
  }

  signalOrMessage = () => {
    if (!this.peer) return
    console.log(this.state.connected)
    if (this.state.connected || true) return this.peer.send(this.state.textInput)
    //this.peer.signal(JSON.parse(this.state.textInput))
  }

  public render() {
    return (
      <Box marginTop={4} padding={4}>
        <TextField
          color="primary"
          variant="outlined"
          size="small"
          label="target user"
          name="targetUserId"
          value={this.state.targetUserId}
          onChange={this.onChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.createTargetPeer}
        >
          Connect
        </Button>
        {this.state.callingUser &&
          <Card>
            <Typography>
              {this.state.callingUser.from}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.acceptPeer}
            >
              Accept
            </Button>
          </Card>
        }
        <header>
          <p>
            {this.state.connected
              ? 'connection created'
              : 'waiting for connection'}
          </p>
        </header>
        {/* <button onClick={this.joinConnection}>join connection</button> */}
        <form onSubmit={this.onSubmit}>
          <textarea
            name="textInput"
            value={this.state.textInput}
            cols={60}
            rows={10}
            onChange={this.onChange}
          />
          <input type="submit" value="submit" />
        </form>
        {this.state.data && (
          <>
            <h3>
              {this.state.connected
                ? 'message from your peer'
                : 'send the json string below to your peer to create a connection'}
            </h3>
            <pre>{this.state.data}</pre>
          </>
        )}
      </Box>
    )
  }
}
