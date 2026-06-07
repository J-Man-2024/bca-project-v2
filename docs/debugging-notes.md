<!--
    Whenever you hit a bug:

    Problem:
        JWT token undefined.

    Cause:
        Authorization header missing.

    Solution:
        Added Bearer token in request header.

    Over time you'll build a personalized troubleshooting guide and gain a much deeper understanding of the system.
 -->

# Debugging

## Debugging Lesson

### Issue:

- Middleware always returned "invalid token".

### Root Cause:

- `res.status("401")` used a string instead of an integer.
- Express threw a TypeError before sending the intended response.

### Fix:

`res.status(401)`

### Lesson Learned:

- Status codes should be numbers, not strings.
- Create isolated test routes to verify assumptions.
- The visible error may not be the original error.
