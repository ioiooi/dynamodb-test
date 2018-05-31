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
  Item: {
    year,
    title,
    info: {
      plot:
        'After the tragic death of his dog Foobar decides to go on an adventure.',
      rating: 1,
      peter: 'emo'
    }
  }
};

docClient.put(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to add item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('Added item:', JSON.stringify(data, null, 2));
  }
});
