'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Play, StopCircle, Terminal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock workflow execution data
const mockWorkflowData = {
  name: 'New ML Training Pipeline',
  description: 'Handles distributed training across multiple GPU nodes',
  priority: 'medium',
  steps: [
    {
      id: 'step-1',
      name: 'Environment Preparation',
      status: 'completed',
      duration: '00:01:23',
      logs: [
        { timestamp: '2023-06-14T10:00:00Z', message: 'Starting environment preparation...' },
        { timestamp: '2023-06-14T10:00:30Z', message: 'Allocating resources in AWS Virginia...' },
        { timestamp: '2023-06-14T10:01:15Z', message: 'Environment setup completed successfully.' },
      ],
    },
    {
      id: 'step-2',
      name: 'Data Loading',
      status: 'completed',
      duration: '00:02:45',
      logs: [
        { timestamp: '2023-06-14T10:01:30Z', message: 'Starting data loading process...' },
        { timestamp: '2023-06-14T10:02:15Z', message: 'Loading training dataset from S3...' },
        { timestamp: '2023-06-14T10:03:45Z', message: 'Preprocessing data for training...' },
        { timestamp: '2023-06-14T10:04:15Z', message: 'Data loading completed successfully.' },
      ],
    },
    {
      id: 'step-3',
      name: 'Model Training',
      status: 'in-progress',
      logs: [
        { timestamp: '2023-06-14T10:04:30Z', message: 'Initializing model training...' },
        { timestamp: '2023-06-14T10:05:00Z', message: 'Distributing workload across GPU nodes...' },
        { timestamp: '2023-06-14T10:05:30Z', message: 'Training in progress (Epoch 1/10)...' },
        { timestamp: '2023-06-14T10:06:15Z', message: 'Training in progress (Epoch 2/10)...' },
      ],
    },
    {
      id: 'step-4',
      name: 'Model Evaluation',
      status: 'pending',
      logs: [],
    },
    {
      id: 'step-5',
      name: 'Model Deployment',
      status: 'pending',
      logs: [],
    },
  ],
  totalSteps: 5,
  currentStep: 3,
  startTime: '2023-06-14T10:00:00Z',
  estimatedEndTime: '2023-06-14T11:30:00Z',
  resourceUsage: {
    cpu: 65,
    memory: 78,
    gpu: 92,
    network: 45,
  },
};

export default function WorkflowExecutePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workflowId = searchParams.get('id') || 'unknown';
  
  const [workflow, setWorkflow] = useState(mockWorkflowData);
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // Simulate progress updates
  useEffect(() => {
    const completedSteps = workflow.steps.filter(step => step.status === 'completed').length;
    const inProgressSteps = workflow.steps.filter(step => step.status === 'in-progress').length;
    const calculatedProgress = ((completedSteps + (inProgressSteps * 0.5)) / workflow.totalSteps) * 100;
    setProgress(calculatedProgress);
    
    // Find the active step index
    const activeIndex = workflow.steps.findIndex(step => step.status === 'in-progress');
    if (activeIndex !== -1) {
      setActiveStepIndex(activeIndex);
    } else {
      // If no in-progress step, show the first pending step or the last completed step
      const pendingIndex = workflow.steps.findIndex(step => step.status === 'pending');
      if (pendingIndex !== -1) {
        setActiveStepIndex(pendingIndex);
      } else {
        setActiveStepIndex(workflow.steps.length - 1);
      }
    }
    
    // Simulate progress for the in-progress step
    if (workflow.steps.some(step => step.status === 'in-progress')) {
      const timer = setTimeout(() => {
        const updatedWorkflow = { ...workflow };
        const currentInProgressStep = updatedWorkflow.steps.find(step => step.status === 'in-progress');
        
        if (currentInProgressStep) {
          // Add a new log entry
          const epochNumber = currentInProgressStep.logs.length - 2;
          if (epochNumber < 10) {
            currentInProgressStep.logs.push({
              timestamp: new Date().toISOString(),
              message: `Training in progress (Epoch ${epochNumber + 1}/10)...`,
            });
            
            // If reached epoch 10, complete this step and start the next one
            if (epochNumber === 9) {
              currentInProgressStep.status = 'completed';
              currentInProgressStep.duration = '00:15:32';
              currentInProgressStep.logs.push({
                timestamp: new Date().toISOString(),
                message: 'Training completed successfully.',
              });
              
              // Find the next pending step and set it to in-progress
              const nextPendingIndex = updatedWorkflow.steps.findIndex(step => step.status === 'pending');
              if (nextPendingIndex !== -1) {
                updatedWorkflow.steps[nextPendingIndex].status = 'in-progress';
                updatedWorkflow.steps[nextPendingIndex].logs.push({
                  timestamp: new Date().toISOString(),
                  message: `Starting ${updatedWorkflow.steps[nextPendingIndex].name.toLowerCase()}...`,
                });
                updatedWorkflow.currentStep = nextPendingIndex + 1;
              }
            }
            
            setWorkflow(updatedWorkflow);
          }
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [workflow]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 h-full w-full bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center">
            <Link href="/workflow" className="mr-2">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-white">Execute Workflow</h1>
          </div>
          <p className="text-gray-400 mt-1">
            {workflow.name} • ID: {workflowId}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
            <Terminal className="mr-2 h-4 w-4" />
            View Logs
          </Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Execution
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Progress Card */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Execution Progress</CardTitle>
              <CardDescription>
                Step {workflow.currentStep} of {workflow.totalSteps}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {workflow.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
                    className={`flex items-center p-3 rounded-lg ${
                      activeStepIndex === index ? 'bg-gray-800/50 border border-gray-700' : ''
                    }`}
                  >
                    <div className="mr-3">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">{step.name}</h3>
                        {getStatusBadge(step.status)}
                      </div>
                      {step.duration && (
                        <p className="text-sm text-gray-400">Duration: {step.duration}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Active Step Logs */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {workflow.steps[activeStepIndex]?.name} Logs
              </CardTitle>
              <CardDescription>
                Real-time execution logs for the current step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300 h-64 overflow-auto">
                {workflow.steps[activeStepIndex]?.logs.length > 0 ? (
                  workflow.steps[activeStepIndex]?.logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="mb-2"
                    >
                      <span className="text-gray-500">[{formatDate(log.timestamp)}]</span> {log.message}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">No logs available for this step yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Workflow Details */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Workflow Details</CardTitle>
              <CardDescription>Information about this workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                <p className="text-white">{workflow.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Priority</h3>
                  <p className="text-white capitalize">{workflow.priority}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Total Steps</h3>
                  <p className="text-white">{workflow.totalSteps}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Start Time</h3>
                  <p className="text-white">{formatDate(workflow.startTime)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Est. End Time</h3>
                  <p className="text-white">{formatDate(workflow.estimatedEndTime)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Resource Usage */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Resource Usage</CardTitle>
              <CardDescription>Current resource utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">CPU</span>
                    <span className="text-white">{workflow.resourceUsage.cpu}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${workflow.resourceUsage.cpu}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-white">{workflow.resourceUsage.memory}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${workflow.resourceUsage.memory}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">GPU</span>
                    <span className="text-white">{workflow.resourceUsage.gpu}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${workflow.resourceUsage.gpu}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Network</span>
                    <span className="text-white">{workflow.resourceUsage.network}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${workflow.resourceUsage.network}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 