# Playing around with DynamoDB

## Links

[Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

[AWS SDK - DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)

[Node.js and DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html)

## Local DynamoDB ([link](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html))

Requirements: JRE

Download: [`.tar.gz`](https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.tar.gz) | [`.zip`](https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.zip)

Command: `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`  
Default port is 8000.

## DocumentClient ([link](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html))

> The document client simplifies working with items in Amazon DynamoDB by abstracting away the notion of attribute values.

Example:  
Getting a Movie without DocumentClient

```js
const params = {
  TableName: 'Movies',
  Key: {
    year: {
      N: '2012'
    },
    title: {
      S: 'Gone'
    }
  }
};
dynamodb.getItem(params, (err, data) => {});
```

Getting a Movie with DocumentClient

```js
const params = {
  TableName: 'Movies',
  Key: {
    year: 2012,
    title: 'Gone'
  }
};
docClient.get(params, (err, data) => {});
```

## Data Types

### Scalar Types

| Types   | Short | Description                                                                                                 |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------- |
| String  | S     |                                                                                                             |
| Number  | N     | Can be positive, negative or zero. Leading and trailing zeroes are trimmed. Are sent across as **strings**! |
| Binary  | B     | Must be encoded in base64 format before sending them to DynamoDB.                                           |
| Boolean | BOOL  |                                                                                                             |
| Null    | NULL  | Represents an attribute with an unkown or undefined state.                                                  |

### Document Types

The document types are list and map. They can be nested within each other, up to 32 levels deep.

| Types | Short      | Description                                                                              |
| ----- | ---------- | ---------------------------------------------------------------------------------------- |
| List  | L          | Ordered collection of values. Enclosed in `[ ... ]`. No restriction on data types.       |
| Map   | M          | Unordered collection of name-value pairs. Enclosed in `{ ... }`. Similar to JSON object. |
| Sets  | SS, NS, BS | A set can represent multiple scalar values. The set types are string, number and binary. |

## Return Value

Display the previous Item, the current Item with updated values, consumed Capacity or CollectionMetrics etc...  
Some operations return an empty `data` object if none of the following properties are provided with a value other than `'NONE'`.

```js
const params = {
  ...
  ReturnValues: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW',
  ReturnConsumedCapacity: 'INDEXES' | 'TOTAL' | 'NONE',
  ReturnItemCollectionMetrics: 'SIZE' | 'NONE'
}
```

Some operations, like `DeleteItem`, do not recognize all `ReturnValues`.
