import React, { Component } from 'react'
import { Context } from '../state/state';



function initSocket(username: string) {
    if(!username) return null
    // todo once client and server run on the same oirigin go back to cookie auth
    const socket = new WebSocket("ws://127.0.0.1:5000?username="+username);

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

interface Props {

}
interface State {

}



export default class Socket extends Component<Props, State> {
    static contextType=Context;
    private socket: WebSocket | null = null;
    

    componentDidMount() {
        console.log(this.context)
        this.socket = initSocket(this.context?.state?.user?.username);
    }


    sendRandomMessage = () => {
        if (!this.socket) return
        console.log("was called");
        this.socket.send("hey thats a test");
    }


    render() {
        return (
            <div>
                <button onClick={this.sendRandomMessage}>send message</button>
            </div>
        )
    }
}
