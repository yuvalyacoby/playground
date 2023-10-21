import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const { IS_ONPREM, ONPREM_S3_ENDPOINT } = process.env;

const onPremConfig = {
  endpoint: ONPREM_S3_ENDPOINT,
  region: 'us-west-2',
  forcePathStyle: true,
};

let s3Config = {};

if (IS_ONPREM) {
  s3Config = { ...s3Config, ...onPremConfig };
}

const S3 = new S3Client(s3Config);

const listBucketsResponse = await S3.send(new ListBucketsCommand({}));
console.log(`ListBuckets response: ${JSON.stringify(listBucketsResponse.Buckets, null, 2)}`);

const Bucket = 'test-bucket';
const putObjectResponse = await S3.send(new PutObjectCommand({
        Bucket,
        Key: 'test-key',
        Body: JSON.stringify({ hi: 'hello' }),
        ContentType: 'application/json',
        Metadata: {
            commit: '1234567889',
        },
    }));
console.log(`PutObject response: ${JSON.stringify(putObjectResponse, null, 2)}`);

const getObjectResponse = await S3.send(new GetObjectCommand({
        Bucket,
        Key: 'test-key',
    }));
console.log(getObjectResponse);

