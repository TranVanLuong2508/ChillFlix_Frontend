"use client";

import Atropos from "atropos/react";
import "atropos/css";

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Atropos
        className="my-atropos w-80 h-96 rounded-2xl shadow-2xl bg-white overflow-hidden"
        activeOffset={40} // độ nghiêng tối đa
        shadowScale={1.05} // độ phóng bóng
        highlight={true} // hiệu ứng phản chiếu (shine)
        rotateTouch="scroll-y" // cho phép nghiêng bằng chạm
        shadow={true}
      >
        <div className="relative w-full h-full">
          <img
            data-atropos-offset="-5"
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
            alt="Card background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            data-atropos-offset="10"
            className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5 text-white"
          >
            <h2 className="text-2xl font-bold mb-2">3D Atropos Card</h2>
            <p className="text-sm opacity-90">
              Hiệu ứng nghiêng mượt mà với phản chiếu chiều sâu.
            </p>
          </div>
          <div
            data-atropos-offset="15"
            className="absolute top-5 right-5 bg-white text-black px-3 py-1 text-xs font-semibold rounded-full shadow"
          >
            NEW
          </div>
        </div>
      </Atropos>
    </div>
  );
}
