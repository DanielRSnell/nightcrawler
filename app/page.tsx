'use client'; // Convert this to a client component

import { Cpu, Server, Activity, Network } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OverviewChart } from '@/components/dashboard/OverviewChart';
import { RecentSales } from '@/components/dashboard/RecentSales';
import { GaugeCard } from '@/components/ui/gauge-card.tsx';
import { UtilizationGrid } from '@/components/ui/utilization-grid';

export default function DashboardPage() {
  // Mock data for stats cards
  const statsData = [
    {
      title: 'Total Silicon Demand',
      value: 1740,
      trend: '+1.2',
      period: 'from last week',
      iconName: 'Server', // Use string names instead of component references
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500'
    },
    {
      title: 'Active Nodes',
      value: 148,
      trend: '0.0',
      period: 'from last week',
      iconName: 'Cpu',
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Pending Workflows',
      value: 17,
      trend: '+3.0',
      period: 'from last week',
      iconName: 'Activity',
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-500'
    },
    {
      title: 'Network Utilization',
      value: 86,
      suffix: '%',
      trend: '-0.5',
      period: 'from last hour',
      iconName: 'Network',
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-500'
    }
  ];

  // Generate mock data for CPU utilization grid
  const generateCpuUtilizationData = () => {
    // Create an array of 256 values (16x16 grid)
    const data = [];
    // First 3 rows are low utilization (green)
    for (let i = 0; i < 54; i++) {
      data.push(Math.floor(Math.random() * 30) + 5); // 5-35%
    }
    // Next rows are high utilization (red)
    for (let i = 0; i < 202; i++) {
      data.push(Math.floor(Math.random() * 40) + 60); // 60-100%
    }
    return data;
  };

  const cpuUtilizationData = generateCpuUtilizationData();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <StatsCards stats={statsData} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GaugeCard 
          title="CPU Usage" 
          description="Current utilization" 
          value={25} 
          max={100} 
          label="Low usage" 
          unit="%" 
        />
        <GaugeCard 
          title="Memory Usage" 
          description="RAM allocation" 
          value={58} 
          max={100} 
          label="Medium usage" 
          unit="%" 
          colorMode="warning" 
        />
        <GaugeCard 
          title="GPU Utilization" 
          description="CUDA cores" 
          value={82} 
          max={100} 
          label="High usage" 
          unit="%" 
          colorMode="success" 
        />
        <GaugeCard 
          title="Disk I/O" 
          description="Read/Write operations" 
          value={92} 
          max={100} 
          label="Critical" 
          unit="%" 
          colorMode="danger" 
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <UtilizationGrid />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart className="lg:col-span-4" chartData={{}} />
        <RecentSales className="lg:col-span-3" workflowData={{}} />
      </div>
    </div>
  );
}