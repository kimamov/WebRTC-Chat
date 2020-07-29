export function initSocket(username: string, password: string) {
    if (!username || !password) return null
    // todo once client and server run on the same oirigin go back to cookie auth
    const socket = new WebSocket("ws://127.0.0.1:5000?username=" + username + "&password=" + password);

    socket.onopen = function (e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        socket.send(JSON.stringify({
            type: 'message',
            data: 'hey'
        }));
    };

    socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function (event) {
        // pass function to reconnect or redirect user to login
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

type JsonMessageTypes= 'offer' | 'answer' | 'iceCandidate' | 'getUsers' | 'directMessage' | 'message'


export const jsonMessage = (type: JsonMessageTypes, payload: any): string => JSON.stringify({ type: type, payload: payload }) 