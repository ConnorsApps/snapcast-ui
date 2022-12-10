
const host = process.env.REACT_APP_SNAPCAST_HOST;

export const createNewWebsocket = () => ws = new WebSocket(`${host}/jsonrpc`);

export let ws = new WebSocket(`${host}/jsonrpc`);

let requestId = 0;
export const requests = {};

export const sendRequest = (method, params, saveRequest) => {
    if (saveRequest)
        requests[requestId] = method;

    ws.send(JSON.stringify({ id: requestId, jsonrpc: '2.0', method, params }));

    requestId++;
}

export const WEBSOCKET_STATUS = {
    connecting: 'connecting',
    open: 'open',
    closed: 'closed',
};

export const getWebsocketStatus = () => {
    const state = ws.readyState;
    let status;

    if (state === 0) {
        status = WEBSOCKET_STATUS.connecting;
    } else if (state === 1) {
        status = WEBSOCKET_STATUS.open;
    } else if (state === 2 || state === 3) {
        status = WEBSOCKET_STATUS.closed;
    } else {
        throw new Error('unknown websocket status', state)
    }
    return status;
}
