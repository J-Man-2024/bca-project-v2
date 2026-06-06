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
