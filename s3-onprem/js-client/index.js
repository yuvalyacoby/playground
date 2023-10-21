import AWS from 'aws-sdk';
import fs from 'fs';
import https from "https";

const { IS_ONPREM, ONPREM_S3_ENDPOINT, BUCKET_NAME, KEY, ONLY_GET } = process.env;
console.log({BUCKET_NAME})

const onPremConfig = {
    endpoint: ONPREM_S3_ENDPOINT,
    s3ForcePathStyle: true,
    httpOptions: {
        agent: new https.Agent({
          rejectUnauthorized: true,
          ca: fs.readFileSync('/tls/server/ca.crt')
        })
      }
};

let s3Config = {};

if (IS_ONPREM) {
    s3Config = { ...s3Config, ...onPremConfig };
}

const S3 = new AWS.S3(s3Config);

const Bucket = BUCKET_NAME;
const Key = KEY;
let exist = true;
// await S3.headBucket({ Bucket }).promise().catch(_e => exist = false);

// console.log(`Bucket exist? ${exist}`);
// if (!exist) {
//     await S3.createBucket({ Bucket }).promise();
//     console.log('created bucket');
// }

const createLargeJSON = size => {
    const o = {};
    for (let i=0; i <= size; i++) {
        Object.assign(o, {[i]: i*2 })
    }
    return o;
}

// const r = await S3.listBuckets({}).promise();
// console.log(`ListBuckets response: ${JSON.stringify(r, null, 2)}`);

if (!ONLY_GET) {
    console.log('putting object')
    await S3.putObject({
        Bucket,
        Key,
        Body: JSON.stringify(createLargeJSON(100)),
        ContentType: 'application/json',
        Metadata: {
            commit: '1234567889'
        }
    }).promise();
}

// const r2 = await S3.listBuckets({}).promise();
// console.log(`ListBuckets response2: ${JSON.stringify(r2, null, 2)}`);

const fileData = await S3.getObject({Bucket, Key}).promise();
console.log(`getObject response: ${JSON.stringify({ data: JSON.parse(fileData.Body.toString('utf-8')), metadata: fileData.Metadata }, null, 2)}`);

const res3 = await S3.listObjectsV2({
    Bucket
}).promise()
console.log(`listObjectV2 res after deleting: ${JSON.stringify(res3, null, 2)}`);

console.log('--The End--');




