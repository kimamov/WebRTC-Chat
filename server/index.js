const ws = require('ws');
const http = require('http');

const wss = new ws.Server({
    noServer: true,
});
const clients = new Set();

http.createServer((req, res) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}).listen(5000)

const onSocketConnect = (ws) => {
    clients.add(ws);
    console.log(clients)
    ws.on('message', (message) => {
        console.log(message)
        message = message.slice(0, 64);

        for (let client of clients) {
            client.send(message);
        }
    })

    ws.on('close', () => {
        console.log("socket " + ws + " left")
        clients.delete(ws)
    });
}