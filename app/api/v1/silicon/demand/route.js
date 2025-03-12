import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Static data for silicon demand
const siliconDemandData = [
  { date: '2025-03-01', demand: 1250, allocated: 1100, utilization: 0.88 },
  { date: '2025-03-02', demand: 1400, allocated: 1200, utilization: 0.86 },
  { date: '2025-03-03', demand: 1350, allocated: 1300, utilization: 0.96 },
  { date: '2025-03-04', demand: 1500, allocated: 1350, utilization: 0.90 },
  { date: '2025-03-05', demand: 1600, allocated: 1400, utilization: 0.88 },
  { date: '2025-03-06', demand: 1550, allocated: 1450, utilization: 0.94 },
  { date: '2025-03-07', demand: 1650, allocated: 1500, utilization: 0.91 },
  { date: '2025-03-08', demand: 1700, allocated: 1550, utilization: 0.91 },
  { date: '2025-03-09', demand: 1800, allocated: 1600, utilization: 0.89 },
  { date: '2025-03-10', demand: 1850, allocated: 1700, utilization: 0.92 },
  { date: '2025-03-11', demand: 1900, allocated: 1750, utilization: 0.92 },
  { date: '2025-03-12', demand: 1950, allocated: 1800, utilization: 0.92 },
  { date: '2025-03-13', demand: 2000, allocated: 1850, utilization: 0.93 },
  { date: '2025-03-14', demand: 2050, allocated: 1900, utilization: 0.93 },
];

export async function GET() {
  return NextResponse.json(siliconDemandData);
}
