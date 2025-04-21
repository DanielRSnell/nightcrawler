# Workflow API Documentation

This document outlines the API endpoints for managing workflows in the Nightcrawler Dashboard.

## Endpoints

### Workflow Management

#### `GET /api/workflows`

Retrieves a list of all workflows and summary information.

**Query Parameters:**

- `status` (optional): Filter workflows by status (active, inactive, etc.)
- `priority` (optional): Filter workflows by priority (high, medium, low, critical)
- `search` (optional): Search term to filter workflows by name or description

**Response:**

```json
{
  "workflows": [
    {
      "id": "wf-1001",
      "name": "GPU Training Pipeline",
      "description": "Allocates GPUs for ML model training",
      "status": "active",
      "priority": "high",
      "lastRun": "2025-10-15T10:30:00Z"
    }
    // Additional workflows...
  ],
  "total": 5,
  "page": 1,
  "pageSize": 10
}
```

#### `GET /api/workflows/{workflowId}`

Retrieves detailed information about a specific workflow.

**Response:**

```json
{
  "id": "wf-1001",
  "name": "Image Classification Training",
  "description": "A workflow for training image classification models on the ImageNet dataset using distributed GPU training.",
  "status": "active",
  "priority": "high",
  "creator": "John Doe",
  "createdAt": "2025-06-15T10:30:00Z",
  "lastRun": "2025-07-10T14:45:00Z",
  "environments": ["production", "staging"],
  "tags": ["machine-learning", "computer-vision", "training"],
  "steps": [
    { "name": "Data Preparation", "status": "completed", "duration": "10:25" },
    { "name": "Model Training", "status": "completed", "duration": "45:30" },
    { "name": "Model Evaluation", "status": "completed", "duration": "15:10" },
    { "name": "Model Export", "status": "completed", "duration": "05:45" },
    { "name": "Deployment", "status": "pending", "duration": "00:00" }
  ],
  "config": {
    "timeout": "2 hours",
    "retries": 3,
    "retryDelay": "30 seconds",
    "computeProfile": "GPU-Optimized",
    "resources": {
      "cpu": "16 cores",
      "memory": "64 GB",
      "gpu": "8x NVIDIA A100"
    },
    "storage": {
      "persistentVolume": "500 GB",
      "ephemeralStorage": "200 GB"
    },
    "notifications": {
      "email": true,
      "slack": true,
      "webhook": false
    },
    "notificationEvents": ["start", "complete", "fail"],
    "schedule": {
      "type": "cron",
      "cron": "0 0 * * 1",
      "description": "Runs every Monday at midnight",
      "skipOnFailure": true,
      "catchUp": false
    },
    "security": {
      "visibility": "Team",
      "auditLogging": true,
      "secureSecrets": true,
      "permissions": [
        { "role": "Admin", "access": "Full Access" },
        { "role": "Data Scientist", "access": "Execute, Edit" },
        { "role": "Viewer", "access": "View Only" }
      ]
    }
  }
}
```

#### `POST /api/workflows`

Creates a new workflow.

**Request Body:**

```json
{
  "name": "New ML Training Pipeline",
  "description": "Handles distributed training across multiple GPU nodes",
  "priority": "medium",
  "environmentStrategy": "time",
  "traceLevel": "med",
  "environments": {
    "awsVirginia": true,
    "dgxCloudCalifornia": false
  },
  "options": {
    "enableNotifications": false,
    "enableLogging": true,
    "enableRetry": false
  }
}
```

**Response:**

```json
{
  "id": "wf-1006",
  "name": "New ML Training Pipeline",
  "description": "Handles distributed training across multiple GPU nodes",
  "status": "inactive",
  "priority": "medium",
  "creator": "John Doe",
  "createdAt": "2025-10-17T14:30:00Z"
}
```

#### `PUT /api/workflows/{workflowId}`

Updates an existing workflow.

**Request Body:**

```json
{
  "name": "Updated ML Training Pipeline",
  "description": "Updated description for the workflow",
  "priority": "high",
  "options": {
    "enableNotifications": true,
    "enableLogging": true,
    "enableRetry": true
  }
}
```

**Response:**

```json
{
  "id": "wf-1001",
  "name": "Updated ML Training Pipeline",
  "description": "Updated description for the workflow",
  "status": "active",
  "priority": "high",
  "updatedAt": "2025-10-17T15:45:00Z"
}
```

#### `DELETE /api/workflows/{workflowId}`

Deletes a workflow.

**Response:**

```json
{
  "success": true,
  "message": "Workflow deleted successfully"
}
```

### Workflow Execution

#### `POST /api/workflows/{workflowId}/execute`

Executes a workflow.

**Request Body:**

```json
{
  "environment": "production",
  "parameters": {
    "datasetPath": "s3://datasets/imagenet",
    "batchSize": 64,
    "epochs": 10
  }
}
```

**Response:**

