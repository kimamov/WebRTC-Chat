const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const url = require('url');

function getDataAsync(request) {
    return new Promise((resolve, reject) => setTimeout(() => {
        nameFromQuery(request) === "kantemir" ? resolve("succesfully connected") : reject("failed")
    }, 500));
}

const app = express();
const server = http.createServer(app);
//const server = httpServer.listen(5000);
server.listen(5000);
const wss = new WebSocket.Server({
    server: server,
    clientTracking: true
});

function nameFromQuery(request) {
    const myUrl = url.parse(request.url);
    const params = new URLSearchParams(myUrl.search);
    return params.get("username")
}

wss.on('connection', (ws, request, data) => {
    const userName = nameFromQuery(request);
    ws.userName = userName;
    ws.send(data);
});

wss.on('message', data => console.log(data))

server.on('upgrade', async (request, socket, head) => {
    let data;

    try {
        data = await getDataAsync(request);
    } catch (error) {
        const res = new http.ServerResponse({
            httpVersionMajor: 1,
            httpVersionMinor: 1
        });

        res.assignSocket(socket);
        res.shouldKeepAlive = false;

        res.on('finish', () => {
            res.detachSocket(socket); // Not strictly needed.
            socket.destroySoon();
        });

        res.writeHead(500, 'internal server error');
        res.end();
        return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, data);
    });
});