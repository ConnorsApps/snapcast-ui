
VITE_HOME_TITLE="Home Audio"
VITE_SNAPCAST_HOST="ws://audio.connorskees.com:1780"
IMAGE_REGISTRY="connorsapps/snapcast-ui"
IMAGE_TAG="latest"
BUILD_PLATFORMS="linux/arm64,linux/amd64"

# docker buildx create --name snapcast-ui --driver docker-container --use --bootstrap

docker buildx build . \
	--build-arg "VITE_HOME_TITLE=${VITE_HOME_TITLE}" \
	--build-arg "VITE_SNAPCAST_HOST=${VITE_SNAPCAST_HOST}" \
	--platform "${BUILD_PLATFORMS}" \
	--tag "${IMAGE_REGISTRY}:latest" \
	--tag "${IMAGE_REGISTRY}:${IMAGE_TAG}" \
	--push

# docker buildx rm snapcast-ui
