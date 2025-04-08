# Teams API

This document outlines the API endpoints for the Teams functionality in the Nightcrawler Dashboard.

## Base URL

```
/api/teams
```

## Endpoints

### Get All Teams

Retrieves a list of all teams and summary information.

**Endpoint:** `GET /api/teams`

**Headers:**
- `Authorization: Bearer {token}`

**Response:**

```json
{
  "summary": {
    "totalTeams": 6,
    "totalMembers": 42,
    "activeProjects": 18,
    "resourceAllocation": 1720
  },
  "teams": [
    {
      "id": "team-1",
      "name": "ML Research",
      "description": "Focused on cutting-edge machine learning research",
      "memberCount": 12,
      "lead": {
        "id": "user-101",
        "name": "Dr. Sarah Chen",
        "email": "sarah.chen@example.com",
        "avatar": "/avatars/sarah-chen.jpg",
        "role": "Research Director"
      },
      "resourceAllocation": 780,
      "activeProjects": 5,
      "tags": ["research", "high-priority", "ml-models"],
      "createdAt": "2022-09-15"
    },
    // Additional teams...
  ]
}
```

### Get Team by ID

Retrieves detailed information about a specific team.

**Endpoint:** `GET /api/teams/{teamId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Response:**

```json
{
  "id": "team-1",
  "name": "ML Research",
  "description": "Focused on cutting-edge machine learning research",
  "memberCount": 12,
  "lead": {
    "id": "user-101",
    "name": "Dr. Sarah Chen",
    "email": "sarah.chen@example.com",
    "avatar": "/avatars/sarah-chen.jpg",
    "role": "Research Director"
  },
  "resourceAllocation": 780,
  "activeProjects": 5,
  "tags": ["research", "high-priority", "ml-models"],
  "createdAt": "2022-09-15"
}
```

### Create New Team

Creates a new team.

**Endpoint:** `POST /api/teams`

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "name": "New Team",
  "description": "Description of the new team",
  "leadId": "user-110",
  "tags": ["new-team", "research"]
}
```

**Response:**

```json
{
  "id": "team-6",
  "name": "New Team",
  "description": "Description of the new team",
  "memberCount": 1,
  "lead": {
    "id": "user-110",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "avatar": "/avatars/john-doe.jpg",
    "role": "Team Lead"
  },
  "resourceAllocation": 0,
  "activeProjects": 0,
  "tags": ["new-team", "research"],
  "createdAt": "2023-06-15"
}
```

### Update Team

Updates an existing team.

