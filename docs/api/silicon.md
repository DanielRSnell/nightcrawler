# Silicon Allocation API

This document outlines the API endpoints for the Silicon Allocation functionality in the Nightcrawler Dashboard.

## Base URL

```
/api/silicon
```

## Endpoints

### Get Silicon Summary

Retrieves summary information about silicon allocation.

**Endpoint:** `GET /api/silicon/summary`

**Headers:**
- `Authorization: Bearer {token}`

**Response:**

```json
{
  "totalUnits": 2450,
  "allocatedUnits": 1720,
  "availableUnits": 730,
  "utilizationRate": 70.2
}
```

### Get Silicon Types

Retrieves information about all silicon types.

**Endpoint:** `GET /api/silicon/types`

**Headers:**
- `Authorization: Bearer {token}`

**Response:**

```json
{
  "siliconTypes": [
    {
      "id": "gpu-a100",
      "name": "NVIDIA A100",
      "totalUnits": 1200,
      "allocatedUnits": 980,
      "availableUnits": 220,
      "utilizationRate": 81.7,
      "icon": "Microchip"
    },
    {
      "id": "gpu-h100",
      "name": "NVIDIA H100",
      "totalUnits": 600,
      "allocatedUnits": 450,
      "availableUnits": 150,
      "utilizationRate": 75.0,
      "icon": "Microchip"
    },
    {
      "id": "tpu-v4",
      "name": "Google TPU v4",
      "totalUnits": 350,
      "allocatedUnits": 210,
      "availableUnits": 140,
      "utilizationRate": 60.0,
      "icon": "Cpu"
    },
    {
      "id": "cpu-epyc",
      "name": "AMD EPYC",
      "totalUnits": 300,
      "allocatedUnits": 80,
      "availableUnits": 220,
      "utilizationRate": 26.7,
      "icon": "Server"
    }
  ]
}
```

### Get Silicon Type by ID

Retrieves information about a specific silicon type.

