export REACT_APP_HOME_TITLE="Home Audio"
export REACT_APP_SNAPCAST_HOST="ws://192.168.1.100:1780"
export DOCKER_REGISTRY=""

docker buildx create --use --name snapcast-ui

docker buildx build . \
    --build-arg REACT_APP_HOME_TITLE="$REACT_APP_HOME_TITLE" \
    --build-arg REACT_APP_SNAPCAST_HOST="$REACT_APP_SNAPCAST_HOST" \
    --platform linux/arm64,linux/amd64 \
    --tag $DOCKER_REGISTRY:latest \
    --tag $DOCKER_REGISTRY:1.1.0 \
    --output type=registry

docker buildx rm snapcast-ui