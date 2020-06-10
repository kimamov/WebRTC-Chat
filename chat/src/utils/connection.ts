import SimplePeer from 'simple-peer';

export const createConnection = () => {
    const peer = new SimplePeer({
        initiator: window.location.hash === '#1',
        trickle: false
    })
    return peer;
}