```json
{
  "executionId": "exec-5002",
  "workflowId": "wf-1001",
  "status": "running",
  "startTime": "2025-10-17T16:00:00Z",
  "estimatedDuration": "01:15:00"
}
```

#### `GET /api/workflows/{workflowId}/executions`

Retrieves execution history for a specific workflow.

**Query Parameters:**

- `status` (optional): Filter executions by status (completed, failed, running)
- `limit` (optional): Limit the number of executions returned
- `offset` (optional): Offset for pagination

**Response:**

```json
{
  "executions": [
    {
      "id": "exec-5001",
      "status": "completed",
      "startTime": "2025-07-10T14:45:00Z",
      "endTime": "2025-07-10T16:01:25Z",
      "duration": "01:16:25",
      "executor": "John Doe",
      "resourceUsage": {
        "cpu": 78,
        "memory": 65,
        "gpu": 92
      }
    },
    {
      "id": "exec-4892",
      "status": "failed",
      "startTime": "2025-07-05T09:30:00Z",
      "endTime": "2025-07-05T10:15:45Z",
      "duration": "00:45:45",
      "executor": "John Doe",
      "error": "GPU memory allocation failed during training step"
    }
    // Additional executions...
  ],
  "total": 3,
  "limit": 10,
  "offset": 0
}
```

#### `GET /api/workflows/{workflowId}/executions/{executionId}`

Retrieves detailed information about a specific workflow execution.

**Response:**

```json
{
  "id": "exec-5001",
  "workflowId": "wf-1001",
  "status": "completed",
  "startTime": "2025-07-10T14:45:00Z",
  "endTime": "2025-07-10T16:01:25Z",
  "duration": "01:16:25",
  "executor": "John Doe",
  "resourceUsage": {
    "cpu": 78,
    "memory": 65,
    "gpu": 92
  },
  "stepExecutions": [
    {
      "name": "Data Preparation",
      "status": "completed",
      "startTime": "2025-07-10T14:45:00Z",
      "endTime": "2025-07-10T14:55:25Z",
      "duration": "00:10:25",
      "logs": [
        {
          "timestamp": "14:45:10",
          "level": "info",
          "message": "Starting data preparation..."
        },
        {
          "timestamp": "14:47:30",
          "level": "info",
          "message": "Downloading ImageNet dataset..."
        },
        {
          "timestamp": "14:52:15",
          "level": "info",
          "message": "Preprocessing images..."
        },
        {
          "timestamp": "14:55:20",
          "level": "info",
          "message": "Data preparation completed successfully."
        }
      ]
    }
    // Additional step executions...
  ],
  "parameters": {
    "datasetPath": "s3://datasets/imagenet",
    "batchSize": 64,
    "epochs": 10
  }
}
```

#### `POST /api/workflows/{workflowId}/executions/{executionId}/cancel`

Cancels a running workflow execution.

**Response:**

```json
{
  "success": true,
  "message": "Execution cancellation requested",
  "executionId": "exec-5002",
  "status": "cancelling"
}
```

## Data Models

### Workflow

```typescript
interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  priority: "low" | "medium" | "high" | "critical";
  creator: string;
  createdAt: string;
  lastRun?: string;
  environments: string[];
  tags: string[];
  steps: WorkflowStep[];
  config: WorkflowConfig;
}
```

### WorkflowStep

```typescript
interface WorkflowStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: string;
}
```

### WorkflowConfig

```typescript
interface WorkflowConfig {
  timeout: string;
  retries: number;
  retryDelay: string;
  computeProfile: string;
  resources: {
    cpu: string;
    memory: string;
    gpu: string;
  };
  storage?: {
    persistentVolume: string;
    ephemeralStorage: string;
  };
  notifications?: {
    email: boolean;
    slack: boolean;
    webhook: boolean;
  };
  notificationEvents?: string[];
  schedule?: {
    type: "cron" | "interval";
    cron?: string;
    interval?: string;
    description: string;
    skipOnFailure: boolean;
    catchUp: boolean;
  };
  security?: {
    visibility: "Private" | "Team" | "Public";
    auditLogging: boolean;
    secureSecrets: boolean;
    permissions: {
      role: string;
      access: string;
    }[];
  };
}
```

### WorkflowExecution

```typescript
interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "running" | "completed" | "failed" | "cancelled";
  startTime: string;
  endTime?: string;
  duration?: string;
  executor: string;
  error?: string;
  resourceUsage?: {
    cpu: number;
    memory: number;
    gpu: number;
  };
  stepExecutions?: StepExecution[];
  parameters?: Record<string, any>;
}
```

### StepExecution

```typescript
interface StepExecution {
  name: string;
  status: "running" | "completed" | "failed";
  startTime: string;
  endTime?: string;
  duration?: string;
  error?: string;
  logs?: {
    timestamp: string;
    level: "info" | "warning" | "error";
    message: string;
  }[];
}
```
