import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back button skeleton */}
      <Skeleton className="h-10 w-32" />

      {/* Header skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Content cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Company card skeleton */}
      <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
