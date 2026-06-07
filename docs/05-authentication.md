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

# Authentication

## User Registration

### Objective

- Allow new users to create an account.

### Implementation

- Validate input.
- Check duplicate email.
- Hash password using bcrypt.
- Store user in MongoDB.

### Security

- Passwords are never stored in plain text.

### Limitation

- Email verification is not implemented.

## User Login

### Objective

- Allow registered users to access their account.

### Implementation

- Verify email exists.
- Compare password using bcrypt.
- Generate JWT token.
- Return token to client.

### Security

- Password hashes are never exposed.
- JWT is signed using a secret key.

## Route Protection

### Objective

- Restrict access to authenticated users only.

### Implementation

- Read JWT from Authorization header.
- Verify token.
- Load user from database.
- Attach user to request object.
- Continue using next().

### Security Benefit

- Unauthenticated users cannot access protected resources.
