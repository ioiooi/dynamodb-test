# API

Route: `http://localhost:3000`

Methods: `POST`, `GET`, `PUT` and `DELETE`

## Create an Item

Curl POST request:

```sh
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"year":2018,"title":"Foobar goes to Hollywood","info":{"description":"This is a description","actors":["Peter","Hans","Gustav"],"rating":9,"rank":13,"image_url":"http://www.example.com/1.jpeg"}}' \
  http://localhost:3000
```

JSON POST Body:

```json
{
  "year": 2018,
  "title": "Foobar goes to Hollywood",
  "info": {
    "plot": "This is a plot",
    "actors": ["Peter", "Hans", "Gustav"],
    "rating": 9,
    "rank": 13,
    "image_url": "http://www.example.com/1.jpeg"
  }
}
```

## Get an Item

`http://localhost:3000/?year=2018&title=Foobar%20goes%20to%20Hollywood`

## Update an Item

JSON POST Body:

```json
[
  {
    "year": 2018,
    "title": "Foobar goes to Hollywood"
  },
  {
    "UpdateExpression":
      "set info.rating = :r, info.#rank = :r remove info.actors",
    "ExpressionAttributeNames": {
      "#rank": "rank"
    },
    "ExpressionAttributeValues": {
      ":r": 4
    }
  }
]
```

Short explanation:

- `UpdateExpression` - `SET` the same value `:r` for both rating and rank and `REMOVE` actors array.
- `ExpressionAttributeNames` - Has to be used because `rank` is a reserved keyword. Just declaring `info.rank` in the update expression will result in an  
  `ValidationException: Invalid UpdateExpression: Attribute name is a reserved keyword; reserved keyword: rank`
- `ExpressionAttributeValues` - The actual values to be used.

## Delete an Item

Curl DELETE request:

```sh
curl --header "Content-Type: application/json" \
  --request DELETE \
  --data '{"year":2018,"title":"Foobar goes to Hollywood"}' \
  http://localhost:3000
```
