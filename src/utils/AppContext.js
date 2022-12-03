import { createContext, useEffect, useReducer, useState } from "react";

const host = process.env.REACT_APP_SNAPCAST_HOST;
const ws = new WebSocket(`${host}/jsonrpc`);
const request = {
    'id': 0,
    'jsonrpc': '2.0',
    'method': 'Server.GetStatus'
};

ws.addEventListener('open', () => {
    console.log("sending");
    ws.send(JSON.stringify(++request.id && request))
});

export const AppContext = createContext(null);

// const groupsReducer = (state, action) =>{
    // switch (action.type) {
// }

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [streams, setStreams] = useState({});
    const [server, setServer] = useState([]);
    const [groups, setGroups] = useState([]);
    // const [groups, disbatchGroups] = useReducer()

    useEffect(() => {
        ws.addEventListener('message', (message) => {
            const data = JSON.parse(message.data).result.server;
            console.log("data",data)
            const streams = {};
            
            data.streams.map(stream => streams[stream.id] = stream);

            setStreams(streams);
            setServer(data.server);
            setGroups(data.groups);

            setIsLoading(false);
        });

        
        ws.onerror = (event) => console.error(event);
    }, []);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                isLoading,
            }}
        >
            {children}
        </AppContext.Provider>)
}