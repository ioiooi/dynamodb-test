const AWS = require('aws-sdk');
const config = require('./config')[process.env.NODE_ENV || 'development'];

AWS.config.update(config);
const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = 'Movies';

const get = params => {
  const o = {
    TableName,
    Key: params
  };

  return new Promise((resolve, reject) => {
    docClient.get(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const put = params => {
  const o = {
    TableName,
    Item: params,
    ConditionExpression:
      'attribute_not_exists(#y) AND attribute_not_exists(title)',
    ExpressionAttributeNames: { '#y': 'year' }
  };

  return new Promise((resolve, reject) => {
    docClient.put(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const update = (key, values) => {
  const o = {
    TableName,
    Key: key,
    ...values,
    ReturnValues: 'ALL_NEW'
  };

  return new Promise((resolve, reject) => {
    docClient.update(o, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const deleteItem = params => {
  const o = {
    TableName,
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

module.exports = {
  get,
  put,
  update,
  delete: deleteItem
};
