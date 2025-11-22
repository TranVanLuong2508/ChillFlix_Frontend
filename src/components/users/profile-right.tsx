"use client";

import { useState, useEffect } from "react";
import { AvatarUser } from "./upload/avatar";
import { useAuthStore } from "@/stores/authStore";
import { userServices } from "@/services";
import { toast } from "sonner";
import { AuthenticationsMessage } from "@/constants/messages/user.message";

export default function ProfileRight() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingAvt, setIsUpdatingAvt] = useState(false);
  const [tempName, setTempName] = useState("");
  const [selectedGender, setSelectedGender] = useState("O");
  const [avtUrl, setAvtUrl] = useState("");

  const { authUser, isAuthenticated, setAuthUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && authUser) {
      setTempName(authUser.fullName || "");
      setAvtUrl(authUser.avatarUrl);
      setSelectedGender(authUser.genderCode || "O");
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const handleSave = async () => {
    if (tempName.trim() && authUser) {
      const updatedUser: any = {
        userId: authUser.userId,
        fullName: tempName.trim(),
        genderCode: selectedGender,
        avatarUrl: avtUrl,
      };
      try {
        console.log("Check user", updatedUser);
        const res = await userServices.CallUpdateProfile(updatedUser);
        console.log("check res", res);
        if (res && res.EC === 1) {
          setAuthUser(updatedUser);
          await new Promise((r) => setTimeout(r, 500));
          toast.success(AuthenticationsMessage.updateSucess);
        } else {
          await new Promise((r) => setTimeout(r, 500));
          toast.error(AuthenticationsMessage.updateError);
        }
      } catch (error) {
        console.log("error from profile Right Component: ", error);
        toast.error(AuthenticationsMessage.updateError);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div className="text-center text-gray-400">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex-1 p-8">
        <div className="text-center text-gray-400">
          Không có dữ liệu người dùng
        </div>
      </div>
    );
  }

  console.log("check avt", avtUrl);

  return (
    <div className="flex-1 p-8 flex flex-col">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tài khoản</h1>
          <p className="text-gray-400">Cập nhật thông tin tài khoản</p>
        </div>
      </div>

      <div className="flex gap-8 flex-1">
        <div className="flex-1">
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

          <div className="mb-8">
            <label className="block text-gray-400 text-sm mb-3">
              Tên hiển thị
            </label>
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

          <div className="mb-8">
            <label className=" block text-gray-400 text-sm mb-4">
              Giới tính
            </label>
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
                <label
                  htmlFor="male"
                  className="text-gray-300 text-sm cursor-pointer"
                >
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
                <label
                  htmlFor="female"
                  className="text-gray-300 text-sm cursor-pointer"
                >
                  Nữ
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="O"
                  checked={selectedGender === "O"}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-4 h-4 disabled:opacity-50"
                />
                <label
                  htmlFor="other"
                  className="text-gray-300 text-sm cursor-pointer"
                >
                  Khác
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "#FFD875",
              color: "#1a1d24",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Cập nhật
          </button>
        </div>

        <AvatarUser
          setAvtUrl={setAvtUrl}
          isUpdatingAvt={isUpdatingAvt}
          setIsUpdatingAvt={setIsUpdatingAvt}
          imageUrl={avtUrl || authUser.avatarUrl || "/images/vn_flag.svg"}
        />
      </div>
    </div>
  );
}
