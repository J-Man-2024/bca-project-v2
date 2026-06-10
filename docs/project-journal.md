<!--
Project Journal format
    Date:
    Milestone:
    What I built:
    What I learned:
    Challenges faced:
    How I solved them:

    Example:
        Date: 05 June 2026

    Milestone:
        Authentication

    What I built:
        Register and Login APIs.

    What I learned:
        Password hashing with bcrypt.
        JWT token generation.
        Authentication middleware.

    Challenges:
        JWT token not being sent correctly.

    Solution:
        Added Authorization header.
 -->

```
Date: 06-Jun-2026

Milestone:
    Express Server Setup

What I Built:
    Created the first Express server.
    Added express.json() middleware.
    Created a health-check route.

What I Learned:

    What a server is.
    What Express does.
    Request-response lifecycle.
    Purpose of middleware.
    Purpose of express.json().
    Purpose of app.listen().

Problems Faced:
    CommonJS warning in VS Code.

Solution:
    Kept using CommonJS because it is simpler and sufficient for the project.
```

```
Date: 06-Jun-2026

Milestone:
    Database connection setup

What I Learned:

    How to create a new user and password in mongoDB.
    How to write MONGODB_URI.
    Why database connections are asynchronous.
    How Mongoose connects to MongoDB.
    Purpose of try-catch.
    Purpose of process.exit(1).
    Fail-fast startup strategy.
```

```
Date: 06-Jun-2026

Architectural Decision

Decision:
    Database connection logic was moved to config/db.js.

Reason:
    To separate configuration concerns from server startup logic and improve maintainability.

Advantages:

    Better modularity
    Easier debugging
    Cleaner startup flow
    Reusable database connection code

Professional Principle

This is called:

Fail Fast

    Critical Dependency Missing
        ↓
    Stop Immediately
        ↓
    Show Error
        ↓
    Fix Problem
        ↓
    Restart

instead of:

    Critical Dependency Missing
        ↓
    Keep Running
        ↓
    Generate Random Errors Later
```

```
Date: 06-Jun-2026

Milestone:
    Authentication

What I Learned

    server.js receives requests and forwards them to route files.
    Routes determine which controller function should execute.
    Controllers contain business logic.
    Models communicate with MongoDB.
    Responses are sent back from controllers using res.json().
```

```
Date: 07-Jun-2026

Design Decision:
    Limited Refactoring

Decision:

    Kept ownership verification logic directly inside controllers instead of creating helper functions.

Reason:

    Improves readability.
    Easier debugging.
    Simpler project structure.
    Easier to explain during viva.

Trade-off:

    Small amount of code duplication.
    Accepted because the logic appears in only a few locations.
```

```
Design Decision:
    Dashboard vs Analytics Separation

Decision:

    Dashboard statistics and analytics chart data are handled by separate controllers and routes.

Reason:

    Dashboard focuses on summary metrics.
    Analytics focuses on chart visualization data.
    Improves organization and maintainability.
    Easier to explain during viva.
```

```
Date: 08-Jun-2026

    ✅ Authentication

    ✅ JWT Authorization

    ✅ User-specific Tasks

    ✅ Task CRUD

    ✅ Ownership Checks

    ✅ Analytics

    ✅ Filtering

    ✅ Sorting

    ✅ Pagination

    ✅ Searching

    ✅ Dashboard Statistics
```

```
Date: 08-Jun-2026

    Current Project Status

    Backend ✅

    Authentication
        Register
        Login
        JWT generation
        Protected routes

    Task Management
        Create task
        Get all tasks
        Get single task
        Update task
        Delete task

    Authorization
        User-specific tasks
        Ownership validation

    Analytics
        Status distribution
        Category distribution
        Completion percentage
        Weekly completion distribution

    API Enhancements
        Filtering
        Search
        Sorting
        Pagination
```

```
Date: 10-Jun-2026

Current Progress
Authentication

    ✅ Register

    ✅ Login

    ✅ JWT

    ✅ Logout

    ✅ Protected Pages

Dashboard

    ✅ UI

    ✅ Dynamic Statistics

    ✅ Authenticated Requests
```
