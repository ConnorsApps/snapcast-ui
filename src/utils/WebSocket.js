const MAX_RETRIES = 10;
const RETRY_WAIT = 2;
const TIMEOUT = 15;

const host = process.env.REACT_APP_SNAPCAST_HOST;
const websocketUrl = `${host}/jsonrpc`;
let ws;
let requestId = 0;
export const requests = {};

export const WEBSOCKET_STATUS = {
    connecting: 'connecting',
    open: 'open',
    failed: 'failed',
};

const getStatus = () => {
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
};

export const connectToSnapcastServer = (onMessage, onStatus, retries = 0) => {
    let hasRetried = false;

    const retry = () => {
        hasRetried = true;
        if (retries > MAX_RETRIES) {
            onStatus(WEBSOCKET_STATUS.failed);
            console.error(`Unable to connect to web socket after ${MAX_RETRIES * RETRY_WAIT} seconds.`);
        } else {
            connectToSnapcastServer(onMessage, onStatus);
        }
    }

    console.debug(`Connecting to websocket at ${websocketUrl}`);

    try {
        ws = new WebSocket(websocketUrl);
        // Connection timeout 5 seconds
        setTimeout(() => {
            if (!hasRetried && ws.readyState === 0)
                onStatus(WEBSOCKET_STATUS.failed);
        }, TIMEOUT * 5000);
    } catch (error) {
        console.error(`Unable to create Websocket ${JSON.stringify(error)}`);
        retry();
    }

    ws.onopen = () => {
        onStatus(getStatus());
    };

    ws.onerror = (error) => {
        onStatus(getStatus());
        console.error('Websocket emitted error', error);
    };

    ws.onmessage = onMessage;

    ws.onclose = (event) => {
        onStatus(getStatus());

        console.log(`Websocket closed, retring in ${RETRY_WAIT} seconds. Event ${JSON.stringify(event)}`);
        setTimeout(connectToSnapcastServer(onMessage, onStatus), RETRY_WAIT * 1000);
    };
}

export const sendRequest = (method, params, saveRequest) => {
    if (saveRequest)
        requests[requestId] = method;

    try {
        if (ws) {
            ws.send(JSON.stringify({
                id: requestId,
                jsonrpc: '2.0',
                method,
                params
            }));
        } else {
            throw new Error('Websocket is undefined');
        }

    } catch (error) {
        console.error(`Unable to send request ${method}`, error);
    }

    requestId++;
}