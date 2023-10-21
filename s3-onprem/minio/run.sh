docker buildx build --platform linux/amd64,linux/arm64 --push -t yuvalyacoby133/test-s3-app .

kubectl apply -f k8s/pod.yml