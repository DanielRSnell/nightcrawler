'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { WorkflowSidebar } from '@/components/workflow/workflow-sidebar';

interface WorkflowLayoutProps {
  children: React.ReactNode;
}

export default function WorkflowLayout({ children }: WorkflowLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WorkflowSidebar />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 overflow-auto p-6 mx-auto w-full"
      >
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 