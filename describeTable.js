const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Movies'
};

dynamodb.describeTable(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to describe table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('DescribeTable:', JSON.stringify(data, null, 2));
  }
});
