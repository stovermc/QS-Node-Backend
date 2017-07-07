# Quantified Self Backend
#### This app is built with Node.js & Express.js; it provides an API to be used with the Quantified Self Frontend.

## Node/Express Development Setup
1. Clone this repo
2. Navigate to the root directory
3. Install dependences with `npm install`
**Do we need to have them create the database in psql?**
4. Build the database with `knex migrate:latest`
5. Seed the database with `knex seed:run`
6. Start the server with `npm start`

## Mocha/Chai Testing
* Run tests with `npm test`
* Run all tests with `npm test test/*`
* Specify a test with `npm test test/<test-name>.js`

## Object-relational map

## API Endpoints
#### All endpoints are RESTful and all responses are in JSON format. Some important things to note:

* All API endpoints begin with `https://quantified-self-vv-ms.herokuapp.com/api/v1/`
* Requests are case sensitive
* Params for POST and PUT requests should be passed as x-www-form-urlencoded  **<-- what does this mean?**

### Foods
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|foods|returns an array of all active foods|none|
|GET|foods/:id|returns a food based on `id`|none|
|POST|foods|adds an active food to the database|`?name=<string>&calories=<integer>`|
|PUT|foods/:id|updates a food|`?name=<string>` or `?calories=<integer>`|
|DELETE|foods/:id|renders a food inactive|`?name=<string>` or `?calories=<integer>`| **is this restful?**

### Meals (Breakfast, Lunch, Dinner, Snacks)
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|meals|returns an array of all meals|none|
|GET|meals/:id|returns a meal based on `id`|none|
|POST|mealFoods|adds a food to a meal|`?mealId=<integer>&foodId=<integer>`|
|DELETE|mealFoods/:id|removes a food from a meal|`?mealId=<integer>&foodId=<integer>`|


