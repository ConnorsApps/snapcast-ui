export const REQUESTS = {
    client: {
        getStatus: 'Client.GetStatus',
        setVolume: 'Client.SetVolume',
        setLatency: 'Client.SetLatency',
        setName: 'Client.SetName',
    },
    group: {
        setStatus: 'Group.GetStatus',
        setMute: 'Group.SetMute',
        setStream: 'Group.SetStream',
        setClients: 'Group.SetClients',
        setName: 'Group.SetName',
    },
    server: {
        getRPCVersion: 'Server.GetRPCVersion',
        getStatus: 'Server.GetStatus',
        deleteClient: 'Server.DeleteClient',
    },
    stream: {
        addStream: 'Stream.AddStream',
        removeStream: 'Stream.RemoveStream',
        control: 'Stream.Control',
        setProperty: 'Stream.SetProperty',
    },
};

export const EVENTS = {
    client: {
        onConnect: 'Client.OnConnect',
        onDisconnect: 'Client.OnDisconnect',
        onVolumeChanged: 'Client.OnVolumeChanged',
        onLatencyChanged: 'Client.OnLatencyChanged',
        onNameChanged: 'Client.OnNameChanged',
    },
    group: {
        onMute: 'Group.OnMute',
        onStreamChanged: 'Group.OnStreamChanged',
        onNameChanged: 'Group.OnNameChanged',
    },
    server: {
        onUpdate: 'Server.OnUpdate',
    },
    stream: {
        onProperties: 'Stream.OnProperties',
        onUpdate: 'Stream.OnUpdate',
        control: 'Stream.Control',
        setProperty: 'Stream.SetProperty',
    },
};

