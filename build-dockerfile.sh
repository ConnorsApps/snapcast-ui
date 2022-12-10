docker buildx create --use --name snapcast-ui

docker buildx build . \
    --build-arg REACT_APP_HOME_TITLE="Home Audio" \
    --build-arg REACT_APP_SNAPCAST_HOST="ws://192.168.1.19:1780" \
    --platform linux/arm64,linux/amd64 \
    --tag connorsapps/snapcast-ui:latest \
    --tag connorsapps/snapcast-ui:1.0.2 \
    --output type=registry

docker buildx rm snapcast-ui