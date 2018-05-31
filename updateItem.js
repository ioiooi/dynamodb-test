const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Movies';

const year = 2018;
const title = 'Foobar goes to Hollywood';

const params = {
  TableName: table,
  Key: {
    year,
    title
  },
  UpdateExpression: 'set info.rating = :r, info.plot = :p, info.actors = :a',
  ExpressionAttributeValues: {
    ':r': 2,
    ':p': 'Meh',
    ':a': ['Hans', 'Gustav', 'Jane']
  },
  ReturnValues: 'UPDATED_NEW'
};

const paramsCounter = {
  TableName: table,
  Key: {
    year,
    title
  },
  UpdateExpression: 'set info.rating = info.rating + :value',
  ExpressionAttributeValues: {
    ':value': 1
  },
  ReturnValues: 'UPDATED_NEW'
};

docClient.update(paramsCounter, (err, data) => {
  if (err) {
    console.error(
      'Unable to update item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
  }
});
