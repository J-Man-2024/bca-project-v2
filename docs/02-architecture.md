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
