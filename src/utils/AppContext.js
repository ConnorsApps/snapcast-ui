import { createContext, useEffect, useReducer, useState } from 'react';
import { EVENTS, REQUESTS } from './Constants.js';
import { groupsReducer, streamsReducer, clientsReducer, ws, requests } from './WebSocket.js';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [clients, disbatchClients] = useReducer(clientsReducer, {});

    useEffect(() => {
        ws.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);
            const isRequest = data.id !== undefined;

            if (isRequest) {
                const event = requests[data.id];
                const result = data.result;

                if (event === REQUESTS.server.getStatus) {
                    const streams = {};
                    result.server.streams.map(stream => streams[stream.id] = stream);

                    setServer(result.server.server);

                    disbatchStreams({ type: 'init', streams });

                    const groups = {};
                    result.server.groups.map(group => groups[group.id] = group);

                    disbatchGroups({ type: 'init', groups });

                    const clients = {};
                    result.server.groups.forEach(group => group.clients.forEach(client => {
                        clients[client.id] = { ...client, groupId: group.id }
                    }));

                    disbatchClients({ type: 'init', clients });

                    setIsLoading(false);
                }
            } else {
                const event = data.method;
                const params = data.params;

                if (event === EVENTS.client.onVolumeChanged) {
                    disbatchClients({ type: event, params });

                    // console.log('params', params);

                } else {
                    console.log("event", event);
                }
            }
        });

        ws.onerror = (event) => console.error(event);
    }, []);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                clients,
                isLoading,
                disbatchStreams,
                disbatchGroups,
                disbatchClients,
            }}
        >
            {children}
        </AppContext.Provider>)
}