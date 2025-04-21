'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Download, Calendar, Filter, Plus, Server, Cpu, Microchip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UtilizationGrid } from '@/components/ui/utilization-grid';

export default function SiliconAllocationPage() {
  const { user } = useAuthStore();
  const currentDate = new Date();
  
  // Format date for the page
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Define all silicon allocation data centrally to pass to components
  const siliconData = {
    // Summary data
    summary: {
      totalUnits: 2450,
      allocatedUnits: 1720,
      availableUnits: 730,
      utilizationRate: 70.2,
    },
    
    // Silicon types data
    siliconTypes: [
      {
        id: 'gpu-a100',
        name: 'NVIDIA A100',
        totalUnits: 1200,
        allocatedUnits: 980,
        availableUnits: 220,
        utilizationRate: 81.7,
        icon: Microchip,
      },
      {
        id: 'gpu-h100',
        name: 'NVIDIA H100',
        totalUnits: 600,
        allocatedUnits: 450,
        availableUnits: 150,
        utilizationRate: 75.0,
        icon: Microchip,
      },
      {
        id: 'tpu-v4',
        name: 'Google TPU v4',
        totalUnits: 350,
        allocatedUnits: 210,
        availableUnits: 140,
        utilizationRate: 60.0,
        icon: Cpu,
      },
      {
        id: 'cpu-epyc',
        name: 'AMD EPYC',
        totalUnits: 300,
        allocatedUnits: 80,
        availableUnits: 220,
        utilizationRate: 26.7,
        icon: Server,
      },
    ],
    
    // Allocation data by team
    teamAllocations: [
      {
        teamId: 'team-1',
        teamName: 'ML Research',
        allocations: [
          { siliconId: 'gpu-a100', units: 450 },
          { siliconId: 'gpu-h100', units: 200 },
          { siliconId: 'tpu-v4', units: 100 },
          { siliconId: 'cpu-epyc', units: 30 },
        ],
      },
      {
        teamId: 'team-2',
        teamName: 'Production Inference',
        allocations: [
          { siliconId: 'gpu-a100', units: 300 },
          { siliconId: 'gpu-h100', units: 150 },
          { siliconId: 'tpu-v4', units: 50 },
          { siliconId: 'cpu-epyc', units: 20 },
        ],
      },
      {
        teamId: 'team-3',
        teamName: 'Data Engineering',
        allocations: [
          { siliconId: 'gpu-a100', units: 150 },
          { siliconId: 'gpu-h100', units: 50 },
          { siliconId: 'tpu-v4', units: 30 },
          { siliconId: 'cpu-epyc', units: 20 },
        ],
      },
      {
        teamId: 'team-4',
        teamName: 'Platform Team',
        allocations: [
          { siliconId: 'gpu-a100', units: 80 },
          { siliconId: 'gpu-h100', units: 50 },
          { siliconId: 'tpu-v4', units: 30 },
          { siliconId: 'cpu-epyc', units: 10 },
        ],
      },
    ],
    
    // Recent allocation requests
    recentRequests: [
      {
        id: 'req-1001',
        teamId: 'team-1',
        teamName: 'ML Research',
        siliconId: 'gpu-h100',
        siliconName: 'NVIDIA H100',
        requestedUnits: 50,
        status: 'approved',
        requestDate: '2025-06-10',
        approvalDate: '2025-06-11',
      },
      {
        id: 'req-1002',
        teamId: 'team-2',
        teamName: 'Production Inference',
        siliconId: 'gpu-a100',
        siliconName: 'NVIDIA A100',
        requestedUnits: 30,
        status: 'pending',
        requestDate: '2025-06-12',
      },
      {
        id: 'req-1003',
        teamId: 'team-3',
        teamName: 'Data Engineering',
        siliconId: 'tpu-v4',
        siliconName: 'Google TPU v4',
        requestedUnits: 20,
        status: 'approved',
        requestDate: '2025-06-08',
        approvalDate: '2025-06-09',
      },
      {
        id: 'req-1004',
        teamId: 'team-4',
        teamName: 'Platform Team',
        siliconId: 'cpu-epyc',
        siliconName: 'AMD EPYC',
        requestedUnits: 15,
        status: 'rejected',
        requestDate: '2025-06-07',
        rejectionDate: '2025-06-08',
        rejectionReason: 'Insufficient justification for allocation',
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
            <h1 className="text-3xl font-bold tracking-tight text-white">Silicon Allocation</h1>
            <p className="text-gray-400 mt-1">Manage and monitor compute resource allocation</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50 ">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Request Allocation
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
              <CardDescription>Total Silicon Units</CardDescription>
              <CardTitle className="text-2xl">{siliconData.summary.totalUnits}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Allocated Units</CardDescription>
              <CardTitle className="text-2xl">{siliconData.summary.allocatedUnits}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Available Units</CardDescription>
              <CardTitle className="text-2xl">{siliconData.summary.availableUnits}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Utilization Rate</CardDescription>
              <CardTitle className="text-2xl">{siliconData.summary.utilizationRate}%</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-gray-900/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team-allocations">Team Allocations</TabsTrigger>
            <TabsTrigger value="requests">Allocation Requests</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6">
              {/* Silicon Types Overview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle>Silicon Types</CardTitle>
                    <CardDescription>Overview of different compute resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {siliconData.siliconTypes.map((type) => (
                        <div key={type.id} className="flex items-center p-4 border border-gray-800 rounded-lg">
                          <div className="mr-4 p-3 bg-gray-800/50 /50 rounded-full">
                            {type.icon && <type.icon className="h-6 w-6 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{type.name}</h3>
                            <div className="text-sm text-gray-400">
                              {type.allocatedUnits} / {type.totalUnits} units ({type.utilizationRate}%)
                            </div>
                            <div className="w-full h-2 bg-gray-800/50 /50 rounded-full mt-2">
                              <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${type.utilizationRate}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Utilization Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle>Utilization Heatmap</CardTitle>
                    <CardDescription>Silicon utilization across time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UtilizationGrid />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="team-allocations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Team Allocations</CardTitle>
                  <CardDescription>Silicon allocation by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {siliconData.teamAllocations.map((team) => (
                      <div key={team.teamId} className="border border-gray-800 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-white mb-4">{team.teamName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {team.allocations.map((allocation) => {
                            const siliconType = siliconData.siliconTypes.find(
                              (type) => type.id === allocation.siliconId
                            );
                            return (
                              <div key={allocation.siliconId} className="bg-gray-800/50  p-3 rounded-lg">
                                <div className="text-sm text-gray-400">{siliconType?.name}</div>
                                <div className="text-xl font-medium text-white">{allocation.units} units</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="requests">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Allocation Requests</CardTitle>
                  <CardDescription>Recent silicon allocation requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {siliconData.recentRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between border border-gray-800 rounded-lg p-4">
                        <div>
                          <h3 className="font-medium text-white">{request.teamName}</h3>
                          <div className="text-sm text-gray-400">
                            Requested {request.requestedUnits} units of {request.siliconName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Requested on {request.requestDate}
                          </div>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === 'approved' 
                              ? 'bg-green-900/50 text-green-400' 
                              : request.status === 'pending'
                                ? 'bg-yellow-900/50 text-yellow-400'
                                : 'bg-red-900/50 text-red-400'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="flex items-center justify-center h-64 bg-gray-900/50 border border-gray-800 rounded-lg">
              <p className="text-gray-400">Allocation history will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 