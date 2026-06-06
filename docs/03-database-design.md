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
