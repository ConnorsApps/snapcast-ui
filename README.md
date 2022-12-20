# Snapcast UI

A UI built on [Snapcast](https://github.com/badaix/snapcast). I wasn't satisfied with the default UI so I decided to start from scratch.

<div style="display:flex;gap:10%">
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/home.png" 
    alt="Home Page" 
    style="width: 45%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/settings.png" 
    alt="Settings Page" 
    style="width: 45%;"
  >
</div>

## Overview

### Framework
Built with [Reactjs](https://reactjs.org/). Static files served with nginx in container.

### Testing Locally
Develop locally with Docker compose with snapcast client server built in.

### Customisation
Args in Dockerfile:
```
ARG REACT_APP_HOME_TITLE
ARG REACT_APP_SNAPCAST_HOST
ARG REACT_APP_THEME
```

**Themes**: `default`, `roses`, `tropic`, `80s`, `liveLaughLove`

<div style="display:flex;justify-content: space-evenly;">
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/roses.png" 
    alt="Roses Theme"
    style="width: 30%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/80s.png" 
    alt="80s Theme"
    style="width: 30%;"
  >
  <img 
    src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/tropic.png" 
    alt="Tropic Theme"
    style="width: 30%;"
  >
</div>

## Useful Links

[Snapcast JSON RPC Api](https://github.com/badaix/snapcast/blob/master/doc/json_rpc_api/control.md)

[Component Library MatUI](https://mui.com/material-ui/react-button/)

[Loading Animations](https://cssloaders.github.io/)

[Icons](https://react-icons.github.io/react-icons)