**Endpoint:** `PUT /api/teams/{teamId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Request Body:**

```json
{
  "name": "Updated Team Name",
  "description": "Updated team description",
  "leadId": "user-112",
  "tags": ["updated", "research"]
}
```

**Response:**

```json
{
  "id": "team-1",
  "name": "Updated Team Name",
  "description": "Updated team description",
  "memberCount": 12,
  "lead": {
    "id": "user-112",
    "name": "New Lead Name",
    "email": "new.lead@example.com",
    "avatar": "/avatars/new-lead.jpg",
    "role": "Research Director"
  },
  "resourceAllocation": 780,
  "activeProjects": 5,
  "tags": ["updated", "research"],
  "createdAt": "2022-09-15"
}
```

### Delete Team

Deletes a team.

**Endpoint:** `DELETE /api/teams/{teamId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Response:**

```json
{
  "success": true,
  "message": "Team deleted successfully"
}
```

### Get Team Members

Retrieves the members of a specific team.

**Endpoint:** `GET /api/teams/{teamId}/members`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Response:**

```json
{
  "teamId": "team-1",
  "teamName": "ML Research",
  "members": [
    {
      "id": "user-101",
      "name": "Dr. Sarah Chen",
      "email": "sarah.chen@example.com",
      "avatar": "/avatars/sarah-chen.jpg",
      "role": "Research Director",
      "joinDate": "2022-09-15",
      "isLead": true
    },
    {
      "id": "user-106",
      "name": "Dr. Alex Kim",
      "email": "alex.kim@example.com",
      "avatar": "/avatars/alex-kim.jpg",
      "role": "Senior Research Scientist",
      "joinDate": "2023-06-12",
      "isLead": false
    },
    // Additional members...
  ]
}
```

### Add Team Member

Adds a member to a team.

**Endpoint:** `POST /api/teams/{teamId}/members`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Request Body:**

```json
{
  "userId": "user-120",
  "role": "Data Scientist"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Member added successfully",
  "member": {
    "id": "user-120",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "avatar": "/avatars/jane-smith.jpg",
    "role": "Data Scientist",
    "joinDate": "2023-06-15",
    "isLead": false
  }
}
```

### Remove Team Member

Removes a member from a team.

**Endpoint:** `DELETE /api/teams/{teamId}/members/{userId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team
- `userId` (path parameter): The unique identifier of the user to remove

**Response:**

```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

### Update Team Member Role

Updates a team member's role.

**Endpoint:** `PUT /api/teams/{teamId}/members/{userId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team
- `userId` (path parameter): The unique identifier of the user

**Request Body:**

```json
{
  "role": "Senior Data Scientist"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Member role updated successfully",
  "member": {
    "id": "user-106",
    "name": "Dr. Alex Kim",
    "email": "alex.kim@example.com",
    "avatar": "/avatars/alex-kim.jpg",
    "role": "Senior Data Scientist",
    "joinDate": "2023-06-12",
    "isLead": false
  }
}
```

### Get Team Activity

Retrieves the activity log for a specific team or all teams.

**Endpoint:** `GET /api/teams/activity`

**Headers:**
- `Authorization: Bearer {token}`

**Query Parameters:**
- `teamId` (optional): Filter activities by team ID

**Response:**

```json
{
  "activities": [
    {
      "id": "act-2001",
      "teamId": "team-1",
      "teamName": "ML Research",
      "action": "member-added",
      "details": "Added Dr. Alex Kim as Senior Research Scientist",
      "timestamp": "2023-06-12T10:15:30Z",
      "user": "sarah.chen@example.com"
    },
    {
      "id": "act-2002",
      "teamId": "team-2",
      "teamName": "Production Inference",
      "action": "resource-allocation",
      "details": "Increased GPU allocation by 120 units",
      "timestamp": "2023-06-11T15:45:22Z",
      "user": "michael.r@example.com"
    },
    // Additional activities...
  ]
}
```

### Update Team Resource Allocation

Updates a team's resource allocation.

**Endpoint:** `PUT /api/teams/{teamId}/resources`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Request Body:**

```json
{
  "resourceAllocation": 850
}
```

**Response:**

```json
{
  "success": true,
  "message": "Resource allocation updated successfully",
  "team": {
    "id": "team-1",
    "name": "ML Research",
    "resourceAllocation": 850,
    "previousAllocation": 780
  }
}
```

## Data Models

### Team Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the team |
| name | string | Display name of the team |
| description | string | Description of the team's purpose |
| memberCount | number | Number of members in the team |
| lead | object | Team lead user information |
| resourceAllocation | number | Resource allocation units assigned to the team |
| activeProjects | number | Number of active projects for the team |
| tags | array | List of tags associated with the team |
| createdAt | string | ISO date string when the team was created |

### User Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the user |
| name | string | User's full name |
| email | string | User's email address |
| avatar | string | URL to the user's avatar image |
| role | string | User's role in the team |
| joinDate | string | ISO date string when the user joined the team |
| isLead | boolean | Whether the user is the team lead |

### Activity Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the activity |
| teamId | string | ID of the team this activity relates to |
| teamName | string | Name of the team this activity relates to |
| action | string | Type of action (member-added, resource-allocation, etc.) |
| details | string | Human-readable description of the activity |
| timestamp | string | ISO timestamp when the activity occurred |
| user | string | Email of the user who performed the action |

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Insufficient permissions to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
