json=$(AWS_PROFILE=prod AWS_REGION=us-west-2 node ../../platform/devTools/lambda-memory-errors/index.mjs 86400000 CI)
echo "$json"
