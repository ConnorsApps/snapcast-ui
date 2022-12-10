import { EVENTS, REQUESTS } from "./Constants";
import { sendRequest } from "./WebSocket";

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
        case REQUESTS.client.setName:
            state[params.id].config.name = params.name;

            sendRequest(REQUESTS.client.setName, params);
            return { ...state };
        default:
            throw new Error('Unknown action ' + action.type);
    }
}

export const stateFromStatus = (result) => {
    const server = result.server.server;

    const streams = {};
    result.server.streams.map(stream => streams[stream.id] = stream);

    const groups = {};
    result.server.groups.map(group => groups[group.id] = group);

    const clients = {};
    result.server.groups.forEach(group => group.clients.forEach(client => {
        clients[client.id] = { ...client, groupId: group.id }
    }));

    return { server, streams, groups, clients };
}