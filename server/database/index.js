const AWS = require('aws-sdk');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const db = {};

AWS.config.update(config);
const docClient = new AWS.DynamoDB.DocumentClient();

db['get'] = params => {
  const o = {
    TableName: 'Movies',
    Key: params
  };

  return new Promise((resolve, reject) => {
    docClient.get(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

db['put'] = params => {
  const o = {
    TableName: 'Movies',
    Item: params,
    ConditionExpression:
      'attribute_not_exists(#y) AND attribute_not_exists(title)',
    ExpressionAttributeNames: { '#y': 'year' }
  };

  console.log(o);
  return new Promise((resolve, reject) => {
    docClient.put(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

db['update'] = params => {
  const o = {
    TableName: 'Movies',
    ...params
  };

  return new Promise((resolve, reject) => {
    docClient.update(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

db['delete'] = params => {
  const o = {
    TableName: 'Movies',
    Key: params,
    ReturnValues: 'ALL_OLD'
  };

  return new Promise((resolve, reject) => {
    docClient.delete(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = db;
