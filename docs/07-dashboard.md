<!--
    Dashboard metrics.

    Metrics

    Total Tasks
    Formula:
        Count all tasks.

    Completed Tasks
    Formula:
        Count status = Completed.

    Pending Tasks
    Formula:
        Count status = Pending.

    Completion Percentage
    Document formula:
        (CompletedTasks / Total Tasks) * 100

    Why These Metrics Matter
        Explain productivity tracking.
 -->
# Productivity Dashboard

## Dashboard Statistics

### Objective

- Provide a quick overview of the user's productivity.

### Metrics

- Total Tasks
- Completed Tasks
- Pending Tasks
- Completion Percentage

### Design Decision

- Calculations are performed on the backend.

### Reason

- Keeps frontend simple
- Centralizes business logic
- Improves reusability
- Easier to maintain

## Dashboard Statistics API

### Endpoint

`GET /api/dashboard/stats`

### Purpose

- Provides a summary of user productivity.

### Returned Metrics

- Total Tasks
- Completed Tasks
- Pending Tasks
- Completion Percentage

### Security

- Requires JWT authentication.

### Design Decision

- Statistics are calculated on the backend rather than the frontend.

### Reason

- Keeps frontend simple
- Centralizes business logic
- Improves maintainability

## Analytics Data Tracking

- A new field completedAt was added to the Task model.

### Purpose:

- Track when tasks are completed.
- Support weekly completion analytics.
- Improve accuracy of productivity reports.

### Design Decision:

- completedAt is set when a task becomes Completed.
- completedAt is reset to null when a task becomes Pending.