import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Static data for compute pools
const poolsData = {
  pools: [
    {
      id: 'pool-1',
      name: 'High Priority',
      total_capacity: 500,
      allocated: 475,
      available: 25,
      utilization_rate: 0.95,
      status: 'healthy',
      queue_depth: 12,
      average_wait_time: '00:45:30',
      nodes: [
        { id: 'node-101', status: 'active', load: 0.92 },
        { id: 'node-102', status: 'active', load: 0.88 },
        { id: 'node-103', status: 'active', load: 0.95 },
        { id: 'node-104', status: 'maintenance', load: 0 },
        { id: 'node-105', status: 'active', load: 0.91 }
      ]
    },
    {
      id: 'pool-2',
      name: 'Standard',
      total_capacity: 750,
      allocated: 600,
      available: 150,
      utilization_rate: 0.80,
      status: 'healthy',
      queue_depth: 8,
      average_wait_time: '01:15:45',
      nodes: [
        { id: 'node-201', status: 'active', load: 0.78 },
        { id: 'node-202', status: 'active', load: 0.82 },
        { id: 'node-203', status: 'active', load: 0.85 },
        { id: 'node-204', status: 'active', load: 0.76 },
        { id: 'node-205', status: 'active', load: 0.79 }
      ]
    },
    {
      id: 'pool-3',
      name: 'Low Priority',
      total_capacity: 300,
      allocated: 200,
      available: 100,
      utilization_rate: 0.67,
      status: 'healthy',
      queue_depth: 3,
      average_wait_time: '02:30:15',
      nodes: [
        { id: 'node-301', status: 'active', load: 0.65 },
        { id: 'node-302', status: 'active', load: 0.70 },
        { id: 'node-303', status: 'inactive', load: 0 }
      ]
    }
  ],
  summary: {
    total_pools: 3,
    total_capacity: 1550,
    total_allocated: 1275,
    total_available: 275,
    overall_utilization: 0.82,
    health_status: 'good'
  }
};

export async function GET() {
  return NextResponse.json(poolsData);
}
