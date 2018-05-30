const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Movies';

const year = 2012;
const title = 'Gone';

const params = {
  TableName: table,
  Key: {
    year,
    title
  }
};

docClient.get(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to read item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
  }
});
