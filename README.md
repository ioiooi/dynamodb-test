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

**OR** use the [docker image](https://hub.docker.com/r/cnadiminti/dynamodb-local/)

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

## Update an Item

> To update an existing item in a table, you use the `UpdateItem` operation. You must provide the `key` of the item you want to update. You must also provide an update expression, indicating the attributes you want to modify and the values you want to assign to them.

IDK if there is a shorthand method... so in order to update an item the following properties have to be provided

- `UpdateExpression` - Declare `set`, `remove`, `add` and `delete` operations on one or multiple properties of an item.
- `ExpressionAttributeNames` (Optional) - Map the `<hashtag>var` used in the update expression to the actual property name
- `ExpressionAttributeValues` - Map the `<colon>var` used in the update expression to the actual value

Links: [Update Expression](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html#Expressions.UpdateExpressions.SET.AddingNestedMapAttributes), [Conditional Update](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.05), [Expression Attribute Names](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html) and [DocClient Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)

## Adding/Removing a value to a Set using the DocumentClient

```js
{
  Colors: ['red', 'green'];
}
```

Would create a `Colors` List with two strings and not a String Set.
To create a `Set` using the DocumentClient requires the use of the DocumentClient [`createSet()`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#createSet-property) method.

### Example: create a new Item with Colors String Set

```js
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: 'Test',
  Key: { id: 1 },
  Colors: docClient.createSet(['red'])
};
docClient.get(params, (err, data) => {});
```

### Example: add a new Color to the Colors SS

```js
const params = {
  TableName: 'Test',
  Key: { id: 1 },
  UpdateExpression: 'add Colors :c',
  AttributeExpressionValue: {
    ':c': docClient.createSet(['blue'])
  }
};
```

Removing a value from a `Set` is analogue to adding one instead of using `add`, use `delete` in the `UpdateExpression`.

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

## Prevent Item from being overwritten when using `update()` or `putItem()`

`ConditionExpression` and using `attribute_not_exists` on the partition and/or sort key.  
Careful when using a [reserved keywords](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html) as the partition/sort key because in that case `attribute_not_exists` wont work as expected. Working around that issue by using [`ExpressionAttributeNames`](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html).

Example with both the partition and sort key being words from the reserved list:  
Table `Vacation` with parition key `year` and sort key `location`.

```js
const params = {
  TableName: 'Vacation',
  ConditionExpression: 'attribute_not_exists(#y) AND attribute_not_exists(#l)',
  ExpressionAttributeNames: { '#y': 'year', '#l': 'location' }
};
```
