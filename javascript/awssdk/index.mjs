import AWS from 'aws-sdk';

const sns = new AWS.SNS({ region: 'us-gov-west-1' });

const topics = await sns.listTopics({}).promise();

console.log(topics);