<!--
    Everything related to MongoDB.

    User Schema

    Write:

        Field
        name
        Type
        String
        Purpose
        Stores user name.

    Repeat for every field.

    Task Schema

    Document:

        title
        description
        category
        priority
        status
        dueDate
        user
        createdAt

    Relationships
        One User
        |
        |
        Many Tasks

    Design Decisions

    Example:

        MongoDB was chosen because
        it stores JSON-like documents,
        which are easy to work with
        in Node.js applications.
 -->

## Why Mongoose?

- Provides schema definitions.
- Supports validation.
- Simplifies database operations.
- Improves code organization.
- Supports relationships between collections.

## Database Connection

### Purpose:

- Establish communication between Express and MongoDB.
- Allow database queries to be executed.

### Why Connect Before Starting Server?

- Prevent requests from reaching an unavailable database.
- Ensure application readiness before accepting users.

## Environment Variables

### Purpose:

- Store sensitive information outside source code.
- Prevent accidental exposure of secrets.
- Allow different configurations for different environments.

Examples:

```
MONGO_URI
JWT_SECRET
GROQ_API_KEY
```

### Important:

- `.env` files are not encrypted.
- They are typically excluded from Git using `.gitignore`.

## Fail-Fast Startup Strategy

### Purpose:

- Verify critical services before accepting requests.
- Prevent runtime failures caused by unavailable databases.

Flow:

```
Load Environment Variables
  ↓
Connect Database
  ↓
Start Server
```

### Advantages:

- Better reliability.
- Easier debugging.
- Better user experience.

## Why Database Connections Are Asynchronous

### Reasons:

- Require network communication.
- Require authentication.
- May experience delays.
- May fail due to connectivity issues.

### Benefits:

- Prevent blocking the application.
- Allow proper error handling.
- Improve responsiveness.

## Fail-Fast Principle

### Definition:

- Stop the application immediately when a critical dependency fails.

### Project Usage:

- MongoDB connection failure.

### Implementation:

```
Connect Database
    ↓
Success → Continue Startup
    ↓
Failure → process.exit(1)
```

### Benefits:

- Easier debugging
- Better reliability
- Prevents invalid application states
