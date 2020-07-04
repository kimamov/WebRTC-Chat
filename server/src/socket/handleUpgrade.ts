const http = require('http');
import { sessionParser } from '../config'
import { getUser } from '../util/auth';
import { User } from '../entity/User';
const url = require('url')

module.exports = async function handleUpgrade(request, socket, head, wss) {
    let data;

    try {
        const parsedUrl = url.parse(request.url, true);
        const { username, password } = parsedUrl.query;
        if (!username || !password) throw new Error("either username or password missing in the query string");
        /* get user object from username and password */
        const user: User = await getUser(username, password);
        if (!user || !user.id || !user.username) throw new Error("received invalid data from database");
        request.user = user;
        console.log(request.user)
        /* this will handle auth in the future
         looks like auth for sockets is not possible without beeing on the same origin 
         not even with a proxy or cors settings */
        /* console.log("before parser")
        console.log(request.session);
        sessionParser(request, {}, ()=>{
            console.log("after parser")
            console.dir(request.session)
            console.log(request.isAuthenticated())
            console.log("done")
        }) */
        /* end auth */
    } catch (error) {
        console.log(error)
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
    })
}