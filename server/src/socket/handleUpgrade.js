const http = require('http');

module.exports = async function handleUpgrade(request, socket, head, wss) {
    let data;

    try {
        console.log(request.httpRequest)
        console.log(request.httpRequest.session);
        console.log(request.user)
        data = await Promise.resolve("hello world");
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
}