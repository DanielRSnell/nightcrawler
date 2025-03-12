import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Static data for workflows
const workflowsData = {
  active_workflows: [
    {
      id: 'wf-1001',
      name: 'Training Job XL-1',
      type: 'training',
      priority: 'high',
      status: 'running',
      progress: 0.65,
      start_time: '2025-03-04T14:30:00Z',
      estimated_completion: '2025-03-06T08:15:00Z',
      silicon_allocated: 120,
      pool_id: 'pool-1',
      user: 'john.doe@example.com',
      team: 'ML Research'
    },
    {
      id: 'wf-1002',
      name: 'Inference Pipeline Beta',
      type: 'inference',
      priority: 'medium',
      status: 'running',
      progress: 0.82,
      start_time: '2025-03-05T09:15:00Z',
      estimated_completion: '2025-03-05T23:45:00Z',
      silicon_allocated: 75,
      pool_id: 'pool-2',
      user: 'jane.smith@example.com',
      team: 'Production'
    },
    {
      id: 'wf-1003',
      name: 'Data Processing Job C',
      type: 'data_processing',
      priority: 'low',
      status: 'running',
      progress: 0.35,
      start_time: '2025-03-05T12:00:00Z',
      estimated_completion: '2025-03-06T18:30:00Z',
      silicon_allocated: 40,
      pool_id: 'pool-3',
      user: 'alex.johnson@example.com',
      team: 'Data Science'
    }
  ],
  queued_workflows: [
    {
      id: 'wf-1004',
      name: 'Training Job XL-2',
      type: 'training',
      priority: 'high',
      status: 'queued',
      queue_position: 1,
      submission_time: '2025-03-05T10:45:00Z',
      estimated_start: '2025-03-06T08:30:00Z',
      silicon_requested: 150,
      pool_id: 'pool-1',
      user: 'john.doe@example.com',
      team: 'ML Research'
    },
    {
      id: 'wf-1005',
      name: 'Model Evaluation Run',
      type: 'evaluation',
      priority: 'medium',
      status: 'queued',
      queue_position: 2,
      submission_time: '2025-03-05T11:30:00Z',
      estimated_start: '2025-03-06T10:15:00Z',
      silicon_requested: 85,
      pool_id: 'pool-2',
      user: 'sarah.wilson@example.com',
      team: 'ML Research'
    }
  ],
  completed_workflows: [
    {
      id: 'wf-1000',
      name: 'Training Job Large',
      type: 'training',
      priority: 'high',
      status: 'completed',
      start_time: '2025-03-03T08:00:00Z',
      completion_time: '2025-03-04T12:45:00Z',
      duration: '28:45:00',
      silicon_used: 110,
      pool_id: 'pool-1',
      user: 'john.doe@example.com',
      team: 'ML Research',
      metrics: {
        efficiency: 0.92,
        cost: 1250,
        performance_score: 0.88
      }
    }
  ],
  summary: {
    active_count: 3,
    queued_count: 2,
    completed_last_24h: 1,
    total_silicon_in_use: 235,
    average_queue_time: '01:45:30',
    average_completion_time: '28:45:00'
  }
};

export async function GET() {
  return NextResponse.json(workflowsData);
}
