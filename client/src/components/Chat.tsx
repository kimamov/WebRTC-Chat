import React, { Component, Context as ContextInterface } from 'react'
import SimplePeer from 'simple-peer'
import { TextField, Button, Box, Card, Typography } from '@material-ui/core'
import { Context, Store } from '../state/state';
import { History } from 'history'
import { initSocket } from '../api/socket'
import ContactDrawer from './ContactDrawer';

export interface IAppProps {
    socket: WebSocket
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
    // actually a single chat with a user. Maybe add another wrapper that holds all the webRTC logic
    peer: any = null
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
        const { socket } = this.props;
        this.peer = new SimplePeer({
            initiator: true,
            trickle: false,
        })
        this.peer.on('error', (err: Error) => console.log('error', err))

        this.peer.on('signal', (data: any) => {
            console.log('SIGNAL', data)
            socket.send(JSON.stringify({
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

        socket.onmessage = (incomingMessage: WebSocketMessage) => {
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
        const { socket } = this.props;

        peer.on('error', (err: Error) => console.log('error', err))

        peer.on('signal', (data: any) => {
            console.log('SIGNAL', data)
            socket.send(JSON.stringify({
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
        if (this.state.connected || true) return this.peer.send(this.state.textInput)
    }

    public render() {
        return (
            <Box display='flex'>

            </Box>
        )
    }
}
