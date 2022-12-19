# Snapcast UI

A UI built on [Snapcast](https://github.com/badaix/snapcast). I wasn't satisfied with the default UI so I decided to start from scratch.

<div style="display:flex;gap:2%">
  <img src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/home.png" alt="Home Page" style="width: 48%;">
  <img src="https://raw.githubusercontent.com/ConnorsApps/snapcast-ui/main/demo/settings.png" alt="Settings Page" style="width: 48%;">
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
```

## Useful Links

[Snapcast JSON RPC Api](https://github.com/badaix/snapcast/blob/master/doc/json_rpc_api/control.md)

[Component Library MatUI](https://mui.com/material-ui/react-button/)

[Loading Animations](https://cssloaders.github.io/)

[Icons](https://react-icons.github.io/react-icons)