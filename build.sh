
REACT_APP_HOME_TITLE="Home Audio"
REACT_APP_SNAPCAST_HOST="ws://node-a.connorskees.com:1780"
IMAGE_REGISTRY="registry.connorskees.com/lib/snapcast-ui"
IMAGE_TAG="1.x.x"
BUILD_PLATFORMS="linux/arm64,linux/amd64"

docker buildx rm snapcast-ui 2>/dev/null

docker buildx create --use --name snapcast-ui

docker buildx build . \
	--build-arg "REACT_APP_HOME_TITLE=${REACT_APP_HOME_TITLE}" \
	--build-arg "REACT_APP_SNAPCAST_HOST=${REACT_APP_SNAPCAST_HOST}" \
	--platform "${BUILD_PLATFORMS}" \
	--tag "${IMAGE_REGISTRY}:latest" \
	--tag "${IMAGE_REGISTRY}:${IMAGE_TAG}" \
	--push

docker buildx rm snapcast-ui
