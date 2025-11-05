"use client"

import { useState } from "react"
import PlaylistSidebar from "@/components/users/sidebar"
import PlaylistMainContent from "@/components/users/content"
// 1) Định nghĩa kiểu cho tab để dùng nhất quán
type Tab = "favorites" | "playlists" | "watchlater" | "notifications" | "account"
export default function PlaylistPage() {
    // const [activeTab, setActiveTab] = useState("playlists")
    const [activeTab, setActiveTab] = useState<Tab>("playlists")
    // Sample data - replace with real data
    const playlists = [
        {
            id: "1",
            name: "Phim Yêu Thích",
            movieCount: 12,
            lastUpdated: "Hôm qua",
        },
        {
            id: "2",
            name: "Phim Hành Động",
            movieCount: 8,
            lastUpdated: "2 ngày trước",
        },
        {
            id: "3",
            name: "Phim Kinh Dị",
            movieCount: 5,
            lastUpdated: "1 tuần trước",
        },
    ]

    return (
        <div style={{ backgroundColor: "#0f111a", minHeight: "150vh", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div style={{ maxWidth: "1640px", margin: "0 auto", padding: "0 20px", height: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "40px",
                        height: "100%"
                    }}
                >
                    {/* Sidebar */}
                    <div style={{ width: "280px", flexShrink: 0 }}>
                        <PlaylistSidebar
                            activeTab={activeTab}
                            onTabChange={(tab) => setActiveTab(tab as Tab)}
                        />
                    </div>

                    {/* Main Content */}
                    <div style={{ flexGrow: 1 }}>
                        <PlaylistMainContent
                            playlists={activeTab === "playlists" ? playlists : []}
                            title={
                                activeTab === "favorites" ? "Yêu thích" : activeTab === "watchlater" ? "Danh sách xem tiếp" : activeTab === "notifications" ? "Thông báo" : activeTab === "account" ? "Tài khoản" : "Danh sách"
                            }
                            isEmpty={activeTab === "playlists" ? false : true}
                            emptyMessage={activeTab === "favorites" ? "Bạn chưa có phim yêu thích nào" : activeTab === "watchlater" ? "Bạn chưa có danh sách xem tiếp nào" : activeTab === "notifications" ? "Bạn chưa có thông báo nào" : activeTab === "account" ? "Quản lý tài khoản của bạn" : "Bạn chưa có danh sách nào"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
