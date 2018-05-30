const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait.');

const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

allMovies.forEach(({ year, title, info }) => {
  const params = {
    TableName: 'Movies',
    Item: {
      year,
      title,
      info
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error(
        `Unable to add movie ${title}. Error JSON:`,
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(`PutItem succeeded: ${title}`);
    }
  });
});
