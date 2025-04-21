# Compute Pools API

This document outlines the API endpoints for the Compute Pools functionality in the Nightcrawler Dashboard.

## Base URL

```
/api/pools
```

## Endpoints

### Get All Compute Pools

Retrieves a list of all compute pools and summary information.

**Endpoint:** `GET /api/pools`

**Response:**

```json
{
  "summary": {
    "totalPools": 12,
    "activePools": 9,
    "totalNodes": 148,
    "totalCapacity": 2450
  },
  "pools": [
    {
      "id": "pool-1",
      "name": "ML Training Cluster",
      "description": "High-performance GPU cluster for ML model training",
      "status": "active",
      "region": "us-east-1",
      "provider": "AWS",
      "nodeCount": 48,
      "cpuUtilization": 78.5,
      "memoryUtilization": 82.3,
      "gpuUtilization": 91.7,
      "networkUtilization": 65.2,
      "nodeTypes": [
        { "type": "p4d.24xlarge", "count": 32 },
        { "type": "p3.16xlarge", "count": 16 }
      ],
      "tags": ["ml-training", "high-priority", "production"],
      "createdAt": "2025-01-15"
    }
    // Additional pools...
  ]
}
```

### Get Pool by ID

Retrieves detailed information about a specific compute pool.

**Endpoint:** `GET /api/pools/{poolId}`

**Parameters:**

- `poolId` (path parameter): The unique identifier of the compute pool

**Response:**

```json
{
  "id": "pool-1",
  "name": "ML Training Cluster",
  "description": "High-performance GPU cluster for ML model training",
  "status": "active",
  "region": "us-east-1",
  "provider": "AWS",
  "nodeCount": 48,
  "cpuUtilization": 78.5,
  "memoryUtilization": 82.3,
  "gpuUtilization": 91.7,
  "networkUtilization": 65.2,
  "nodeTypes": [
    { "type": "p4d.24xlarge", "count": 32 },
    { "type": "p3.16xlarge", "count": 16 }
  ],
  "tags": ["ml-training", "high-priority", "production"],
  "createdAt": "2025-01-15"
}
```

### Create New Pool

Creates a new compute pool.

**Endpoint:** `POST /api/pools`

**Request Body:**

```json
{
  "name": "New Compute Pool",
  "description": "Description of the new compute pool",
  "region": "us-west-2",
  "provider": "AWS",
  "nodeTypes": [{ "type": "g5.12xlarge", "count": 8 }],
  "tags": ["development", "testing"]
}
```

**Response:**

```json
{
  "id": "pool-7",
  "name": "New Compute Pool",
  "description": "Description of the new compute pool",
  "status": "initializing",
  "region": "us-west-2",
  "provider": "AWS",
  "nodeCount": 8,
  "cpuUtilization": 0,
  "memoryUtilization": 0,
  "gpuUtilization": 0,
  "networkUtilization": 0,
  "nodeTypes": [{ "type": "g5.12xlarge", "count": 8 }],
  "tags": ["development", "testing"],
  "createdAt": "2025-06-12"
}
```

### Update Pool

Updates an existing compute pool.

**Endpoint:** `PUT /api/pools/{poolId}`

**Parameters:**

- `poolId` (path parameter): The unique identifier of the compute pool

**Request Body:**

```json
{
  "name": "Updated Pool Name",
  "description": "Updated description",
  "nodeTypes": [{ "type": "g5.12xlarge", "count": 12 }],
  "tags": ["development", "testing", "updated"]
}
```

**Response:**

```json
{
  "id": "pool-7",
  "name": "Updated Pool Name",
  "description": "Updated description",
  "status": "active",
  "region": "us-west-2",
  "provider": "AWS",
  "nodeCount": 12,
  "cpuUtilization": 0,
  "memoryUtilization": 0,
  "gpuUtilization": 0,
  "networkUtilization": 0,
  "nodeTypes": [{ "type": "g5.12xlarge", "count": 12 }],
  "tags": ["development", "testing", "updated"],
  "createdAt": "2025-06-12"
}
```

### Delete Pool

Deletes a compute pool.

**Endpoint:** `DELETE /api/pools/{poolId}`

**Parameters:**

- `poolId` (path parameter): The unique identifier of the compute pool

**Response:**

```json
{
  "success": true,
  "message": "Pool deleted successfully"
}
```

### Get Pool Activity

Retrieves the activity log for all pools or a specific pool.

**Endpoint:** `GET /api/pools/activity`

**Query Parameters:**

- `poolId` (optional): Filter activities by pool ID

**Response:**

```json
{
  "activities": [
    {
      "id": "act-1001",
      "poolId": "pool-1",
      "poolName": "ML Training Cluster",
      "action": "node-added",
      "details": "Added 8 new p4d.24xlarge nodes",
      "timestamp": "2025-06-10T14:32:45Z",
      "user": "admin@example.com"
    }
    // Additional activities...
  ]
}
```

## Data Models

### Pool Object

| Field              | Type   | Description                                              |
| ------------------ | ------ | -------------------------------------------------------- |
| id                 | string | Unique identifier for the pool                           |
| name               | string | Display name of the pool                                 |
| description        | string | Description of the pool's purpose                        |
| status             | string | Current status (active, initializing, maintenance, etc.) |
| region             | string | Geographic region where the pool is deployed             |
| provider           | string | Cloud provider (AWS, GCP, Azure, etc.)                   |
| nodeCount          | number | Total number of compute nodes in the pool                |
| cpuUtilization     | number | Current CPU utilization percentage                       |
| memoryUtilization  | number | Current memory utilization percentage                    |
| gpuUtilization     | number | Current GPU utilization percentage                       |
| networkUtilization | number | Current network utilization percentage                   |
| nodeTypes          | array  | List of node types and their counts                      |
| tags               | array  | List of tags associated with the pool                    |
| createdAt          | string | ISO date string when the pool was created                |

### Activity Object

| Field     | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| id        | string | Unique identifier for the activity                       |
| poolId    | string | ID of the pool this activity relates to                  |
| poolName  | string | Name of the pool this activity relates to                |
| action    | string | Type of action (node-added, configuration-changed, etc.) |
| details   | string | Human-readable description of the activity               |
| timestamp | string | ISO timestamp when the activity occurred                 |
| user      | string | User or system that performed the action                 |

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": "Description of the specific error"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions to perform this action"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
