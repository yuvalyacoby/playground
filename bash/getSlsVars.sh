tag=$1
profile=$2
pwd=$(pwd)
stack=${3:-$pwd}
# aws ssm get-parameter --with-decryption --name /serverless/debug/yuvaly2/microStacks/authorizationStack/src --profile dev4 --region us-west-2 --query 'Parameter.Value' | cat
echo "$stack"