import { Suspense } from "react"
import { UserListContainer } from "@/components/user-list-container"
import { UserListSkeleton } from "@/components/user-list-skeleton"

export const metadata = {
  title: "User Management - Dashboard",
  description: "Manage and view user information",
}

export default function UsersPage() {
  return (
    <div className="bg-background">
      <div className="">
        <Suspense fallback={<UserListSkeleton />}>
          <UserListContainer />
        </Suspense>
      </div>
    </div>
  )
}
