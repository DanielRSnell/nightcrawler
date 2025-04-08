# Dashboard API

This document outlines the API endpoints for the main Dashboard functionality in the Nightcrawler Dashboard.

## Base URL

```
/api/dashboard
```

## Endpoints

### Get Dashboard Overview

Retrieves all data needed for the main dashboard, including stats, resource utilization, and recent workflows.

**Endpoint:** `GET /api/dashboard/overview`

**Response:**

```json
{
  "stats": [
    {
      "title": "Total Silicon Demand",
      "value": 1740,
      "trend": "+1.2",
      "period": "from last week",
      "iconName": "Server",
      "iconColor": "text-blue-500",
      "iconBg": "bg-blue-500"
    },
    {
      "title": "Active Nodes",
      "value": 148,
      "trend": "0.0",
      "period": "from last week",
      "iconName": "Cpu",
      "iconColor": "text-green-500",
      "iconBg": "bg-green-500"
    },
    {
      "title": "Pending Workflows",
      "value": 17,
      "trend": "+3.0",
      "period": "from last week",
      "iconName": "Activity",
      "iconColor": "text-yellow-500",
      "iconBg": "bg-yellow-500"
    },
    {
      "title": "Network Utilization",
      "value": 86,
      "suffix": "%",
      "trend": "-0.5",
      "period": "from last hour",
      "iconName": "Network",
      "iconColor": "text-rose-500",
      "iconBg": "bg-rose-500"
    }
  ],
  "resourceUtilization": {
    "cpuUtilization": 72.5,
    "memoryUtilization": 68.3,
    "gpuUtilization": 89.7,
    "networkUtilization": 65.2,
    "storageUtilization": 54.8
  },
  "siliconAllocation": {
    "title": "Silicon Allocation",
    "subtitle": "Real-time utilization",
    "yAxisLabel": "Units",
    "series": [
      {
        "name": "GPU A100",
        "color": "rgba(56, 189, 248, 1)",
        "baseValue": 650,
        "variance": 30
      },
      {
        "name": "GPU H100",
        "color": "rgba(62, 207, 142, 1)",
        "baseValue": 450,
        "variance": 25
      },
      {
        "name": "TPU v4",
        "color": "rgba(255, 220, 50, 1)",
        "baseValue": 280,
        "variance": 20
      },
      {
        "name": "CPU EPYC",
        "color": "rgba(255, 65, 105, 1)",
        "baseValue": 210,
        "variance": 15
      }
    ]
  },
  "recentWorkflows": {
    "title": "Recent Workflows",
    "subtitle": "Latest workflow executions",
    "workflows": [
      {
        "name": "Training Pipeline",
        "id": "WF-7834",
        "status": "Completed",
        "siliconType": "GPU A100",
        "duration": "45m 23s",
        "avatarFallback": "NW"
      },
      {
        "name": "Inference Job",
        "id": "WF-7833",
        "status": "Running",
        "siliconType": "GPU H100",
        "duration": "12m 45s",
        "avatarFallback": "NW"
      },
      {
        "name": "Data Processing",
        "id": "WF-7832",
        "status": "Completed",
        "siliconType": "CPU EPYC",
        "duration": "32m 18s",
        "avatarFallback": "NW"
      },
      {
        "name": "Model Evaluation",
        "id": "WF-7831",
        "status": "Failed",
        "siliconType": "TPU v4",
        "duration": "8m 52s",
        "avatarFallback": "NW"
      },
      {
        "name": "Batch Prediction",
        "id": "WF-7830",
        "status": "Completed",
        "siliconType": "GPU A100",
        "duration": "27m 14s",
        "avatarFallback": "NW"
      }
    ]
  },
  "cpuUtilizationGrid": {
    "title": "CPU Utilization Grid",
    "data": [
      /* Array of 256 values representing CPU utilization percentages */
    ]
  }
}
```

### Get Stats Cards Data

Retrieves data for the stats cards displayed at the top of the dashboard.

**Endpoint:** `GET /api/dashboard/stats`

**Response:**

```json
{
  "stats": [
    {
      "title": "Total Silicon Demand",
      "value": 1740,
      "trend": "+1.2",
      "period": "from last week",
      "iconName": "Server",
      "iconColor": "text-blue-500",
      "iconBg": "bg-blue-500"
    },
    {
      "title": "Active Nodes",
      "value": 148,
      "trend": "0.0",
      "period": "from last week",
      "iconName": "Cpu",
      "iconColor": "text-green-500",
      "iconBg": "bg-green-500"
    },
    {
      "title": "Pending Workflows",
      "value": 17,
      "trend": "+3.0",
      "period": "from last week",
      "iconName": "Activity",
      "iconColor": "text-yellow-500",
      "iconBg": "bg-yellow-500"
    },
    {
      "title": "Network Utilization",
      "value": 86,
      "suffix": "%",
      "trend": "-0.5",
      "period": "from last hour",
      "iconName": "Network",
      "iconColor": "text-rose-500",
      "iconBg": "bg-rose-500"
    }
  ]
}
```

