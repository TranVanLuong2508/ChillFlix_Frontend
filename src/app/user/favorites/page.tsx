"use client"

import { useEffect, useState } from "react"
import PlaylistSidebar from "@/components/users/sidebar"
import ProfileRight from "@/components/users/profile-right"

export default function ProfilePage() {
  const [userData, setUserData] = useState({ fullName: "User", email: "user@example.com" })

  useEffect(() => {
    const authUser = localStorage.getItem("auth-storage")
    if (authUser) {
      const user = JSON.parse(authUser)
      console.log(user.state.authUser)

      setUserData({
        fullName: user.state.authUser.fullName || "User",
        email: user.state.authUser.email || "user@example.com",
      })
    }
  }, [])

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#1a1d24" }}>
      <div className="flex gap-8 max-w-7xl mx-auto">
        <PlaylistSidebar userName={userData.fullName} userEmail={userData.email} />
        <ProfileRight />
      </div>
    </div>
  )
}
