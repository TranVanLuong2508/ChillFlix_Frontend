"use client";

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
              : "text-white font-semibold hover:text-yellow-400"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-zinc-900 p-4 rounded-lg h-32 flex items-center justify-center border border-zinc-800 hover:border-chillflix-yellow transition-colors cursor-pointer">
                <span className="text-gray-400">Bản chiếu 1</span>
              </div>
            </div>
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
