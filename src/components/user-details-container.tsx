"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Globe, Phone, Mail, MapPin, Building2, Hash, Navigation, Lightbulb, Handshake } from "lucide-react"
import { gsap } from "gsap"

interface UserDetails {
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

interface UserDetailsContainerProps {
  userId: number
}

export function UserDetailsContainer({ userId }: UserDetailsContainerProps) {
  const [user, setUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        if (!response.ok) {
          throw new Error("User not found")
        }
        const userData = await response.json()
        setUser(userData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  useEffect(() => {
    if (containerRef.current && user) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, x: -50 },
         { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })

      const cards = cardsRef.current?.querySelectorAll(".user-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, delay: 0.3, ease: "back.out(1.7)" },
        )
      }
    }
  }, [user])

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => router.push("/users"),
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading user details...
          </p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            !!
          </div>
          <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
          <p className="text-gray-600">{error || "The requested user could not be found."}</p>
          <Button
            onClick={handleBack}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3 sm:p-6 min-h-screen">
      <div className="space-y-6 sm:space-y-8">
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0"
        >
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-2 text-sm sm:text-lg p-3 sm:p-6 cursor-pointer border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6 mr-2" />
            Back to Users
          </Button>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                {user.name}
              </h1>
              <p className="text-base sm:text-lg text-purple-600 font-medium truncate">@{user.username}</p>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          <Card className="user-card overflow-hidden rounded-lg border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-3 sm:py-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">Name</label>
                <p className="text-lg sm:text-xl font-bold text-gray-900 break-words">{user.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Username
                </label>
                <p className="text-base sm:text-lg font-medium text-gray-700 flex items-center gap-2 break-words">
                  <Hash className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  {user.username}
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="space-y-1 min-w-0 flex-1">
                  <label className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-sm sm:text-lg font-medium text-gray-900 break-words">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 transition-all duration-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-1 flex-shrink-0" />
                <div className="space-y-1 min-w-0 flex-1">
                  <label className="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-sm sm:text-lg font-medium text-gray-900 break-words">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div className="space-y-1 min-w-0 flex-1">
                  <label className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Website
                  </label>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-lg font-medium text-purple-700 hover:text-purple-900 hover:underline transition-colors duration-300 break-words"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="user-card overflow-hidden border-0 shadow-xl bg-gradient-to-br rounded-lg from-green-50 to-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-3 sm:p-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 transition-all duration-300">
                  <label className="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
                    Street
                  </label>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mt-1 break-words">
                    {user.address.street}
                  </p>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
                  <label className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Suite
                  </label>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mt-1 break-words">
                    {user.address.suite}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
                    <label className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide">
                      City
                    </label>
                    <p className="text-base sm:text-lg font-medium text-gray-900 mt-1 break-words">
                      {user.address.city}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-pink-100 to-red-100 hover:from-pink-200 hover:to-red-200 transition-all duration-300">
                    <label className="text-xs sm:text-sm font-semibold text-pink-600 uppercase tracking-wide">
                      Zipcode
                    </label>
                    <p className="text-base sm:text-lg font-medium text-gray-900 mt-1 break-words">
                      {user.address.zipcode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300">
                  <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <label className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                      Geo Location
                    </label>
                    <p className="text-sm sm:text-lg font-medium text-gray-900 mt-1 break-words">
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="user-card xl:col-span-2 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white rounded-lg py-3 sm:py-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 cursor-pointer rounded-xl bg-gradient-to-br from-orange-100 to-red-100 text-center hover:from-orange-200 hover:to-red-200 transition-all duration-300 transform hover:scale-105">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-3" />
                  <label className="text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-wide block">
                    Company Name
                  </label>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-2 break-words">{user.company.name}</p>
                </div>
                <div className="p-4 sm:p-6 cursor-pointer rounded-xl bg-gradient-to-br from-red-100 to-pink-100 text-center hover:from-red-200 hover:to-pink-200 transition-all duration-300 transform hover:scale-105">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <label className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wide block">
                    Catch Phrase
                  </label>
                  <p className="text-sm sm:text-lg text-gray-900 mt-2 font-bold break-words">
                    {user.company.catchPhrase}
                  </p>
                </div>
                <div className="p-4 sm:p-6 cursor-pointer rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-center hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-500 flex items-center justify-center mx-auto mb-3">
                    <Handshake className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <label className="text-xs sm:text-sm font-semibold text-pink-600 uppercase tracking-wide block">
                    Business
                  </label>
                  <p className="text-sm sm:text-lg font-bold text-gray-900 mt-2 capitalize break-words">
                    {user.company.bs}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
