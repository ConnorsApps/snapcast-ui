
const host = process.env.REACT_APP_SNAPCAST_HOST;
let ws;

// export const createNewWebsocket = () => ws = new WebSocket(`${host}/jsonrpc`);

// export let ws = new WebSocket(`${host}/jsonrpc`);
export const WEBSOCKET_STATUS = {
    connecting: 'connecting',
    open: 'open',
    failed: 'failed',
};

const getWebsocketStatus = (ws) => {
    const state = ws.readyState;
    let status;

    if (state === 0) {
        status = WEBSOCKET_STATUS.connecting;
    } else if (state === 1) {
        status = WEBSOCKET_STATUS.open;
    } else if (state === 2 || state === 3) {
        status = WEBSOCKET_STATUS.connecting;
    } else {
        throw new Error('Unknown Websocket Status', state)
    }
    return status;
}

const MAX_RETRIES = 10;
const RETRY_WAIT = 5;

export const connectToSnapcastServer = (retries = 0, onMessage, onStatus) => {
    const url = `${host}/jsonrpc`;

    const retry = () => {
        if (retries > MAX_RETRIES) {
            onStatus(WEBSOCKET_STATUS.failed);
            console.error(`Unable to connect to web socket after ${MAX_RETRIES * RETRY_WAIT} seconds.`);
        } else {
            connectToSnapcastServer(retries++, onMessage, onStatus);
        }
    }

    console.debug(`Connecting to websocket at ${url}`);

    try {
        ws = new WebSocket(url);
    } catch (error) {
        console.error(`Unable to create Websocket ${JSON.stringify(error)}`);
        retry();
    }

    ws.onopen = () => {
        onStatus(getWebsocketStatus(ws));
        retries = 0;
    };

    ws.onerror = (error) => {
        onStatus(getWebsocketStatus(ws));
        console.error('Websocket emitted error', error);
    };

    ws.onmessage = onMessage;

    ws.onclose = (event) => {
        onStatus(getWebsocketStatus(ws));

        console.log(`Websocket closed, retring in ${RETRY_WAIT} seconds. Event ${JSON.stringify(event)}`);
        setTimeout(retry, RETRY_WAIT * 1000);
    };
}

let requestId = 0;
export const requests = {};

export const sendRequest = (method, params, saveRequest) => {
    if (saveRequest)
        requests[requestId] = method;

    try {
        if (ws) {
            ws.send(JSON.stringify({ id: requestId, jsonrpc: '2.0', method, params }));
        } else {
            throw new Error("Websocket is undefined");
        }

    } catch (error) {

        console.error(`Unable to send request${method}`, error);
    }

    requestId++;
}