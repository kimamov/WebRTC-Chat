import React, { Component } from 'react';
import SimplePeer from 'simple-peer';
import Socket from './components/Socket'
import './App.css';




export interface IAppProps {
}

export default class App extends Component<IAppProps> {
  peer: any = null;
  state = {
    textInput: '',
    data: '',
    connected: false
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => this.setState({ [e.target.name]: e.target.value })

  componentDidMount() {
    this.createPeer();
  }

  createPeer = (init = true) => {
    this.peer = new SimplePeer({
      initiator: init,
      trickle: false
    })

    this.peer.on('error', (err: Error) => console.log('error', err));

    this.peer.on('signal', (data: any) => {
      console.log('SIGNAL', data);
      this.setState({ data: JSON.stringify(data, null, 2) });
    })

    this.peer.on('connect', () => {
      console.log('CONNECT');
      this.setState({ connected: true, data: '' })
      this.peer.send('any' + Math.random());
    })

    this.peer.on('data', (data: any) => {
      console.log('data: ' + data);
      this.setState({ data: String(data) })
    })
  }

  initConnection = () => this.createPeer(true);
  joinConnection = () => this.createPeer(false);

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.signalOrMessage();
  }

  signalOrMessage = () => {
    if (!this.peer) return;
    console.log(this.state.connected)
    if (this.state.connected) return this.peer.send(this.state.textInput);
    this.peer.signal(JSON.parse(this.state.textInput));
  }

  public render() {
    return (
      <div>
        <header>
          <p>
            {this.state.connected ?
              'connection created'
              :
              'waiting for connection'
            }
          </p>
        </header>
        <button onClick={this.initConnection}>init connection</button>
        <button onClick={this.joinConnection}>join connection</button>
        <form onSubmit={this.onSubmit}>
          <textarea name='textInput' value={this.state.textInput} cols={60} rows={10} onChange={this.onChange} />
          <input type="submit" value="submit" />
        </form>
        {this.state.data &&
          <>
            <h3>{this.state.connected ? 'message from your peer' : 'send the json string below to your peer to create a connection'}</h3>
            <pre>
              {this.state.data}
            </pre>
          </>
        }
        <Socket />
      </div>
    );
  }
}

