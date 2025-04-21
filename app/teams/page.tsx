'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Calendar, Plus, Users, User, UserPlus, Settings, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TeamsPage() {
  const { user } = useAuthStore();
  const currentDate = new Date();
  
  // Format date for the page
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Define all teams data centrally to pass to components
  const teamsData = {
    // Summary data
    summary: {
      totalTeams: 6,
      totalMembers: 42,
      activeProjects: 18,
      resourceAllocation: 1720,
    },
    
    // Teams data
    teams: [
      {
        id: 'team-1',
        name: 'ML Research',
        description: 'Focused on cutting-edge machine learning research',
        memberCount: 12,
        lead: {
          id: 'user-101',
          name: 'Dr. Sarah Chen',
          email: 'sarah.chen@example.com',
          avatar: '/avatars/sarah-chen.jpg',
          role: 'Research Director',
        },
        resourceAllocation: 780,
        activeProjects: 5,
        tags: ['research', 'high-priority', 'ml-models'],
        createdAt: '2022-09-15',
      },
      {
        id: 'team-2',
        name: 'Production Inference',
        description: 'Manages production ML inference systems',
        memberCount: 8,
        lead: {
          id: 'user-102',
          name: 'Michael Rodriguez',
          email: 'michael.r@example.com',
          avatar: '/avatars/michael-rodriguez.jpg',
          role: 'Engineering Lead',
        },
        resourceAllocation: 520,
        activeProjects: 4,
        tags: ['production', 'inference', 'sre'],
        createdAt: '2022-10-05',
      },
      {
        id: 'team-3',
        name: 'Data Engineering',
        description: 'Builds and maintains data pipelines and infrastructure',
        memberCount: 10,
        lead: {
          id: 'user-103',
          name: 'Priya Sharma',
          email: 'priya.s@example.com',
          avatar: '/avatars/priya-sharma.jpg',
          role: 'Data Engineering Manager',
        },
        resourceAllocation: 250,
        activeProjects: 6,
        tags: ['data-pipelines', 'infrastructure'],
        createdAt: '2022-11-12',
      },
      {
        id: 'team-4',
        name: 'Platform Team',
        description: 'Develops and maintains the ML platform',
        memberCount: 7,
        lead: {
          id: 'user-104',
          name: 'James Wilson',
          email: 'james.w@example.com',
          avatar: '/avatars/james-wilson.jpg',
          role: 'Platform Architect',
        },
        resourceAllocation: 120,
        activeProjects: 3,
        tags: ['platform', 'infrastructure', 'devops'],
        createdAt: '2025-01-20',
      },
      {
        id: 'team-5',
        name: 'Applied AI',
        description: 'Applies ML models to solve business problems',
        memberCount: 5,
        lead: {
          id: 'user-105',
          name: 'Emma Johnson',
          email: 'emma.j@example.com',
          avatar: '/avatars/emma-johnson.jpg',
          role: 'AI Solutions Lead',
        },
        resourceAllocation: 50,
        activeProjects: 2,
        tags: ['applied-ai', 'business-solutions'],
        createdAt: '2025-03-08',
      },
    ],
    
    // Recent team activities
    recentActivities: [
      {
        id: 'act-2001',
        teamId: 'team-1',
        teamName: 'ML Research',
        action: 'member-added',
        details: 'Added Dr. Alex Kim as Senior Research Scientist',
        timestamp: '2025-06-12T10:15:30Z',
        user: 'sarah.chen@example.com',
      },
      {
        id: 'act-2002',
        teamId: 'team-2',
        teamName: 'Production Inference',
        action: 'resource-allocation',
        details: 'Increased GPU allocation by 120 units',
        timestamp: '2025-06-11T15:45:22Z',
        user: 'michael.r@example.com',
      },
      {
        id: 'act-2003',
        teamId: 'team-3',
        teamName: 'Data Engineering',
        action: 'project-created',
        details: 'Created new project: "Real-time Feature Store"',
        timestamp: '2025-06-10T09:30:15Z',
        user: 'priya.s@example.com',
      },
      {
        id: 'act-2004',
        teamId: 'team-4',
        teamName: 'Platform Team',
        action: 'permission-changed',
        details: 'Updated access permissions for production environments',
        timestamp: '2025-06-09T14:20:45Z',
        user: 'james.w@example.com',
      },
    ],
    
    // Team members (sample for one team)
    teamMembers: {
      'team-1': [
        {
          id: 'user-101',
          name: 'Dr. Sarah Chen',
          email: 'sarah.chen@example.com',
          avatar: '/avatars/sarah-chen.jpg',
          role: 'Research Director',
          joinDate: '2022-09-15',
        },
        {
          id: 'user-106',
          name: 'Dr. Alex Kim',
          email: 'alex.kim@example.com',
          avatar: '/avatars/alex-kim.jpg',
          role: 'Senior Research Scientist',
          joinDate: '2025-06-12',
        },
        {
          id: 'user-107',
          name: 'Lisa Patel',
          email: 'lisa.p@example.com',
          avatar: '/avatars/lisa-patel.jpg',
          role: 'ML Engineer',
          joinDate: '2022-10-05',
        },
        {
          id: 'user-108',
          name: 'David Zhang',
          email: 'david.z@example.com',
          avatar: '/avatars/david-zhang.jpg',
          role: 'Research Scientist',
          joinDate: '2022-11-15',
        },
        {
          id: 'user-109',
          name: 'Olivia Brown',
          email: 'olivia.b@example.com',
          avatar: '/avatars/olivia-brown.jpg',
          role: 'Data Scientist',
          joinDate: '2025-01-10',
        },
      ],
    },
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
            <h1 className="text-3xl font-bold tracking-tight text-white">Team Management</h1>
            <p className="text-gray-400 mt-1">Manage teams, members, and resource allocations</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Team
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
              <CardDescription>Total Teams</CardDescription>
              <CardTitle className="text-2xl">{teamsData.summary.totalTeams}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Team Members</CardDescription>
              <CardTitle className="text-2xl">{teamsData.summary.totalMembers}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Active Projects</CardDescription>
              <CardTitle className="text-2xl">{teamsData.summary.activeProjects}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription>Resource Allocation</CardDescription>
              <CardTitle className="text-2xl">{teamsData.summary.resourceAllocation} units</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="mb-6 bg-gray-900/50">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teams">
            <div className="grid grid-cols-1 gap-6">
              {teamsData.teams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-gray-400" />
                            {team.name}
                          </CardTitle>
                          <CardDescription>{team.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="info">
                            {team.memberCount} members
                          </Badge>
                          <Badge variant="success">
                            {team.activeProjects} projects
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center p-3 bg-gray-800/50 /50 rounded-lg">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={team.lead.avatar} alt={team.lead.name} />
                            <AvatarFallback>{team.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{team.lead.name}</div>
                            <div className="text-sm text-gray-400">{team.lead.role} • Team Lead</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col p-3 bg-gray-800/50 /30 rounded-lg">
                            <span className="text-sm text-gray-400">Resource Allocation</span>
                            <span className="text-xl font-medium text-white">{team.resourceAllocation} units</span>
                          </div>
                          <div className="flex flex-col p-3 bg-gray-800/50 /30 rounded-lg">
                            <span className="text-sm text-gray-400">Created</span>
                            <span className="text-xl font-medium text-white">{team.createdAt}</span>
                          </div>
                          <div className="flex flex-col p-3 bg-gray-800/50 /30 rounded-lg">
                            <span className="text-sm text-gray-400">Members</span>
                            <span className="text-xl font-medium text-white">{team.memberCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {team.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-gray-800/50 /50 text-gray-300 rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        <User className="h-4 w-4 mr-2" />
                        View Members
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Team
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>ML Research Team Members</CardTitle>
                      <CardDescription>Manage team members and roles</CardDescription>
                    </div>
                    <Button size="sm" className="bg-gray-800/50  hover:bg-gray-700 text-white">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamsData.teamMembers['team-1'].map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {member.id === 'user-101' && (
                            <Badge variant="success">Team Lead</Badge>
                          )}
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Team Activity Log</CardTitle>
                  <CardDescription>Recent team management activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamsData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                        <div className="mr-4 p-2 bg-gray-800/50 /50 rounded-full">
                          {activity.action === 'member-added' && <UserPlus className="h-5 w-5 text-green-400" />}
                          {activity.action === 'resource-allocation' && <Activity className="h-5 w-5 text-blue-400" />}
                          {activity.action === 'project-created' && <Plus className="h-5 w-5 text-yellow-400" />}
                          {activity.action === 'permission-changed' && <Shield className="h-5 w-5 text-purple-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-white">{activity.teamName}</h3>
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
        </Tabs>
      </motion.div>
    </div>
  );
} 