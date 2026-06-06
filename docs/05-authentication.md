<!--
    Everything about authentication.

    Concepts
    Authentication
        Verifies user identity.

    Authorization
        Determines what user can access.

    Password Hashing
        Passwords are encrypted using bcrypt.

    JWT
        Used for stateless authentication.

    Flow
        Register
        ↓
        Password Hashing
        ↓
        Database Storage

        Login
        ↓
        Password Verification
        ↓
        JWT Generation
        ↓
        Token Returned

    Why JWT?

        Document reasoning.

    Security Considerations

    Document:

        Password hashing
        Protected routes
        Token verification
 -->
