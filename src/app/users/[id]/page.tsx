import { Suspense } from "react"
import { UserDetailsContainer } from "@/components/user-details-container"
import { UserDetailsSkeleton } from "@/components/user-details-skeleton"

interface UserDetailsPageProps {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: "User Details - Dashboard",
  description: "View detailed user information",
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params
  const userId = Number.parseInt(id)

  if (isNaN(userId)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Invalid User ID
          </h1>
          <p className="text-muted-foreground">
            The user ID provided is not valid.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="">
        <Suspense fallback={<UserDetailsSkeleton />}>
          <UserDetailsContainer userId={userId} />
        </Suspense>
      </div>
    </div>
  )
}
