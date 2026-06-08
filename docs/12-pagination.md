# Pagination

## Purpose

Prevent large task lists from being returned in a single request.

### Supported Queries

`GET /api/tasks?page=1&limit=10`
`GET /api/tasks?page=2&limit=10`

### Formula

`const skip = (page - 1) \* limit;`

### MongoDB Methods Used

```
.skip(skip)
.limit(limit)
```

### Metadata Returned

```
{
"tasks": [],
"currentPage": 1,
"totalPages": 5,
"totalTasks": 42
}
```

### Benefits

- Better performance
- Scalable architecture
- Easier frontend pagination
