import { EVENTS, REQUESTS } from "./Constants";

const host = process.env.REACT_APP_SNAPCAST_HOST;

export const ws = new WebSocket(`${host}/jsonrpc`);

let requestId = 0;
export const requests = {};

export const sendRequest = (method, params, saveRequest) => {
    if (saveRequest)
        requests[requestId] = method;

    ws.send(JSON.stringify({ id: requestId, jsonrpc: '2.0', method, params }));

    requestId++;
}


export const groupsReducer = (state, action) => {
    const params = action.params;

    switch (action.type) {
        case 'init':
            return action.groups;
        case REQUESTS.group.setStream:
            state[params.id].stream_id = params.stream_id;

            sendRequest(REQUESTS.group.setStream, params);
            return { ...state };

        case REQUESTS.group.setMute:
            state[params.id].mute = params.mute;

            sendRequest(REQUESTS.group.setMute, params);
            return { ...state };
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
    const params = action.params;

    switch (action.type) {
        case 'init':
            return action.clients;
        case EVENTS.client.onVolumeChanged:
            state[params.id].config.volume = params.volume;

            return { ...state };
        case REQUESTS.client.setVolume:
            state[params.id].config.volume = params.volume;

            sendRequest(REQUESTS.client.setVolume, params);
            return { ...state };
        default:
            throw new Error('Unknown action ' + action.type);
    }
}