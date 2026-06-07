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
# Task Ownership

## Design Decision

- Each task stores a reference to its owner using the user's ObjectId.

## Reason

- Prevents data duplication
- Establishes ownership
- Makes user-specific queries possible
- Supports secure authorization checks