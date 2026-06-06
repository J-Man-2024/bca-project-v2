<!--
    This file grows throughout development.

    Topic

    Authentication

    Beginner
    What is JWT?

    Answer.

    Intermediate
    Why bcrypt?

    Answer.

    Advanced
    How does JWT verification work?

    Answer.

    Repeat for every feature.
 -->

# Viva Questions

### Why did you separate Routes, Controllers, and Models?

- Routes handle URL mapping, controllers contain business logic, and models define database structure. Separating them improves organization, maintainability, readability, and debugging.

### What are req and res?

- req is the request object provided by Express that contains information sent by the client, such as request body, parameters, query strings, and headers. res is the response object used by the server to send data back to the client.

### Where does login data come from?

- ` req.body`, because login credentials are sent in the request body.

### Where would task ID come from in: ` GET /api/tasks/123`

- ` req.params.id`

### Where would filtering information come from in: ` GET /api/tasks?status=pending`

- `req.query.status`

### Why do we use `express.json()`?

- ` express.json()` is a middleware that parses incoming JSON request data and converts it into JavaScript objects, allowing us to access the data through ` req.body`.

### Why did you choose CommonJS?

- CommonJS is the traditional Node.js module system. It is simple, widely used in Express applications, and sufficient for the requirements of this project.

### What is app in Express?

- `app` is the Express application object created by calling `express()`. It manages middleware, routes, request handling, and server configuration.

### What happens if app.listen() is removed?

- The Express application and routes are still created, but the server does not start listening for incoming requests. As a result, clients cannot connect to the application.

### Why use Mongoose?

- Mongoose is an Object Data Modeling (ODM) library for MongoDB. It provides schemas, validation, models, and simplified database operations, making data management more structured and easier to maintain.

### Why should the database connection be established before starting the server?

- The server should start only after a successful database connection because many routes depend on database operations. Starting the server before the database is ready may cause requests to fail.

### Why do you think storing secrets directly inside source code is considered a bad practice?

For example, why is this bad?

`const JWT_SECRET = "mySuperSecretKey123";`

Anyone who gains access to the source code now knows the secret.

Examples:

- Uploaded to GitHub by mistake
- Shared with teammates
- Sent to a professor
- Leaked from a repository
- Accidentally committed to Git

Now the secret is exposed.

### Why use environment variables?

- Environment variables separate sensitive information such as API keys, database credentials, and JWT secrets from source code. This improves security and makes configuration easier across different environments.
