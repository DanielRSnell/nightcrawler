'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Download, Calendar, Filter, Plus, Server, Cpu, BarChart, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge } from '@/components/ui/gauge';
import { Badge } from '@/components/ui/badge';

export default function ComputePoolsPage() {
  const { user } = useAuthStore();
  const currentDate = new Date();
  
  // Format date for the page
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Define all compute pools data centrally to pass to components
  const poolsData = {
    // Summary data
    summary: {
      totalPools: 12,
      activePools: 9,
      totalNodes: 148,
      totalCapacity: 2450,
    },
    
    // Compute pools data
    pools: [
      {
        id: 'pool-1',
        name: 'ML Training Cluster',
        description: 'High-performance GPU cluster for ML model training',
        status: 'active',
        region: 'us-east-1',
        provider: 'AWS',
        nodeCount: 48,
        cpuUtilization: 78.5,
        memoryUtilization: 82.3,
        gpuUtilization: 91.7,
        networkUtilization: 65.2,
        nodeTypes: [
          { type: 'p4d.24xlarge', count: 32 },
          { type: 'p3.16xlarge', count: 16 },
        ],
        tags: ['ml-training', 'high-priority', 'production'],
        createdAt: '2023-01-15',
      },
      {
        id: 'pool-2',
        name: 'Inference Fleet',
        description: 'Optimized for low-latency model inference',
        status: 'active',
        region: 'us-west-2',
        provider: 'AWS',
        nodeCount: 24,
        cpuUtilization: 62.8,
        memoryUtilization: 58.4,
        gpuUtilization: 76.2,
        networkUtilization: 48.9,
        nodeTypes: [
          { type: 'g5.12xlarge', count: 16 },
          { type: 'g4dn.12xlarge', count: 8 },
        ],
        tags: ['inference', 'production'],
        createdAt: '2023-02-20',
      },
      {
        id: 'pool-3',
        name: 'TPU Research Cluster',
        description: 'TPU-based compute for research experiments',
        status: 'active',
        region: 'us-central1',
        provider: 'GCP',
        nodeCount: 16,
        cpuUtilization: 45.2,
        memoryUtilization: 52.7,
        gpuUtilization: 88.3,
        networkUtilization: 42.1,
        nodeTypes: [
          { type: 'tpu-v4-16', count: 8 },
          { type: 'tpu-v4-8', count: 8 },
        ],
        tags: ['research', 'tpu', 'experimental'],
        createdAt: '2023-03-10',
      },
      {
        id: 'pool-4',
        name: 'Development Sandbox',
        description: 'Flexible compute resources for development',
        status: 'active',
        region: 'eu-west-1',
        provider: 'AWS',
        nodeCount: 12,
        cpuUtilization: 32.5,
        memoryUtilization: 41.8,
        gpuUtilization: 28.6,
        networkUtilization: 22.4,
        nodeTypes: [
          { type: 'g4dn.xlarge', count: 8 },
          { type: 'c6g.4xlarge', count: 4 },
        ],
        tags: ['development', 'sandbox'],
        createdAt: '2023-04-05',
      },
      {
        id: 'pool-5',
        name: 'Data Processing Cluster',
        description: 'Optimized for large-scale data processing',
        status: 'active',
        region: 'us-east-2',
        provider: 'AWS',
        nodeCount: 20,
        cpuUtilization: 85.3,
        memoryUtilization: 76.9,
        gpuUtilization: 0,
        networkUtilization: 72.8,
        nodeTypes: [
          { type: 'r6i.24xlarge', count: 12 },
          { type: 'r6i.12xlarge', count: 8 },
        ],
        tags: ['data-processing', 'production'],
        createdAt: '2023-02-28',
      },
      {
        id: 'pool-6',
        name: 'DGX Cluster',
        description: 'On-premise NVIDIA DGX cluster',
        status: 'active',
        region: 'on-premise',
        provider: 'NVIDIA',
        nodeCount: 8,
        cpuUtilization: 72.1,
        memoryUtilization: 68.4,
        gpuUtilization: 94.2,
        networkUtilization: 81.5,
        nodeTypes: [
          { type: 'DGX A100', count: 4 },
          { type: 'DGX-2', count: 4 },
        ],
        tags: ['on-premise', 'high-priority', 'production'],
        createdAt: '2022-11-15',
      },
    ],
    
    // Recent activities
    recentActivities: [
      {
        id: 'act-1001',
        poolId: 'pool-1',
        poolName: 'ML Training Cluster',
        action: 'node-added',
        details: 'Added 8 new p4d.24xlarge nodes',
        timestamp: '2023-06-10T14:32:45Z',
        user: 'admin@example.com',
      },
      {
        id: 'act-1002',
        poolId: 'pool-3',
        poolName: 'TPU Research Cluster',
        action: 'configuration-changed',
        details: 'Updated network configuration',
        timestamp: '2023-06-09T11:15:22Z',
        user: 'researcher@example.com',
      },
      {
        id: 'act-1003',
        poolId: 'pool-2',
        poolName: 'Inference Fleet',
        action: 'scaling-event',
        details: 'Auto-scaled from 16 to 24 nodes',
        timestamp: '2023-06-08T18:42:10Z',
        user: 'system',
      },
      {
        id: 'act-1004',
        poolId: 'pool-5',
        poolName: 'Data Processing Cluster',
        action: 'maintenance',
        details: 'Scheduled maintenance completed',
        timestamp: '2023-06-07T09:30:00Z',
        user: 'system',
      },
    ],
  };

  return (
    <div className="p-6 h-full overflow-auto bg-black w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Compute Pools</h1>
            <p className="text-gray-400 mt-1">Manage and monitor compute resource clusters</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50 ">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Pool
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Total Pools</CardDescription>
              <CardTitle className="text-2xl">{poolsData.summary.totalPools}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Active Pools</CardDescription>
              <CardTitle className="text-2xl">{poolsData.summary.activePools}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Total Nodes</CardDescription>
              <CardTitle className="text-2xl">{poolsData.summary.totalNodes}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Total Capacity</CardDescription>
              <CardTitle className="text-2xl">{poolsData.summary.totalCapacity} units</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pools" className="w-full">
          <TabsList className="mb-6 bg-gray-900/50">
            <TabsTrigger value="pools">Compute Pools</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {poolsData.pools.map((pool) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{pool.name}</CardTitle>
                          <CardDescription>{pool.description}</CardDescription>
                        </div>
                        <Badge 
                          className={
                            pool.status === 'active' 
                              ? 'bg-green-900/50 text-green-400 hover:bg-green-900/70' 
                              : 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70'
                          }
                        >
                          {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-400">Region</span>
                            <span className="text-white">{pool.region}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-400">Provider</span>
                            <span className="text-white">{pool.provider}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-400">Nodes</span>
                            <span className="text-white">{pool.nodeCount}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-400">Created</span>
                            <span className="text-white">{pool.createdAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pool.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-gray-800/50 /50 text-gray-300 rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          <div className="flex flex-col items-center">
                            <Gauge 
                              value={pool.cpuUtilization} 
                              size="sm" 
                              label="CPU" 
                              unit="%" 
                              colorMode={
                                pool.cpuUtilization > 80 ? 'danger' : 
                                pool.cpuUtilization > 60 ? 'warning' : 'success'
                              }
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <Gauge 
                              value={pool.memoryUtilization} 
                              size="sm" 
                              label="Memory" 
                              unit="%" 
                              colorMode={
                                pool.memoryUtilization > 80 ? 'danger' : 
                                pool.memoryUtilization > 60 ? 'warning' : 'success'
                              }
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <Gauge 
                              value={pool.gpuUtilization} 
                              size="sm" 
                              label="GPU" 
                              unit="%" 
                              colorMode={
                                pool.gpuUtilization > 80 ? 'danger' : 
                                pool.gpuUtilization > 60 ? 'warning' : 'success'
                              }
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <Gauge 
                              value={pool.networkUtilization} 
                              size="sm" 
                              label="Network" 
                              unit="%" 
                              colorMode={
                                pool.networkUtilization > 80 ? 'danger' : 
                                pool.networkUtilization > 60 ? 'warning' : 'success'
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        Manage
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Recent changes to compute pools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {poolsData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                        <div className="mr-4 p-2 bg-gray-800/50 /50 rounded-full">
                          {activity.action === 'node-added' && <Plus className="h-5 w-5 text-green-400" />}
                          {activity.action === 'configuration-changed' && <Server className="h-5 w-5 text-blue-400" />}
                          {activity.action === 'scaling-event' && <Layers className="h-5 w-5 text-yellow-400" />}
                          {activity.action === 'maintenance' && <RefreshCw className="h-5 w-5 text-purple-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-white">{activity.poolName}</h3>
                            <span className="text-xs text-gray-400">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{activity.details}</p>
                          <div className="text-xs text-gray-500 mt-1">By: {activity.user}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="flex items-center justify-center h-64 bg-gray-900/50 border border-gray-800 rounded-lg">
              <p className="text-gray-400">Compute pool analytics will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 