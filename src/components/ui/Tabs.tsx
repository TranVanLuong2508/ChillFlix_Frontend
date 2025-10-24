"use client";
import { Cast } from "lucide-react";
import { useState } from "react";
import CastInfo from "./CastInfo";

const tabs = [
  { id: "episodes", label: "Tập phim" },
  { id: "gallery", label: "Hình ảnh" },
  { id: "cast", label: "Diễn viên" },
  { id: "recommend", label: "Đề xuất" },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <div className="mt-8">
      <div className="flex border-b border-zinc-800 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 transition-all ${activeTab === tab.id
              ? "border-b-2 border-chillflix-yellow text-yellow-400 font-semibold"
              : "text-gray-400 hover:text-yellow-400"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "episodes" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Các bản chiếu</h2>
            <ul className="list-disc list-inside text-gray-400">

            </ul>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Hình ảnh</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
            </div>
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Diễn viên</h2>
              <CastInfo />
            </div>

          </div>
        )}

        {activeTab === "recommend" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Phim đề xuất</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