### Get Resource Utilization

Retrieves current resource utilization metrics.

**Endpoint:** `GET /api/dashboard/resource-utilization`

**Response:**

```json
{
  "cpuUtilization": 72.5,
  "memoryUtilization": 68.3,
  "gpuUtilization": 89.7,
  "networkUtilization": 65.2,
  "storageUtilization": 54.8
}
```

### Get Silicon Allocation

Retrieves data for the silicon allocation chart.

**Endpoint:** `GET /api/dashboard/silicon-allocation`

**Response:**

```json
{
  "title": "Silicon Allocation",
  "subtitle": "Real-time utilization",
  "yAxisLabel": "Units",
  "series": [
    {
      "name": "GPU A100",
      "color": "rgba(56, 189, 248, 1)",
      "baseValue": 650,
      "variance": 30
    },
    {
      "name": "GPU H100",
      "color": "rgba(62, 207, 142, 1)",
      "baseValue": 450,
      "variance": 25
    },
    {
      "name": "TPU v4",
      "color": "rgba(255, 220, 50, 1)",
      "baseValue": 280,
      "variance": 20
    },
    {
      "name": "CPU EPYC",
      "color": "rgba(255, 65, 105, 1)",
      "baseValue": 210,
      "variance": 15
    }
  ]
}
```

### Get Recent Workflows

Retrieves data for the recent workflows list.

**Endpoint:** `GET /api/dashboard/recent-workflows`

**Query Parameters:**
- `limit` (optional): Maximum number of workflows to return (default: 5)

**Response:**

```json
{
  "title": "Recent Workflows",
  "subtitle": "Latest workflow executions",
  "workflows": [
    {
      "name": "Training Pipeline",
      "id": "WF-7834",
      "status": "Completed",
      "siliconType": "GPU A100",
      "duration": "45m 23s",
      "avatarFallback": "NW"
    },
    {
      "name": "Inference Job",
      "id": "WF-7833",
      "status": "Running",
      "siliconType": "GPU H100",
      "duration": "12m 45s",
      "avatarFallback": "NW"
    },
    {
      "name": "Data Processing",
      "id": "WF-7832",
      "status": "Completed",
      "siliconType": "CPU EPYC",
      "duration": "32m 18s",
      "avatarFallback": "NW"
    },
    {
      "name": "Model Evaluation",
      "id": "WF-7831",
      "status": "Failed",
      "siliconType": "TPU v4",
      "duration": "8m 52s",
      "avatarFallback": "NW"
    },
    {
      "name": "Batch Prediction",
      "id": "WF-7830",
      "status": "Completed",
      "siliconType": "GPU A100",
      "duration": "27m 14s",
      "avatarFallback": "NW"
    }
  ]
}
```

### Get CPU Utilization Grid

Retrieves data for the CPU utilization grid visualization.

**Endpoint:** `GET /api/dashboard/cpu-utilization-grid`

**Response:**

```json
{
  "title": "CPU Utilization Grid",
  "data": [
    /* Array of 256 values representing CPU utilization percentages */
    23, 15, 28, 32, 18, 25, 30, 12, 8, 19, 27, 33, 22, 16, 29, 31,
    /* ... and so on for 256 values total */
  ]
}
```

## Data Models

### Stats Card Object

| Field | Type | Description |
|-------|------|-------------|
| title | string | Title of the stat card |
| value | number | Current value of the metric |
| trend | string | Trend percentage (with + or - prefix) |
| period | string | Period for the trend comparison |
| iconName | string | Name of the icon to display |
| iconColor | string | CSS color class for the icon |
| iconBg | string | CSS background color class for the icon |
| prefix | string (optional) | Prefix to display before the value |
| suffix | string (optional) | Suffix to display after the value |

### Resource Utilization Object

| Field | Type | Description |
|-------|------|-------------|
| cpuUtilization | number | Current CPU utilization percentage |
| memoryUtilization | number | Current memory utilization percentage |
| gpuUtilization | number | Current GPU utilization percentage |
| networkUtilization | number | Current network utilization percentage |
| storageUtilization | number | Current storage utilization percentage |

### Silicon Allocation Series Object

| Field | Type | Description |
|-------|------|-------------|
| name | string | Name of the silicon type |
| color | string | CSS color for the chart line/area |
| baseValue | number | Base value for the series |
| variance | number | Maximum variance for random fluctuations |

### Workflow Object

| Field | Type | Description |
|-------|------|-------------|
| name | string | Name of the workflow |
| id | string | Unique identifier for the workflow |
| status | string | Current status (Completed, Running, Failed) |
| siliconType | string | Type of silicon used for the workflow |
| duration | string | Duration of the workflow execution |
| avatarFallback | string | Fallback text for the avatar |

## Error Responses

All endpoints may return the following error responses:

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
  "message": "Insufficient permissions to access dashboard data"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
