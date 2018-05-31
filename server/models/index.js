const AWS = require('aws-sdk');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

AWS.config.update(config);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
