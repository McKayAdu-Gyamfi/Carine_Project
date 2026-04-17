# Automated API Run Results

### Sign Up Manager
- **Status**: 200
- **Response**: ```json
{
  "token": null,
  "user": {
    "name": "Test Manager",
    "email": "manager_1775259354699@external.com",
    "emailVerified": false,
    "image": null,
    "createdAt": "2026-04-03T23:35:56.209Z",
    "updatedAt": "2026-04-03T23:35:56.209Z",
    "user_type": "HOSTEL_MANAGER",
    "profile_complete": true,
    "id": "7nBSjjwCHlfjT08c09e18N0GHOzC6uxh"
  }
}
```

--- 

### Sign Up Student
- **Status**: 200
- **Response**: ```json
{
  "token": null,
  "user": {
    "name": "Test Student",
    "email": "student_1775259354699@ashesi.edu.gh",
    "emailVerified": false,
    "image": null,
    "createdAt": "2026-04-03T23:35:57.102Z",
    "updatedAt": "2026-04-03T23:35:57.102Z",
    "user_type": "STUDENT",
    "profile_complete": false,
    "id": "R9nvECYn828v1ldrHpswtr9zjFez4ZPW"
  }
}
```

--- 

### PATCH Complete Student Profile
- **Status**: 401
- **Response**: ```json
{
  "success": false,
  "message": "Unauthorized"
}
```

--- 

### GET Current User Profile
- **Status**: 401
- **Response**: ```json
{
  "success": false,
  "message": "Unauthorized"
}
```

--- 

### POST Create Hostel
- **Status**: 401
- **Response**: ```json
{
  "success": false,
  "message": "Unauthorized"
}
```