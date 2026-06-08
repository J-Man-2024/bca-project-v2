<!--
    Everything related to CRUD.

    Concepts Learned
        Create
        Read
        Update
        Delete
        CRUD Flow

    Example:

        User submits form
        ↓
        Request sent
        ↓
        Controller validates
        ↓
        Task saved
        ↓
        Response returned

    Design Decisions
    Example:

        Task ownership enforced
        through user ID reference.
 -->

# Task Mangement

## Task Ownership

### Design Decision

- Each task stores a reference to its owner using the user's ObjectId.

### Reason

- Prevents data duplication
- Establishes ownership
- Makes user-specific queries possible
- Supports secure authorization checks

## Get All Tasks

### Objective

- Retrieve all tasks belonging to the authenticated user.

### Implementation

- Read user id from req.user.
- Query tasks using ownership filter.
- Return matching tasks.

### Security Benefit

- Users can only access their own tasks.

## Update Task

### Objective

- Allow users to modify their own tasks.

### Implementation

- Verify task exists.
- Verify ownership.
- Update only allowed fields.
- Save document using Mongoose validation.

### Security Benefit

- Users cannot modify tasks owned by other users.

## Delete Task

### Objective

- Allow users to remove their own tasks.

### Implementation

- Find task by id.
- Verify ownership.
- Delete document from MongoDB.

### Security Benefit

- Users cannot delete tasks belonging to other users.

### Limitation

- Deleted tasks cannot be recovered.

## Task Filtering

### Purpose

- Allow users to retrieve specific tasks instead of loading all tasks.

### Supported Filters

- `GET /api/tasks?status=Completed`
- `GET /api/tasks?category=Study`
- `GET /api/tasks?priority=High`

### Combined Filters

- `GET /api/tasks?status=Completed&category=Study`

### Implementation

- The backend dynamically builds a MongoDB filter object using query parameters.

### Example:

```
const filter = {
    user: req.user._id,
};
```

Additional fields are added only when query parameters are supplied.

### Benefits

- Reduces unnecessary data transfer
- Simplifies frontend logic
- Improves user experience

## Task Sorting

### Purpose

- Allow tasks to be returned in a meaningful order.

### Supported Queries

Newest first.

- `GET /api/tasks?sortBy=createdAt&order=desc`

Oldest first.

- `GET /api/tasks?sortBy=createdAt&order=asc`

### Implementation

Dynamic sort object:

```
const sort = {};

sort[req.query.sortBy] =
    req.query.order === "desc" ? -1 : 1;
```

### Benefits

- Better task organization
- Improved dashboard usability
- Supports future frontend sorting controls
