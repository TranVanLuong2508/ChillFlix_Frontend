"use client"

import { Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { UploadAvt } from "./upload/upload"
import { AvatarUser } from "./upload/avatar"

interface AuthUser {
    userId: number
    email: string
    roleId: number
    fullName: string
    genderCode: string
    isVip: boolean
    statusCode: string
}

export default function ProfileRight() {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [tempName, setTempName] = useState("")
    const [selectedGender, setSelectedGender] = useState("U")
    const [avtUrl, setAvtUrl] = useState("");

    useEffect(() => {
        try {
            const stateData = localStorage.getItem("auth-storage")
            if (stateData) {
                const parsed = JSON.parse(stateData)
                const user = parsed.state?.authUser || parsed.authUser || parsed
                setAuthUser(user)
                setTempName(user.fullName || "")
                setSelectedGender(user.genderCode || "U")
            }
        } catch (error) {
            console.error("Error loading auth data:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleSave = () => {
        if (tempName.trim() && authUser) {
            const updatedUser = {
                ...authUser,
                fullName: tempName.trim(),
                genderCode: selectedGender,
                avatarUrl: avtUrl,
            }
            localStorage.setItem("authUser", JSON.stringify(updatedUser))
            setAuthUser(updatedUser)
            setIsEditing(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex-1 p-8">
                <div className="text-center text-gray-400">Đang tải dữ liệu...</div>
            </div>
        )
    }

    if (!authUser) {
        return (
            <div className="flex-1 p-8">
                <div className="text-center text-gray-400">Không có dữ liệu người dùng</div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-8 flex flex-col">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tài khoản</h1>
                    <p className="text-gray-400">Cập nhật thông tin tài khoản</p>
                </div>
                <button
                    onClick={() => {
                        if (isEditing) {
                            setTempName(authUser.fullName || "")
                            setSelectedGender(authUser.genderCode || "U")
                        }
                        setIsEditing(!isEditing)
                    }}
                    className="px-6 py-2 rounded-lg font-medium transition-all"
                    style={{
                        backgroundColor: isEditing ? "#dc2626" : "#FFD875",
                        color: isEditing ? "#ffffff" : "#1a1d24",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1"
                    }}
                >
                    {isEditing ? "Hủy" : "Chỉnh sửa"}
                </button>
            </div>

            {/* Main Content */}
            <div className="flex gap-8 flex-1">
                {/* Left: Form */}
                <div className="flex-1">
                    {/* Email Section */}
                    <div className="mb-8">
                        <label className="block text-gray-400 text-sm mb-3">Email</label>
                        <div
                            className="px-4 py-3 rounded-lg border text-white"
                            style={{
                                backgroundColor: "#1a1d24",
                                borderColor: "rgba(255, 216, 117, 0.1)",
                            }}
                        >
                            {authUser.email}
                        </div>
                    </div>

                    {/* Display Name Section */}
                    <div className="mb-8">
                        <label className="block text-gray-400 text-sm mb-3">Tên hiển thị</label>
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border text-white bg-[#1a1d24] focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                            style={{
                                borderColor: "rgba(255, 216, 117, 0.1)",
                            }}
                        />
                    </div>

                    {/* Gender Section */}
                    <div className="mb-8">
                        <label className=" block text-gray-400 text-sm mb-4">Giới tính</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="M"
                                    checked={selectedGender === "M"}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    className="w-4 h-4 disabled:opacity-50"
                                />
                                <label htmlFor="male" className="text-gray-300 text-sm cursor-pointer">
                                    Nam
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="F"
                                    checked={selectedGender === "F"}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    className="w-4 h-4 disabled:opacity-50"
                                />
                                <label htmlFor="female" className="text-gray-300 text-sm cursor-pointer">
                                    Nữ
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="U"
                                    checked={selectedGender === "U"}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    className="w-4 h-4 disabled:opacity-50"
                                />
                                <label htmlFor="other" className="text-gray-300 text-sm cursor-pointer">
                                    Không xác định
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 rounded-lg font-medium transition-all duration-200"
                        style={{
                            backgroundColor: "#FFD875",
                            color: "#1a1d24",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.9"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1"
                        }}
                    >
                        Cập nhật
                    </button>

                    {/* Set Password Info */}
                    <div className="mt-8 pt-8 border-t" style={{ borderColor: "rgba(255, 216, 117, 0.1)" }}>
                        <p className="text-gray-400 text-sm">
                            Đặt mật khẩu khác, nhấn vào <span className="text-[#FFD875] cursor-pointer hover:underline ">đây</span>
                        </p>
                    </div>
                </div>

                {/* Right: Avatar */}
                <AvatarUser setAvtUrl={setAvtUrl} imageUrl={avtUrl || authUser?.avatarUrl || '/images/vn_flag.svg'} />
            </div>
        </div>
    )
}
