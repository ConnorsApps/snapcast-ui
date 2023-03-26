# Snapcast UI
Snapcast UI is a static user interface built on Snapcast to control multi-room audio playback.

A static UI built on [Snapcast](https://github.com/badaix/snapcast).

<div style="display:flex;gap:10%">
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/home.jpg" 
    alt="Home Page" 
    style="width: 45%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/settings.jpg" 
    alt="Settings Page" 
    style="width: 45%;"
  >
</div>

## Overview

### Tools
- [ReactJS](https://react.dev/)
- Component Library [MatUI](https://mui.com/material-ui)
- Loading Animations [cssloaders](https://cssloaders.github.io/)
- [Icons](https://react-icons.github.io/react-icons)

### Backend
It uses WebSockets to interact with the [Snapcast JSON RPC API](https://github.com/badaix/snapcast/blob/master/doc/json_rpc_api/control.md) for server communication.

### Local Testing
You can develop Snapcast UI locally using Docker Compose with mock Snapcast client and server services. Here are the steps:

1. Install docker and docker compose.
2. Copy `.env.example` to `.env`
3. Run `docker compose up`
4. Open http://localhost:3000/ in your web browser.

### Customisation

**Themes**: `default`, `roses`, `tropic`, `80s`, `liveLaughLove`

<div style="display:flex;justify-content: space-evenly;">
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/roses.jpg" 
    alt="Roses Theme"
    style="width: 30%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/80s.jpg" 
    alt="80s Theme"
    style="width: 30%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/tropic.jpg" 
    alt="Tropic Theme"
    style="width: 30%;"
  >
</div>

## Build and Install
There are two ways to host the static site: using Docker with the prebuilt nginx configuration or building the static files locally and serving them with a tool like [npm serve](https://www.npmjs.com/package/serve).

### Build Args
```
REACT_APP_HOME_TITLE="Home Audio"
REACT_APP_SNAPCAST_HOST="ws://localhost:1780"
REACT_APP_THEME="default"
```

### Using Docker

To use Docker, check out the build-example.sh file and modify the build args accordingly. Here is an example docker-compose.yaml:
```
version: '3'
services:
    frontend:
        image: "my-registry:latest"
        ports:
            - "3000:3000"
```

### Using npm Serve

To build and serve the static files locally, follow these steps:

1. Install [NodeJS](https://nodejs.org/en/download).
2. `npm install --global serve`
3. `npm install`
4. Copy `.env.example` to `.env` changing as needed. 
5. `npm build`
6. `serve build/`

The environment variables are read from the `.env` file when running `npm build`.