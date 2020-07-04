import React, { Component } from 'react'
import SimplePeer from 'simple-peer'
import Socket from './components/Socket'
import { TextField } from '@material-ui/core'
import { Context } from './state/state';

export interface IAppProps { }

export interface IAppState {
  textInput: string
  data: string
  connected: boolean
  targetUserId: string
}

export interface WebSocketMessage {
  type: string,
  data: any
}

function initSocket(username: string, password: string) {
  if (!username) return null
  // todo once client and server run on the same oirigin go back to cookie auth
  const socket = new WebSocket("ws://127.0.0.1:5000?username=" + username + "&password=" + password);

  socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("hey server");
  };

  socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
  };

  socket.onerror = function (error: any) {
    console.log(`[error] ${error.message}`);
  };

  return socket;
}

export default class Chat extends Component<IAppProps, IAppState> {
  static contextType = Context;
  peer: any = null
  private socket: WebSocket | null = null;
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      textInput: '',
      data: '',
      connected: false,
      targetUserId: ''
    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    this.setState(({ [e.target.name]: e.target.value } as unknown) as Pick<
      IAppState,
      keyof IAppState
    >)

  componentDidMount() {
    this.socket = initSocket(this.context?.state?.user?.username, "kantemir");
    this.createPeer(this.context.state.id, "3");
  }

  createPeer = (targetUserId: string, userId: string) => {
    this.peer = new SimplePeer({
      initiator: true,
      trickle: false,
    })

    this.peer.on('error', (err: Error) => console.log('error', err))

    this.peer.on('signal', (data: any) => {
      console.log('SIGNAL', data)
      this.socket?.send(JSON.stringify({
        type: 'offer',
        data: {
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

      (this.socket as WebSocket).onmessage((message: WebSocketMessage) => {
        if (message.type === "answer") {
          this.peer.signal(message.data)
        }
      })
  }

  addPeer = (userId: string, signal: any) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
    })

    peer.on('error', (err: Error) => console.log('error', err))

    peer.on('signal', (data: any) => {
      console.log('SIGNAL', data)
      this.socket?.send(JSON.stringify({
        type: 'answer',
        data: {
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
    if (this.state.connected) return this.peer.send(this.state.textInput)
    this.peer.signal(JSON.parse(this.state.textInput))
  }

  public render() {
    return (
      <div>
        <TextField
          color="primary"
          variant="outlined"
          size="small"
          label="target user"
          name="targetUserId"
          value={this.state.targetUserId}
          onChange={this.onChange}
        />
        <header>
          <p>
            {this.state.connected
              ? 'connection created'
              : 'waiting for connection'}
          </p>
        </header>
        <button onClick={this.initConnection}>init connection</button>
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
      </div>
    )
  }
}
