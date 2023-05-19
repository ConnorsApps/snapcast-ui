import { EVENTS, REQUESTS } from "./Constants";
import { sendRequest } from "./WebSocket";

const clientsGroupId = (clientId, state) => {
    for (const group of Object.values(state)) {
        if (group.clients.includes(clientId)) {
            return group.id;
        }
    }
};

export const groupsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init') {
        // Use object instead of array for easy access later
        const groups = {};

        action.groups.forEach(group => {
            const clients = [];
            group.clients.forEach(client => clients.push(client.id));

            groups[group.id] = { ...group, clients };
        });

        return groups;

    } else if (event === EVENTS.group.onMute) {
        state[params.id].mute = params.mute;

    } else if (event === EVENTS.group.onStreamChanged) {
        state[params.id].stream_id = params.stream_id;

    } else if (event === EVENTS.group.onNameChanged) {
        state[params.id].name = params.name;

    } else if (event === REQUESTS.group.setStream) {

        state[params.id].stream_id = params.stream_id;
        sendRequest(REQUESTS.group.setStream, params);

    } else if (event === REQUESTS.group.setMute) {

        state[params.id].mute = params.mute;
        sendRequest(REQUESTS.group.setMute, params);

    } else if (event === REQUESTS.group.setName) {

        state[params.id].name = params.name;
        sendRequest(REQUESTS.group.setName, params);

    } else if (event === REQUESTS.group.setClients) {

        sendRequest(REQUESTS.group.setClients, params);

    } else if (REQUESTS.server.deleteClient) {
        const groupId = clientsGroupId(params.id, state);
        if (!groupId) {
            console.error("Unable to find client's group", params);
            return state;
        }
        delete state[groupId][params.id];
        sendRequest(REQUESTS.server.deleteClient, params);

    } else {
        console.error(`Groups Event not implimented`, state, action)
    }

    return { ...state };
}

export const clientsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init') {
        const clients = {};

        action.groups.forEach(group =>
            group.clients.forEach(client =>
                clients[client.id] = client
            )
        );
        return clients;
    } else if (event === EVENTS.client.onVolumeChanged) {

        state[params.id].config.volume = params.volume;

    } else if (event === EVENTS.client.onConnect || event === EVENTS.client.onDisconnect) {

        state[params.id] = params.client;

    } else if (event === EVENTS.client.onLatencyChanged) {

        state[params.id].config.latency = params.latency;

    } else if (event === EVENTS.client.onNameChanged) {

        state[params.id].config.name = params.name;

    } else if (event === REQUESTS.client.setVolume) {
        params.volume.percent = Math.round(params.volume.percent);

        state[params.id].config.volume = params.volume;
        sendRequest(REQUESTS.client.setVolume, params);

    } else if (event === REQUESTS.client.setLatency) {

        state[params.id].config.latency = params.latency;
        sendRequest(REQUESTS.client.setLatency, params);

    } else if (event === REQUESTS.client.setName) {

        state[params.id].config.name = params.name;
        sendRequest(REQUESTS.client.setName, params);

    } else {
        console.warn('Client Event not implimented', state, action)
    }

    return { ...state };
}

export const streamsReducer = (state, action) => {
    const params = action.params;
    const event = action.type;

    if (event === 'init') {

        return action.streams;

    } else if (event === EVENTS.stream.onUpdate) {

        state[params.id] = params.stream;

    } else if (event === EVENTS.stream.onProperties) {
        const stream = state[params.id];
        console.log('todo impliment stream onProperties stream:', stream, 'params:', params);

    } else {
        console.warn(`Streams Event not implimented`, state, action)
    }

    return { ...state };
}
