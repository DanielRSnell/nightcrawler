'use client'; // Convert this to a client component

import { Cpu, Server, Activity, Network } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OverviewChart } from '@/components/dashboard/OverviewChart';
import { RecentSales } from '@/components/dashboard/RecentSales';
import { GaugeCard } from '@/components/ui/gauge-card.tsx';
import { UtilizationGrid } from '@/components/ui/utilization-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/workflow/create">Create Workflow</Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="custom-border border-gray-900/30/40 bg-black">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Resource Utilization</CardTitle>
            <CardDescription>Current system resource usage</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your resource utilization content here */}
          </CardContent>
        </Card>
        
        <Card className="custom-border border-gray-900/30/40 bg-black">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Recent Workflows</CardTitle>
            <CardDescription>Recently executed workflows</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your recent workflows content here */}
          </CardContent>
        </Card>
      </div>
      
      <UtilizationGrid />
    </div>
  );
}