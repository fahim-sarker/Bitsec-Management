"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight, Users, Building2, Mail, Phone } from "lucide-react"
import { gsap } from "gsap"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export function UserListContainer() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const usersPerPage = 5

  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (containerRef.current && !loading) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      gsap.fromTo(
        searchRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out" },
      )

      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" },
      )
    }
  }, [loading])

  useEffect(() => {
    if (tableRef.current && currentUsers.length > 0) {
      const rows = tableRef.current.querySelectorAll("tbody tr")
      gsap.fromTo(rows, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" })
    }
  }, [currentUsers])

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserClick = (user: User) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => router.push(`/users/${user.id}`),
    })
  }

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm, users])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div
            className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r 
          from-blue-500 to-purple-600 border-t-transparent"
          ></div>
          <div
            className="absolute inset-0 rounded-full h-12 w-12 border-4 border-gradient-to-r from-purple-500 to-pink-500 border-t-transparent animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="space-y-8 px-3 py-6 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage and explore user profiles</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-200 text-blue-700 cursor-pointer text-lg sm:text-xl font-semibold">
            <Users className="h-4 w-4 sm:h-6 sm:w-6" />
            {filteredUsers.length} Users
          </div>
        </div>
      </div>

      <div ref={searchRef} className="relative max-w-md">
        <div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 
        rounded-md bg-gradient-to-r from-blue-500 to-purple-600"
        >
          <Search className="h-4 w-4 text-white" />
        </div>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 border-2 border-gray-300 bg-gradient-to-r 
          from-blue-50"
        />
      </div>

      <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="min-w-[800px] w-full">
            <table ref={tableRef} className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="text-left p-4 sm:p-6 font-semibold">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="whitespace-nowrap">NAME</span>
                    </div>
                  </th>
                  <th className="text-left p-4 sm:p-6 font-semibold">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="whitespace-nowrap">EMAIL</span>
                    </div>
                  </th>
                  <th className="text-left p-4 sm:p-6 font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="whitespace-nowrap">PHONE</span>
                    </div>
                  </th>
                  <th className="text-left p-4 sm:p-6 font-semibold">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="whitespace-nowrap">COMPANY</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md"
                    onClick={() => handleUserClick(user)}
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(90deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%)"
                          : "white",
                    }}
                  >
                    <td className="p-4 sm:p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 whitespace-nowrap">{user.name}</div>
                          <div className="text-sm text-purple-600 font-medium whitespace-nowrap">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <div className="text-gray-700 font-medium whitespace-nowrap">{user.email}</div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <div className="text-gray-700 font-medium whitespace-nowrap">{user.phone}</div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium whitespace-nowrap">{user.company.name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {totalPages > 1 && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-blue-200 
        to-purple-100 rounded-xl"
        >
          <p className="text-lg sm:text-xl font-medium text-gray-700 text-center sm:text-left">
            Showing <span className="text-blue-600 font-bold">{indexOfFirstUser + 1}</span> to{" "}
            <span className="text-purple-600 font-bold">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{" "}
            <span className="text-pink-600 font-bold">{filteredUsers.length}</span> users
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-blue-200 text-base sm:text-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 p-3 sm:p-5 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            <div className="px-3 sm:px-4 py-2 sm:py-[9px] bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-base sm:text-lg whitespace-nowrap">
              {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-purple-200 text-base sm:text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 cursor-pointer p-3 sm:p-5"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
