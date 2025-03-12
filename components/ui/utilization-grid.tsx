'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface UtilizationGridProps {
  title?: string;
  description?: string;
  data?: number[];
  days?: number;
  columns?: number;
  className?: string;
  cardClassName?: string;
  showTooltip?: boolean;
}

export function UtilizationGrid({
  title = 'CPU Core Utilization',
  description = 'Daily utilization for the past year',
  data,
  days = 364,
  columns = 52, // 52 weeks in a year (7 rows x 52 columns = 364 days)
  className,
  cardClassName,
  showTooltip = true
}: UtilizationGridProps) {
  // Generate random data if none provided
  const [utilizationData, setUtilizationData] = React.useState<number[]>([]);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  
  React.useEffect(() => {
    if (data) {
      setUtilizationData(data);
    } else {
      // Generate random utilization data for the past 365 days with a more realistic pattern
      const newData = Array.from({ length: days }, () => {
        // 40% chance of very low or no utilization (0-5%)
        if (Math.random() < 0.4) {
          return Math.floor(Math.random() * 5);
        }
        
        // 40% chance of low to medium utilization (5-40%)
        if (Math.random() < 0.7) {
          return Math.floor(Math.random() * 35) + 5;
        }
        
        // 20% chance of medium to high utilization (40-100%)
        return Math.floor(Math.random() * 60) + 40;
      });
      
      setUtilizationData(newData);
    }
  }, [data, days]);

  // Calculate level for each cell (0-5)
  const getLevelForValue = (value: number) => {
    if (value < 5) return 0;   // Almost no activity (dark gray)
    if (value < 25) return 1;  // Low activity (green)
    if (value < 50) return 2;  // Medium-low activity (light green-yellow)
    if (value < 75) return 3;  // Medium activity (yellow)
    if (value < 85) return 4;  // High activity (orange-red)
    return 5;                  // Very high activity (bright red)
  };

  // Get Tailwind color class based on level
  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-800';
      case 1: return 'bg-green-600/80';
      case 2: return 'bg-green-500/90';
      case 3: return 'bg-yellow-500/90';
      case 4: return 'bg-orange-500/90';
      case 5: return 'bg-red-600/90';
      default: return 'bg-gray-800';
    }
  };

  // Generate date for a specific day (counting backwards from today)
  const getDateForDay = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  };

  // Format date for tooltip
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Generate month labels for the top of the grid
  const generateMonthLabels = () => {
    const months = [];
    const today = new Date();
    
    // Go back 365 days
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    
    // Get the first day of each month in the range
    let currentMonth = startDate.getMonth();
    let currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      if (currentDate.getMonth() !== currentMonth) {
        months.push({
          name: currentDate.toLocaleDateString('en-US', { month: 'short' }),
          index: Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        });
        currentMonth = currentDate.getMonth();
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return months;
  };

  const monthLabels = React.useMemo(() => generateMonthLabels(), [days]);

  return (
    <Card className={cn("border-border/40 bg-black", cardClassName)}>
      <CardHeader className="pb-2">
        {title && <CardTitle className="text-2xl font-medium">{title}</CardTitle>}
        {description && <CardDescription className="text-gray-400 text-base">{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* Month labels */}
        <div className="flex text-xs text-gray-400 mb-1 pl-8">
          {monthLabels.map((month, i) => (
            <div 
              key={i} 
              className="flex-shrink-0"
              style={{ 
                position: 'relative', 
                left: `${(month.index / days) * 100}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {month.name}
            </div>
          ))}
        </div>
        
        {/* Day of week labels */}
        <div className="flex">
          <div className="text-xs text-gray-400 pr-2 flex flex-col justify-around h-[120px]">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>
          
          <div className="flex-1">
            <div 
              className="grid gap-1" 
              style={{ 
                gridTemplateColumns: `repeat(${columns}, minmax(10px, 1fr))`,
                gridTemplateRows: 'repeat(7, 1fr)',
                height: '120px'
              }}
            >
              {utilizationData.map((value, index) => {
                const level = getLevelForValue(value);
                const colorClass = getColorClass(level);
                
                return (
                  <div 
                    key={index}
                    className={cn(
                      "aspect-square rounded-sm border border-gray-800/50 transition-all duration-200",
                      colorClass,
                      "hover:scale-110 hover:z-10 hover:shadow-md hover:border-gray-600 relative"
                    )}
                    onMouseEnter={() => setHoveredDay(index)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {showTooltip && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none opacity-0 hover:opacity-100 whitespace-nowrap z-20 border border-gray-700 transition-opacity">
                        {formatDate(getDateForDay(days - index - 1))}: {value}% utilized
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end">
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-400">Low</span>
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <div 
                key={level} 
                className={cn(
                  "w-2.5 h-2.5 rounded-sm mx-0.5 border border-gray-800/50",
                  getColorClass(level)
                )}
              ></div>
            ))}
            <span className="ml-2 text-xs text-gray-400">High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 