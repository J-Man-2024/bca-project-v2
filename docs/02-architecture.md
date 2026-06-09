<!--
    Overall Architecture

        Frontend
        ↓
        Express Server
        ↓
        Controllers
        ↓
        MongoDB

    Request Lifecycle

    Example:

        User clicks Create Task
        ↓
        Frontend sends request
        ↓
        Route receives request
        ↓
        Controller executes logic
        ↓
        Model interacts with database
        ↓
        Response sent back

    Folder Structure Explanation

    For every folder:

        controllers/
        Contains business logic.

        routes/
        Contains API endpoints.

        models/
        Contains database schemas.

    Why We Chose MVC-like Structure

        Improves organization.

        Separates concerns.

        Simplifies maintenance.
 -->

# Architecture

## What is a server?

- Receives requests from clients.
- Processes business logic.
- Communicates with database.
- Returns responses.

## Express Responsibilities

- Routing
- Middleware
- Request handling
- Response handling

## MVC-like flow

```
Route
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

## Request Lifecycle

```
Browser
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
MongoDB
  ↓
Response
```

### Route

- Receives requests.
- Maps URLs to controller functions.

### Controller

- Contains business logic.
- Processes requests and generates responses.

### Model

- Defines database schema.
- Handles interaction with MongoDB through Mongoose.

## Request Object (req)

- Contains information about the incoming request.
- Stores body data, URL parameters, query parameters, and headers.
- Used by controllers to access client data.

### Common Properties

```
req.body
req.params
req.query
req.headers
```

## Response Object (res)

- Used to send data back to the client.
- Can send text, JSON, status codes, and error messages.

### Common Methods

```
res.send()
res.json()
res.status()
```

## Request Data Sources

### req.params

Used for URL paramters.

#### Example:

` GET /tasks/123`

#### Access:

` req.params.id`

### req.query

Used for query strings.

#### Example:

` GET /tasks?status=pending`

#### Access:

` req.query.status`

### req.body

Used for request body data.

#### Example:

` POST /login`

#### Access:

` req.body.email`
` req.body.password`

## express.json() Middleware

### Purpose

- Parses incoming JSON data.
- Converts JSON into JavaScript objects.
- Makes request data available through `req.body`.

## Express Application Lifecycle

```
Server Starts
  ↓
Middleware Registered
  ↓
Routes Registered
  ↓
Express Listens For Requests
  ↓
Request Arrives
  ↓
Middleware Executes
  ↓
Route Executes
  ↓
Response Sent
```

## Purpose of `app.listen()`

```
Starts the HTTP server.

Binds the application to a port.

Allows clients to connect and send requests.

Without app.listen(), routes and middleware still exist,
but the application cannot receive requests.
```

## Single Responsibility Principle

### Each file should have one primary responsibility.

Examples:

```
Routes → URL Mapping

Controllers → Business Logic

Models → Data Structure

db.js → Database Connection

.env → Configuration

.gitignore → Repository Exclusions
```

### Advantages:

- Easier maintenance
- Easier debugging
- Better readability
- Better scalability

## Why Use config/db.js?

### Advantages:

- Improves modularity.
- Improves readability.
- Improves maintainability.
- Supports code reuse.
- Follows Single Responsibility Principle.

## Why Export connectDB()

### Advantages:

- Improves modularity.
- Improves reusability.
- Gives explicit control over startup flow.
- Prevents automatic connection attempts during import.

## Initialization Order

- Dependencies must be initialized before they are used.

### Examples:

```
Load .env
  ↓
Read Environment Variables

```

```
Connect Database
  ↓
Start Server

```

```
Register Middleware
  ↓
Handle Requests

```

## Frontend Design Decision

Feature-based separation using:

- Pages
- Services
- Utils
- Components
- Authentication Decision

JWT stored in localStorage.

### Protected Pages

Token verification before page access.

### Analytics Design

Chart.js visualization using backend-generated analytics.

### AI Design

Groq API consumed through backend layer.
