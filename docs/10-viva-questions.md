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

### Why is mongoose.connect() asynchronous?

- Database connections involve network communication, authentication, and connection establishment, all of which take time. Therefore Mongoose provides an asynchronous connection method so the application can handle success or failure without blocking execution.

### Why create a separate db.js file instead of placing the connection code in server.js?

- The application would still work if the code were placed directly in server.js, but separating database configuration into db.js improves modularity, readability, maintainability, and follows the single responsibility principle.

### What is Mongoose?

- Mongoose is an ODM library that provides schemas, validation, and simplified MongoDB operations.

### Why is connectDB asynchronous?

- Database connections require network communication and may take time to complete.

### Why use try-catch?

- To handle connection failures and prevent unhandled application errors.

### Why use process.exit(1)?

- To stop the application when a critical dependency (MongoDB) is unavailable, following the fail-fast principle.

### Why should dotenv be configured before accessing environment variables?

- Environment variables must be loaded before they are accessed. Since Node executes code sequentially, accessing process.env before calling dotenv.config() can result in undefined values.

### What modifications were required in server.js to use the database connection module?

- I imported the connectDB function from the configuration module and invoked it during application startup. This ensures that the database connection is established before the application begins handling requests.

### Why did you terminate the application using process.exit(1) when the database connection failed?

- The database is a critical dependency of the application. If the connection cannot be established, most application features will not function correctly. Therefore the application follows a fail-fast approach and terminates immediately to prevent serving requests in an invalid state.

### Why did you set unique: true on email?

- Because email is used as a unique identifier for authentication and we do not want multiple accounts with the same email address.

### Why validate in both controller and model?

- Controller validation provides immediate user feedback, while model validation ensures invalid data cannot be stored in the database even if controller validation is bypassed.

### Why Keep minlength In The Schema Then?

Even though it doesn't help much in this specific flow, model validation is still valuable because:

```
Controller A
Controller B
Script
Seeder
Future Code
```

might all create users.

The model acts as a final safety layer.

However, for password length specifically, once you're storing hashes, schema `minlength` becomes much less useful because the stored value is always long.

### Why do you return "Invalid credentials" instead of "Email not found" or "Incorrect password"?

- Returning a generic authentication error prevents user enumeration attacks. An attacker cannot determine whether an email address exists in the system, which improves security.
