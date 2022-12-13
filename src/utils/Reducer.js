import { EVENTS, REQUESTS } from "./Constants";
import { sendRequest } from "./WebSocket";

export const groupsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init') {
        return action.groups;
    } else if (event === REQUESTS.group.setStream) {

        state[params.id].stream_id = params.stream_id;
        sendRequest(REQUESTS.group.setStream, params);

    } else if (event === REQUESTS.group.setMute) {

        state[params.id].mute = params.mute;
        sendRequest(REQUESTS.group.setMute, params);

    } else if (event === REQUESTS.group.setName) {

        state[params.id].name = params.name;
        sendRequest(REQUESTS.group.setName, params);

    } else if (event === EVENTS.group.onMute) {
        
        state[params.id].mute = params.mute;

    } else if (event === EVENTS.group.onStreamChanged) {

        state[params.id].stream_id = params.stream_id;

    } else if (event === EVENTS.group.onNameChanged) {

        state[params.id].name = params.name;

    } else {
        console.error(`Unable to handle event`, state, action)
    }

    return { ...state };
}

export const streamsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init'){

        return action.streams;

    }else if(event === EVENTS.stream.onUpdate){

        state[params.id] = params.stream;

    }else if (event === EVENTS.stream.onProperties){
        const stream = state[params.id];

        console.log('stream ',stream,'params',params)

    } else {
        console.error(`Unable to handle event`, state, action)
    }
    return {...state};
}

export const clientsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init') {
        return action.clients;
    } else if (event === EVENTS.client.onVolumeChanged) {

        state[params.id].config.volume = params.volume;

    } else if (event === EVENTS.client.onConnect || event === EVENTS.client.onDisconnect) {

        state[params.id] = { ...params, id: params.id };

    } else if (event === EVENTS.client.onLatencyChanged) {

        state[params.id].config.latency = params.latency;

    } else if (event === EVENTS.client.onNameChanged) {

        state[params.id].config.name = params.name;

    } else if (event === REQUESTS.client.setVolume) {

        state[params.id].config.volume = params.volume;
        sendRequest(REQUESTS.client.setVolume, params);

    } else if (event === REQUESTS.client.setName) {

        state[params.id].config.name = params.name;
        sendRequest(REQUESTS.client.setName, params);
    } else {
        console.error(`Unable to handle event`, state, action)
    }

    return { ...state };
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