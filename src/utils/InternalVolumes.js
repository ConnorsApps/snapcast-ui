
// Only change internal client volumes when user changes a client manually.
// This allows a unifed volume per stream in StreamBar.js to preserve each streams realtive original volume
const INTERNAL_CLIENT_VOLUMES = 'internalClientVolumes';

const get = () => {
    let storedVolumes = {};
    const internalClientVolumes = localStorage.getItem(INTERNAL_CLIENT_VOLUMES);
    if (internalClientVolumes)
        storedVolumes = JSON.parse(internalClientVolumes);

    return storedVolumes;
};

const set = (volumes) => localStorage.setItem(INTERNAL_CLIENT_VOLUMES, JSON.stringify(volumes));

const init = (clients) => {
    const storedVolumes = get();

    const volumes = {};

    for (const client of clients) {
        if (!storedVolumes[client.id]) {
            volumes[client.id] = { percent: client.config.volume.percent };
        } else {
            volumes[client.id] = storedVolumes[client.id];
        }
    }

    set(volumes);

    return volumes;
};

// Store recent requests to determine on client update message is caused from an external application
window.clientVolumeRequests = {};

const isLoopbackVolumeEvent = (params) => {
    const event = window.clientVolumeRequests[`${params.id}${params.volume.percent}`];

    if (event === undefined) {
        return false;
    } else {
        const secondsSince = (new Date() - event) / 1000;
        return secondsSince < 4;
    }
};

const storeVolumeEvent = (clientId, percent) => {
    window.clientVolumeRequests[`${clientId}${percent}`] = new Date();
};


export const InternalVolumes = { init, get, set, isLoopbackVolumeEvent, storeVolumeEvent };
