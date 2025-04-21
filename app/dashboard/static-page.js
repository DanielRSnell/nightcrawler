'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Server, Cpu, Activity, Network } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import the chart component with SSR explicitly disabled
const ClientOnlyChart = dynamic(
  () => import('@/components/dashboard/ChartComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[324px] bg-black border-2 border-gray-900/30 shadow-lg rounded-lg p-6 flex items-center justify-center">
        <p className="text-white">Loading chart...</p>
      </div>
    )
  }
);

// Static dashboard data
const staticData = {
  title: "System Resource Utilization",
  subtitle: "Real-time resource metrics",
  metrics: [
    {
      name: 'GPU Utilization',
      color: 'rgba(56, 189, 248, 1)',
      baseValue: 1073741824,    // 1 GB in bytes
      variance: 107374182       // 100 MB variance
    },
    {
      name: 'CPU Utilization',
      color: 'rgba(62, 207, 142, 1)',
      baseValue: 1610612736,    // 1.5 GB in bytes
      variance: 161061273       // 150 MB variance
    },
    {
      name: 'Memory Utilization',
      color: 'rgba(255, 220, 50, 1)',
      baseValue: 2147483648,    // 2 GB in bytes
      variance: 214748364       // 200 MB variance
    },
    {
      name: 'Max Memory Usage',
      color: 'rgba(255, 65, 105, 1)',
      baseValue: 3221225472,    // 3 GB in bytes
      variance: 0               // No variance for max value
    }
  ]
};

export default function StaticDashboardPage() {
  return (
    <div className="flex-1 overflow-auto p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            System overview and resource utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Apr 21, 2025</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-4"
        >
          <ClientOnlyChart chartData={staticData} />
        </motion.div>
          
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold">System Status</h3>
              <p className="text-sm text-muted-foreground">All systems operational</p>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Server Uptime</span>
                  </div>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">CPU Load</span>
                  </div>
                  <span className="text-sm font-medium">42%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Active Processes</span>
                  </div>
                  <span className="text-sm font-medium">148</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Network Traffic</span>
                  </div>
                  <span className="text-sm font-medium">1.2 GB/s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