**Endpoint:** `GET /api/silicon/types/{siliconId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `siliconId` (path parameter): The unique identifier of the silicon type

**Response:**

```json
{
  "id": "gpu-a100",
  "name": "NVIDIA A100",
  "totalUnits": 1200,
  "allocatedUnits": 980,
  "availableUnits": 220,
  "utilizationRate": 81.7,
  "icon": "Microchip",
  "description": "NVIDIA A100 Tensor Core GPU delivers unprecedented acceleration at every scale for AI, data analytics, and high-performance computing.",
  "specs": {
    "memory": "40GB HBM2",
    "tensorCores": 432,
    "cudaCores": 6912,
    "peakPerformance": "312 TFLOPS"
  }
}
```

### Get Team Allocations

Retrieves silicon allocations for all teams.

**Endpoint:** `GET /api/silicon/allocations`

**Headers:**
- `Authorization: Bearer {token}`

**Response:**

```json
{
  "teamAllocations": [
    {
      "teamId": "team-1",
      "teamName": "ML Research",
      "allocations": [
        { "siliconId": "gpu-a100", "units": 450 },
        { "siliconId": "gpu-h100", "units": 200 },
        { "siliconId": "tpu-v4", "units": 100 },
        { "siliconId": "cpu-epyc", "units": 30 }
      ],
      "totalAllocation": 780
    },
    {
      "teamId": "team-2",
      "teamName": "Production Inference",
      "allocations": [
        { "siliconId": "gpu-a100", "units": 300 },
        { "siliconId": "gpu-h100", "units": 150 },
        { "siliconId": "tpu-v4", "units": 50 },
        { "siliconId": "cpu-epyc", "units": 20 }
      ],
      "totalAllocation": 520
    },
    // Additional team allocations...
  ]
}
```

### Get Team Allocation by ID

Retrieves silicon allocations for a specific team.

**Endpoint:** `GET /api/silicon/allocations/{teamId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Response:**

```json
{
  "teamId": "team-1",
  "teamName": "ML Research",
  "allocations": [
    { 
      "siliconId": "gpu-a100", 
      "siliconName": "NVIDIA A100",
      "units": 450 
    },
    { 
      "siliconId": "gpu-h100", 
      "siliconName": "NVIDIA H100",
      "units": 200 
    },
    { 
      "siliconId": "tpu-v4", 
      "siliconName": "Google TPU v4",
      "units": 100 
    },
    { 
      "siliconId": "cpu-epyc", 
      "siliconName": "AMD EPYC",
      "units": 30 
    }
  ],
  "totalAllocation": 780
}
```

### Update Team Allocation

Updates silicon allocation for a specific team.

**Endpoint:** `PUT /api/silicon/allocations/{teamId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `teamId` (path parameter): The unique identifier of the team

**Request Body:**

```json
{
  "allocations": [
    { "siliconId": "gpu-a100", "units": 500 },
    { "siliconId": "gpu-h100", "units": 250 },
    { "siliconId": "tpu-v4", "units": 120 },
    { "siliconId": "cpu-epyc", "units": 40 }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Team allocation updated successfully",
  "teamId": "team-1",
  "teamName": "ML Research",
  "previousAllocation": 780,
  "newAllocation": 910,
  "allocations": [
    { "siliconId": "gpu-a100", "units": 500 },
    { "siliconId": "gpu-h100", "units": 250 },
    { "siliconId": "tpu-v4", "units": 120 },
    { "siliconId": "cpu-epyc", "units": 40 }
  ]
}
```

### Get Allocation Requests

Retrieves all silicon allocation requests.

**Endpoint:** `GET /api/silicon/requests`

**Headers:**
- `Authorization: Bearer {token}`

**Query Parameters:**
- `status` (optional): Filter requests by status (approved, pending, rejected)
- `teamId` (optional): Filter requests by team ID

**Response:**

```json
{
  "requests": [
    {
      "id": "req-1001",
      "teamId": "team-1",
      "teamName": "ML Research",
      "siliconId": "gpu-h100",
      "siliconName": "NVIDIA H100",
      "requestedUnits": 50,
      "status": "approved",
      "requestDate": "2023-06-10",
      "approvalDate": "2023-06-11"
    },
    {
      "id": "req-1002",
      "teamId": "team-2",
      "teamName": "Production Inference",
      "siliconId": "gpu-a100",
      "siliconName": "NVIDIA A100",
      "requestedUnits": 30,
      "status": "pending",
      "requestDate": "2023-06-12"
    },
    // Additional requests...
  ]
}
```

### Get Allocation Request by ID

Retrieves a specific silicon allocation request.

**Endpoint:** `GET /api/silicon/requests/{requestId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `requestId` (path parameter): The unique identifier of the allocation request

**Response:**

```json
{
  "id": "req-1001",
  "teamId": "team-1",
  "teamName": "ML Research",
  "siliconId": "gpu-h100",
  "siliconName": "NVIDIA H100",
  "requestedUnits": 50,
  "status": "approved",
  "requestDate": "2023-06-10",
  "approvalDate": "2023-06-11",
  "requestedBy": "sarah.chen@example.com",
  "approvedBy": "admin@example.com",
  "justification": "Needed for training larger models with better performance",
  "notes": "Approved for immediate allocation"
}
```

### Create Allocation Request

Creates a new silicon allocation request.

**Endpoint:** `POST /api/silicon/requests`

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "teamId": "team-1",
  "siliconId": "gpu-h100",
  "requestedUnits": 50,
  "justification": "Needed for training larger models with better performance"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Allocation request created successfully",
  "request": {
    "id": "req-1005",
    "teamId": "team-1",
    "teamName": "ML Research",
    "siliconId": "gpu-h100",
    "siliconName": "NVIDIA H100",
    "requestedUnits": 50,
    "status": "pending",
    "requestDate": "2023-06-15",
    "requestedBy": "sarah.chen@example.com",
    "justification": "Needed for training larger models with better performance"
  }
}
```

### Update Allocation Request Status

Updates the status of a silicon allocation request.

**Endpoint:** `PUT /api/silicon/requests/{requestId}`

**Headers:**
- `Authorization: Bearer {token}`

**Parameters:**
- `requestId` (path parameter): The unique identifier of the allocation request

**Request Body:**

```json
{
  "status": "approved",
  "notes": "Approved for immediate allocation"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Request status updated successfully",
  "request": {
    "id": "req-1002",
    "teamId": "team-2",
    "teamName": "Production Inference",
    "siliconId": "gpu-a100",
    "siliconName": "NVIDIA A100",
    "requestedUnits": 30,
    "status": "approved",
    "requestDate": "2023-06-12",
    "approvalDate": "2023-06-15",
    "requestedBy": "michael.r@example.com",
    "approvedBy": "admin@example.com",
    "notes": "Approved for immediate allocation"
  }
}
```

### Get Allocation History

Retrieves the history of silicon allocations.

**Endpoint:** `GET /api/silicon/history`

**Headers:**
- `Authorization: Bearer {token}`

**Query Parameters:**
- `teamId` (optional): Filter history by team ID
- `siliconId` (optional): Filter history by silicon type ID
- `startDate` (optional): Filter history by start date (ISO format)
- `endDate` (optional): Filter history by end date (ISO format)

**Response:**

```json
{
  "history": [
    {
      "id": "hist-1001",
      "teamId": "team-1",
      "teamName": "ML Research",
      "siliconId": "gpu-h100",
      "siliconName": "NVIDIA H100",
      "action": "allocation-increase",
      "previousUnits": 150,
      "newUnits": 200,
      "timestamp": "2023-06-11T14:30:00Z",
      "requestId": "req-1001",
      "performedBy": "admin@example.com"
    },
    {
      "id": "hist-1002",
      "teamId": "team-3",
      "teamName": "Data Engineering",
      "siliconId": "tpu-v4",
      "siliconName": "Google TPU v4",
      "action": "allocation-increase",
      "previousUnits": 20,
      "newUnits": 30,
      "timestamp": "2023-06-09T11:45:00Z",
      "requestId": "req-1003",
      "performedBy": "admin@example.com"
    },
    // Additional history entries...
  ]
}
```

### Get Utilization Data

Retrieves silicon utilization data for visualization.

**Endpoint:** `GET /api/silicon/utilization`

**Headers:**
- `Authorization: Bearer {token}`

**Query Parameters:**
- `siliconId` (optional): Filter utilization by silicon type ID
- `period` (optional): Time period for data (day, week, month)

**Response:**

```json
{
  "period": "week",
  "data": [
    {
      "timestamp": "2023-06-08T00:00:00Z",
      "utilization": {
        "gpu-a100": 79.2,
        "gpu-h100": 72.5,
        "tpu-v4": 58.3,
        "cpu-epyc": 25.1
      }
    },
    {
      "timestamp": "2023-06-09T00:00:00Z",
      "utilization": {
        "gpu-a100": 80.1,
        "gpu-h100": 73.8,
        "tpu-v4": 59.2,
        "cpu-epyc": 25.8
      }
    },
    // Additional data points...
  ]
}
```

## Data Models

### Silicon Type Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the silicon type |
| name | string | Display name of the silicon type |
| totalUnits | number | Total units available |
| allocatedUnits | number | Units currently allocated |
| availableUnits | number | Units available for allocation |
| utilizationRate | number | Current utilization percentage |
| icon | string | Icon name for UI representation |
| description | string | Detailed description of the silicon type |
| specs | object | Technical specifications of the silicon type |

### Team Allocation Object

| Field | Type | Description |
|-------|------|-------------|
| teamId | string | Unique identifier for the team |
| teamName | string | Name of the team |
| allocations | array | List of silicon allocations for the team |
| totalAllocation | number | Total units allocated to the team |

### Allocation Object

| Field | Type | Description |
|-------|------|-------------|
| siliconId | string | Unique identifier for the silicon type |
| siliconName | string | Name of the silicon type |
| units | number | Number of units allocated |

### Allocation Request Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the request |
| teamId | string | ID of the team requesting allocation |
| teamName | string | Name of the team requesting allocation |
| siliconId | string | ID of the requested silicon type |
| siliconName | string | Name of the requested silicon type |
| requestedUnits | number | Number of units requested |
| status | string | Status of the request (pending, approved, rejected) |
| requestDate | string | ISO date string when the request was created |
| approvalDate | string | ISO date string when the request was approved (if applicable) |
| rejectionDate | string | ISO date string when the request was rejected (if applicable) |
| rejectionReason | string | Reason for rejection (if applicable) |
| requestedBy | string | Email of the user who created the request |
| approvedBy | string | Email of the user who approved the request (if applicable) |
| justification | string | Justification for the allocation request |
| notes | string | Additional notes about the request |

### History Entry Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the history entry |
| teamId | string | ID of the team involved |
| teamName | string | Name of the team involved |
| siliconId | string | ID of the silicon type involved |
| siliconName | string | Name of the silicon type involved |
| action | string | Type of action (allocation-increase, allocation-decrease, etc.) |
| previousUnits | number | Previous allocation units |
| newUnits | number | New allocation units |
| timestamp | string | ISO timestamp when the action occurred |
| requestId | string | ID of the related allocation request (if applicable) |
| performedBy | string | Email of the user who performed the action |

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
