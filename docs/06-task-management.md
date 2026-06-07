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