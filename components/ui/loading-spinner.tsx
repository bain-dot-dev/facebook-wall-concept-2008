import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin", className)} />
  )
}
