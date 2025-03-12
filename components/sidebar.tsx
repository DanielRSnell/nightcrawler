'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Server, 
  Cpu, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Silicon Pools',
    href: '/dashboard/pools',
    icon: Server,
  },
  {
    title: 'Workflows',
    href: '/dashboard/workflows',
    icon: Cpu,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
         
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
               <div className="relative h-8 w-[90%]">
            <img 
              src="/assets/logo-dark-bg.svg" 
              alt="Nightcrawler Logo" 
              className="h-full w-full"
            />
          </div>
            </motion.div>
          )}
        </div>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto"
          >
          <div className="relative h-6 w-8">
            <img 
              src="/assets/dark-bg-icon.svg" 
              alt="Nightcrawler Logo" 
              className="h-full w-full"
            />
          </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
      
      {/* Theme Toggle */}
      <div className="px-4 py-2">
        <ThemeToggle collapsed={collapsed} />
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          {!collapsed && <div className="text-xs text-sidebar-foreground/60">v1.0.0</div>}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            onClick={logout}
            className={cn(
              "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              collapsed && "mx-auto"
            )}
          >
            <LogOut size={18} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
