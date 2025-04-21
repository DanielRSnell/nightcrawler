'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Calendar, Save, User, Bell, Shield, Database, Globe, Key, Moon, Sun, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const currentDate = new Date();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  
  // Format date for the page
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Mock user profile data
  const profileData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: '/avatars/alex-johnson.jpg',
    role: 'Senior ML Engineer',
    team: 'ML Research',
    joinDate: '2022-08-15',
    bio: 'Experienced machine learning engineer focused on developing and deploying large-scale ML systems. Passionate about optimizing compute resources and building efficient training pipelines.',
  };

  // Mock notification settings
  const notificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    resourceAlerts: true,
    weeklyReports: true,
    maintenanceAlerts: true,
    teamUpdates: true,
  };

  // Mock security settings
  const securitySettings = {
    twoFactorAuth: true,
    lastPasswordChange: '2025-05-10',
    sessionTimeout: 60,
    ipRestrictions: false,
    apiTokens: [
      {
        id: 'token-1',
        name: 'Development API',
        created: '2025-04-15',
        lastUsed: '2025-06-12',
        scopes: ['read', 'write'],
      },
      {
        id: 'token-2',
        name: 'Monitoring Integration',
        created: '2025-05-20',
        lastUsed: '2025-06-13',
        scopes: ['read'],
      },
    ],
  };

  // Mock appearance settings
  const appearanceSettings = {
    theme: 'dark',
    density: 'comfortable',
    animationsEnabled: true,
    codeHighlighting: true,
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
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
            <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account and application preferences</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </header>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 bg-gray-900/50">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                        <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={profileData.name} className="bg-gray-800/50  border-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={profileData.email} className="bg-gray-800/50  border-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" defaultValue={profileData.role} className="bg-gray-800/50  border-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="team">Team</Label>
                          <Select defaultValue={profileData.team}>
                            <SelectTrigger className="bg-gray-800/50  border-gray-700">
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800/50  border-gray-700">
                              <SelectItem value="ML Research">ML Research</SelectItem>
                              <SelectItem value="Production Inference">Production Inference</SelectItem>
                              <SelectItem value="Data Engineering">Data Engineering</SelectItem>
                              <SelectItem value="Platform Team">Platform Team</SelectItem>
                              <SelectItem value="Applied AI">Applied AI</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          defaultValue={profileData.bio} 
                          className="bg-gray-800/50  border-gray-700 min-h-[120px]" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <Switch checked={notificationSettings.emailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                      </div>
                      <Switch checked={notificationSettings.pushNotifications} />
                    </div>
                    
                    <div className="pt-6 border-t border-gray-800">
                      <h3 className="text-lg font-medium text-white mb-4">Notification Types</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Resource Alerts</Label>
                            <p className="text-sm text-gray-400">Notifications about resource usage and limits</p>
                          </div>
                          <Switch checked={notificationSettings.resourceAlerts} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Weekly Reports</Label>
                            <p className="text-sm text-gray-400">Weekly summary of your team's activity</p>
                          </div>
                          <Switch checked={notificationSettings.weeklyReports} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Maintenance Alerts</Label>
                            <p className="text-sm text-gray-400">Notifications about scheduled maintenance</p>
                          </div>
                          <Switch checked={notificationSettings.maintenanceAlerts} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Team Updates</Label>
                            <p className="text-sm text-gray-400">Notifications about team changes and activities</p>
                          </div>
                          <Switch checked={notificationSettings.teamUpdates} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={securitySettings.twoFactorAuth} />
                        {securitySettings.twoFactorAuth && (
                          <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                            Configure
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">IP Restrictions</Label>
                        <p className="text-sm text-gray-400">Restrict access to specific IP addresses</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={securitySettings.ipRestrictions} />
                        {securitySettings.ipRestrictions && (
                          <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                            Configure
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id="session-timeout" 
                            type="number" 
                            defaultValue={securitySettings.sessionTimeout} 
                            className="bg-gray-800/50  border-gray-700 w-24" 
                          />
                          <span className="text-gray-400">minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="text-gray-400 border-gray-700">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <p className="text-sm text-gray-400 mt-2">
                        Last changed: {securitySettings.lastPasswordChange}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>API Tokens</CardTitle>
                  <CardDescription>Manage your API tokens for external integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securitySettings.apiTokens.map((token) => (
                      <div key={token.id} className="flex items-start justify-between p-3 border border-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{token.name}</div>
                          <div className="text-sm text-gray-400">Created: {token.created}</div>
                          <div className="text-sm text-gray-400">Last used: {token.lastUsed}</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {token.scopes.map((scope) => (
                              <span 
                                key={scope} 
                                className="px-2 py-1 bg-gray-800/50 /50 text-gray-300 rounded-md text-xs"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-400 border-gray-700 hover:bg-red-900/20 hover:text-red-300">
                          Revoke
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="text-gray-400 border-gray-700 w-full mt-4">
                      Generate New Token
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how Nightcrawler looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base mb-3 block">Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div 
                          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border cursor-pointer ${
                            theme === 'light' 
                              ? 'border-blue-500 bg-gray-800/50 /50' 
                              : 'border-gray-700 bg-gray-900/30 hover:bg-gray-800/50 /30'
                          }`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-6 w-6 text-yellow-400" />
                          <span className="text-sm font-medium">Light</span>
                        </div>
                        
                        <div 
                          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border cursor-pointer ${
                            theme === 'dark' 
                              ? 'border-blue-500 bg-gray-800/50 /50' 
                              : 'border-gray-700 bg-gray-900/30 hover:bg-gray-800/50 /30'
                          }`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-6 w-6 text-blue-400" />
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                        
                        <div 
                          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border cursor-pointer ${
                            theme === 'system' 
                              ? 'border-blue-500 bg-gray-800/50 /50' 
                              : 'border-gray-700 bg-gray-900/30 hover:bg-gray-800/50 /30'
                          }`}
                          onClick={() => setTheme('system')}
                        >
                          <Laptop className="h-6 w-6 text-gray-400" />
                          <span className="text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Enable Animations</Label>
                          <p className="text-sm text-gray-400">Use animations throughout the interface</p>
                        </div>
                        <Switch checked={appearanceSettings.animationsEnabled} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Code Syntax Highlighting</Label>
                          <p className="text-sm text-gray-400">Highlight syntax in code blocks</p>
                        </div>
                        <Switch checked={appearanceSettings.codeHighlighting} />
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="density">Interface Density</Label>
                        <Select defaultValue={appearanceSettings.density}>
                          <SelectTrigger className="bg-gray-800/50  border-gray-700">
                            <SelectValue placeholder="Select density" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800/50  border-gray-700">
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                            <SelectItem value="spacious">Spacious</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue={appearanceSettings.timezone}>
                          <SelectTrigger className="bg-gray-800/50  border-gray-700">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800/50  border-gray-700">
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue={appearanceSettings.dateFormat}>
                          <SelectTrigger className="bg-gray-800/50  border-gray-700">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800/50  border-gray-700">
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-green-600/30 border border-1 border-green-600  hover:bg-green-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* API Tab */}
          <TabsContent value="api">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Access the Nightcrawler API for automation and integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-800/50 /50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">API Base URL</h3>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 p-2 bg-gray-900 rounded text-gray-300 font-mono text-sm">
                        https://api.nightcrawler.example.com/v1
                      </code>
                      <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Available Endpoints</h3>
                    
                    <div className="space-y-2">
                      <div className="p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-medium mr-2">GET</span>
                          <code className="font-mono text-sm text-gray-300">/workflows</code>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">List all workflows</p>
                      </div>
                      
                      <div className="p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-medium mr-2">POST</span>
                          <code className="font-mono text-sm text-gray-300">/workflows</code>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Create a new workflow</p>
                      </div>
                      
                      <div className="p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-medium mr-2">GET</span>
                          <code className="font-mono text-sm text-gray-300">/silicon/allocation</code>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Get silicon allocation details</p>
                      </div>
                      
                      <div className="p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-medium mr-2">PUT</span>
                          <code className="font-mono text-sm text-gray-300">/teams/{'{team_id}'}</code>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Update team information</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="text-gray-400 border-gray-700">
                      <Globe className="h-4 w-4 mr-2" />
                      View Full API Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 