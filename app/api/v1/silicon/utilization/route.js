import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Static data for silicon utilization by cluster
const siliconUtilizationData = {
  clusters: [
    {
      id: 'cluster-a',
      name: 'Cluster A',
      total_silicon: 500,
      allocated_silicon: 450,
      utilization_rate: 0.92,
      history: [
        { timestamp: '2025-03-01T00:00:00Z', utilization_rate: 0.88 },
        { timestamp: '2025-03-02T00:00:00Z', utilization_rate: 0.90 },
        { timestamp: '2025-03-03T00:00:00Z', utilization_rate: 0.91 },
        { timestamp: '2025-03-04T00:00:00Z', utilization_rate: 0.89 },
        { timestamp: '2025-03-05T00:00:00Z', utilization_rate: 0.92 }
      ]
    },
    {
      id: 'cluster-b',
      name: 'Cluster B',
      total_silicon: 750,
      allocated_silicon: 700,
      utilization_rate: 0.94,
      history: [
        { timestamp: '2025-03-01T00:00:00Z', utilization_rate: 0.91 },
        { timestamp: '2025-03-02T00:00:00Z', utilization_rate: 0.93 },
        { timestamp: '2025-03-03T00:00:00Z', utilization_rate: 0.94 },
        { timestamp: '2025-03-04T00:00:00Z', utilization_rate: 0.92 },
        { timestamp: '2025-03-05T00:00:00Z', utilization_rate: 0.94 }
      ]
    },
    {
      id: 'cluster-c',
      name: 'Cluster C',
      total_silicon: 300,
      allocated_silicon: 250,
      utilization_rate: 0.86,
      history: [
        { timestamp: '2025-03-01T00:00:00Z', utilization_rate: 0.82 },
        { timestamp: '2025-03-02T00:00:00Z', utilization_rate: 0.84 },
        { timestamp: '2025-03-03T00:00:00Z', utilization_rate: 0.85 },
        { timestamp: '2025-03-04T00:00:00Z', utilization_rate: 0.83 },
        { timestamp: '2025-03-05T00:00:00Z', utilization_rate: 0.86 }
      ]
    }
  ],
  summary: {
    total_silicon: 1550,
    allocated_silicon: 1400,
    overall_utilization: 0.92,
    trend: 'increasing'
  }
};

export async function GET() {
  return NextResponse.json(siliconUtilizationData);
}
