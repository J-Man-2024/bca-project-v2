# API Enhancements

## Summary

The Task API now supports:

### Filtering

`GET /api/tasks?status=Completed`

### Sorting

`GET /api/tasks?sortBy=createdAt&order=desc`

### Pagination

`GET /api/tasks?page=2&limit=10`

### Combined Usage

`GET /api/tasks?status=Completed&sortBy=createdAt&order=desc&page=2&limit=10`

### Design Goal

Move data processing to the backend so the frontend focuses primarily on:

- UI
- UX
- Visualization
- User interactions
