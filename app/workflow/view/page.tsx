'use client';

import { useEffect, useState } from 'react';
import { WorkflowView } from '@/components/workflow/view';

export default function WorkflowViewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a simple loading state or skeleton that matches the structure
    return <div className="flex h-screen"></div>;
  }

  return <WorkflowView />;
} 