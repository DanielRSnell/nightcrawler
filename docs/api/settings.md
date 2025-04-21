# Settings API

This document outlines the API endpoints for the Settings functionality in the Nightcrawler Dashboard.

## Base URL

```
/api/settings
```

## Endpoints

### Get User Profile

Retrieves the user's profile information.

**Endpoint:** `GET /api/settings/profile`

**Headers:**

- `Authorization: Bearer {token}`

**Response:**

```json
{
  "name": "Alex Johnson",
  "email": "alex.johnson@example.com",
  "avatar": "/avatars/alex-johnson.jpg",
  "role": "Senior ML Engineer",
  "team": "ML Research",
  "joinDate": "2022-08-15",
  "bio": "Experienced machine learning engineer focused on developing and deploying large-scale ML systems. Passionate about optimizing compute resources and building efficient training pipelines."
}
```

### Update User Profile

Updates the user's profile information.

**Endpoint:** `PUT /api/settings/profile`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "name": "Alex Johnson",
  "email": "alex.johnson@example.com",
  "role": "Senior ML Engineer",
  "team": "ML Research",
  "bio": "Updated bio information here"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": {
    "name": "Alex Johnson",
    "email": "alex.johnson@example.com",
    "avatar": "/avatars/alex-johnson.jpg",
    "role": "Senior ML Engineer",
    "team": "ML Research",
    "joinDate": "2022-08-15",
    "bio": "Updated bio information here"
  }
}
```

### Update Avatar

Updates the user's avatar image.

**Endpoint:** `POST /api/settings/profile/avatar`

**Headers:**

- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Request Body:**

- Form data with `avatar` field containing the image file

**Response:**

```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "avatar": "/avatars/alex-johnson-new.jpg"
}
```

### Get Notification Settings

Retrieves the user's notification preferences.

**Endpoint:** `GET /api/settings/notifications`

**Headers:**

- `Authorization: Bearer {token}`

**Response:**

```json
{
  "emailNotifications": true,
  "pushNotifications": false,
  "resourceAlerts": true,
  "weeklyReports": true,
  "maintenanceAlerts": true,
  "teamUpdates": true
}
```

### Update Notification Settings

Updates the user's notification preferences.

**Endpoint:** `PUT /api/settings/notifications`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "emailNotifications": true,
  "pushNotifications": true,
  "resourceAlerts": true,
  "weeklyReports": false,
  "maintenanceAlerts": true,
  "teamUpdates": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Notification preferences updated successfully",
  "settings": {
    "emailNotifications": true,
    "pushNotifications": true,
    "resourceAlerts": true,
    "weeklyReports": false,
    "maintenanceAlerts": true,
    "teamUpdates": true
  }
}
```

### Get Security Settings

Retrieves the user's security settings.

**Endpoint:** `GET /api/settings/security`

**Headers:**

- `Authorization: Bearer {token}`

**Response:**

```json
{
  "twoFactorAuth": true,
  "lastPasswordChange": "2025-05-10",
  "sessionTimeout": 60,
  "ipRestrictions": false,
  "apiTokens": [
    {
      "id": "token-1",
      "name": "Development API",
      "created": "2025-04-15",
      "lastUsed": "2025-06-12",
      "scopes": ["read", "write"]
    },
    {
      "id": "token-2",
      "name": "Monitoring Integration",
      "created": "2025-05-20",
      "lastUsed": "2025-06-13",
      "scopes": ["read"]
    }
  ]
}
```

### Update Security Settings

Updates the user's security settings.

**Endpoint:** `PUT /api/settings/security`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "twoFactorAuth": true,
  "sessionTimeout": 45,
  "ipRestrictions": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Security settings updated successfully",
  "settings": {
    "twoFactorAuth": true,
    "lastPasswordChange": "2025-05-10",
    "sessionTimeout": 45,
    "ipRestrictions": true
  }
}
```

### Change Password

Changes the user's password.

**Endpoint:** `POST /api/settings/security/password`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "currentPassword": "current-password",
  "newPassword": "new-password",
  "confirmPassword": "new-password"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "lastPasswordChange": "2025-06-15"
}
```

