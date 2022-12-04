import { EVENTS, REQUESTS } from "./Constants";

const host = process.env.REACT_APP_SNAPCAST_HOST;

export const ws = new WebSocket(`${host}/jsonrpc`);

export const requests = {};

let requestId = 0;

const sendRequest = (method) => {
    console.log('sendRequest', method);
    requests[requestId] = method;
    ws.send(JSON.stringify({ id: requestId, jsonrpc: '2.0', method }));
}

ws.addEventListener('open', () => sendRequest(REQUESTS.server.getStatus));


export const groupsReducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return action.groups;
        default:
            throw new Error('Unknown action ' + action.type);
    }
}
export const streamsReducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return action.streams;
        default:
            throw new Error('Unknown action ' + action.type);
    }
}
export const clientsReducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return action.clients;
        case EVENTS.client.onVolumeChanged:
            const params = action.params;
            state[params.id].volume = params.volume;
            // console.log("state", state);
            return state;
        default:
            throw new Error('Unknown action ' + action.type);
    }
}