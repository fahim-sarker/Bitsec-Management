import type { User } from "@/types/user"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)

    if (!response.ok) {
      throw new ApiError(`Failed to fetch users: ${response.statusText}`, response.status)
    }

    const users: User[] = await response.json()
    return users
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error", 500)
  }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`)

    if (!response.ok) {
      throw new ApiError(`Failed to fetch user: ${response.statusText}`, response.status)
    }

    const user: User = await response.json()
    return user
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error occurred while fetching user", 500)
  }
}

// Utility functions for client-side filtering and pagination
export function filterUsers(users: User[], searchTerm: string): User[] {
  if (!searchTerm.trim()) return users

  const term = searchTerm.toLowerCase()
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term),
  )
}

export function paginateUsers(users: User[], page: number, limit: number) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    users: users.slice(startIndex, endIndex),
    total: users.length,
    page,
    limit,
    totalPages: Math.ceil(users.length / limit),
  }
}
