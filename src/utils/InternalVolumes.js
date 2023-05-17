
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
        }
    }

    set(volumes);
    return volumes;
};

export const internalVolumes = { init, get, set };
