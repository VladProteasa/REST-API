# Rest API

## Implementation

### Task1

For the first task I first implemented the CRUD functionalities using the express framework.
* app.js: the main file where I initialize the server and connect to MongoDB database.
* router: all request associated with CRUD opperations are handeled in this file.
* utils: this file contains some auxiliary functions.

### Task2
I chose to implement the authentication system using the Bearer method using a JWT.
* auth: register and login request are handled here:
    * when someone tries to register the API will  add that user to the database.
    * when trying to login the API will verify if the credentials are valid, and if so it will provide the client a JWT.
* Verify: contains a function that checks if the client has access to the endpoint.

### Task3
Finally I decided to add rate limits to the authentication system and to the request to the main endpoint.
* limit: 
    * a middleware function that restrict the client to 10 request to the main endpoint every minute.
    * another functions that has an exponential time growth that the client has to wait every 3 consecutive failed attempts to log in.

### Other remarks
* By default the API will listen on port 3000.
* I chose to use MongoDB to store product data and user data.
* On the server the passwords are stored as hashes.
* In the .env file we have the private key for JWT and the MongoDB link.
* I tested the API using Postman.

## Endpoints

```sh
http://localhost:3000/api/products
http://localhost:3000/api/products/:id
http://localhost:3000/api/user
http://localhost:3000/api/user/register
http://localhost:3000/api/user/login
```

## Dependencies
 * bcrypt
 * cors
 * dotenv
 * express
 * jsonwebtoken
 * mongodb
 * mongoose
 * nodemon
#### To install all the required dependencies and run the application use the following commands:

```sh
$ npm install
$ node app.js
```

