"use client"

import { User, Heart, List, Clock, Bell, LogOut } from "lucide-react"

interface PlaylistSidebarProps {
    userName?: string
    userEmail?: string
    activeTab?: "favorites" | "playlists" | "watchlater" | "notifications" | "account"
    onTabChange?: (tab: string) => void
}

export default function PlaylistSidebar({
    userName = "Lê Trường Kỳ",
    userEmail = "kykhung123123@gmail.com",
    activeTab = "playlists",
    onTabChange = () => { },
}: PlaylistSidebarProps) {
    const menuItems = [
        { id: "favorites", label: "Yêu thích", icon: Heart },
        { id: "playlists", label: "Danh sách", icon: List },
        { id: "watchlater", label: "Xem tiếp", icon: Clock },
        { id: "notifications", label: "Thông báo", icon: Bell },
        { id: "account", label: "Tài khoản", icon: User },
    ]

    return (
        <div className="flex flex-col h-full rounded-2xl p-7 w-72" style={{ backgroundColor: "#25272f" }}>
            {/* Header */}


            {/* Menu Items */}
            <nav className="flex-1 space-y-2">
                <div className="pb-6">
                    <h2 className="text-lg font-bold text-white">Quản lý tài khoản</h2>
                </div>
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-out"
                            style={
                                isActive
                                    ? {
                                        backgroundColor: "rgba(255, 216, 117, 0.12)",
                                    }
                                    : {}
                            }
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)"
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "transparent"
                                }
                            }}
                        >
                            <Icon
                                size={20}
                                style={{
                                    color: isActive ? "#FFD875" : "#9ca3af",
                                    transition: "color 0.2s ease-out",
                                }}
                            />
                            <span
                                className="text-sm font-medium transition-colors duration-200"
                                style={{
                                    color: isActive ? "#FFD875" : "#e5e7eb",
                                }}
                            >
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>

            {/* User Info Section */}
            <div className="mt-50">
                {/* Divider */}
                <div className="w-full h-px mb-6" style={{ backgroundColor: "rgba(255, 216, 117, 0.15)" }} />

                {/* User Profile */}
                <div className="flex items-center gap-3 mb-6">
                    {/* Avatar */}
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{
                            backgroundColor: "#FFD875",
                            boxShadow: "0 8px 16px rgba(255, 216, 117, 0.2)",
                        }}
                    >
                        <User size={24} className="text-white" />
                    </div>

                    {/* User Details */}
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{userName}</p>
                        <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out"
                    style={{ color: "#d1d5db" }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 216, 117, 0.12)"
                        e.currentTarget.style.color = "#FFD875"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = "#d1d5db"
                    }}
                >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Thoát</span>
                </button>
            </div>
        </div>
    )
}
