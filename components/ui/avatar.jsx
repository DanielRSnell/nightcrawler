"use client"

import * as React from "react"

import { cn } from "@/lib/utils.ts"

const Avatar = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Avatar.displayName = "Avatar"

export { Avatar }