### Generate API Token

Creates a new API token.

**Endpoint:** `POST /api/settings/security/tokens`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "name": "New API Token",
  "scopes": ["read", "write"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "API token created successfully",
  "token": {
    "id": "token-3",
    "name": "New API Token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Only shown once upon creation
    "created": "2025-06-15",
    "lastUsed": null,
    "scopes": ["read", "write"]
  }
}
```

### Revoke API Token

Revokes an existing API token.

**Endpoint:** `DELETE /api/settings/security/tokens/{tokenId}`

**Headers:**

- `Authorization: Bearer {token}`

**Response:**

```json
{
  "success": true,
  "message": "API token revoked successfully"
}
```

### Get Appearance Settings

Retrieves the user's appearance settings.

**Endpoint:** `GET /api/settings/appearance`

**Headers:**

- `Authorization: Bearer {token}`

**Response:**

```json
{
  "theme": "dark",
  "density": "comfortable",
  "animationsEnabled": true,
  "codeHighlighting": true,
  "timezone": "America/Los_Angeles",
  "dateFormat": "MM/DD/YYYY"
}
```

### Update Appearance Settings

Updates the user's appearance settings.

**Endpoint:** `PUT /api/settings/appearance`

**Headers:**

- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "theme": "light",
  "density": "compact",
  "animationsEnabled": true,
  "codeHighlighting": true,
  "timezone": "America/New_York",
  "dateFormat": "YYYY-MM-DD"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Appearance settings updated successfully",
  "settings": {
    "theme": "light",
    "density": "compact",
    "animationsEnabled": true,
    "codeHighlighting": true,
    "timezone": "America/New_York",
    "dateFormat": "YYYY-MM-DD"
  }
}
```

## Data Models

### Profile Object

| Field    | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| name     | string | User's full name                     |
| email    | string | User's email address                 |
| avatar   | string | URL to the user's avatar image       |
| role     | string | User's role in the organization      |
| team     | string | User's team name                     |
| joinDate | string | ISO date string when the user joined |
| bio      | string | User's biography or description      |

### Notification Settings Object

| Field              | Type    | Description                            |
| ------------------ | ------- | -------------------------------------- |
| emailNotifications | boolean | Whether to receive email notifications |
| pushNotifications  | boolean | Whether to receive push notifications  |
| resourceAlerts     | boolean | Whether to receive resource alerts     |
| weeklyReports      | boolean | Whether to receive weekly reports      |
| maintenanceAlerts  | boolean | Whether to receive maintenance alerts  |
| teamUpdates        | boolean | Whether to receive team updates        |

### Security Settings Object

| Field              | Type    | Description                                  |
| ------------------ | ------- | -------------------------------------------- |
| twoFactorAuth      | boolean | Whether two-factor authentication is enabled |
| lastPasswordChange | string  | ISO date string of last password change      |
| sessionTimeout     | number  | Session timeout in minutes                   |
| ipRestrictions     | boolean | Whether IP restrictions are enabled          |
| apiTokens          | array   | List of API tokens                           |

### API Token Object

| Field    | Type   | Description                                  |
| -------- | ------ | -------------------------------------------- |
| id       | string | Unique identifier for the token              |
| name     | string | Display name of the token                    |
| created  | string | ISO date string when the token was created   |
| lastUsed | string | ISO date string when the token was last used |
| scopes   | array  | List of permission scopes for the token      |

### Appearance Settings Object

| Field             | Type    | Description                                        |
| ----------------- | ------- | -------------------------------------------------- |
| theme             | string  | UI theme (light, dark, system)                     |
| density           | string  | Interface density (compact, comfortable, spacious) |
| animationsEnabled | boolean | Whether animations are enabled                     |
| codeHighlighting  | boolean | Whether code syntax highlighting is enabled        |
| timezone          | string  | User's preferred timezone                          |
| dateFormat        | string  | User's preferred date format                       |

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
