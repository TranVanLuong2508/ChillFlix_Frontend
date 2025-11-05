"use client";

import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { paymentService } from "@/services";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { useAuthStore } from "@/stores/authStore";
import { subsciptionPlanService } from "@/services/subscriptionPlanService";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface VipPackage {
  id: string;
  duration: string;
  months: number;
  price: number;
  originalPrice: number;
  discount: number;
  features: string[];
  highlighted?: boolean;
}

const VIP_PACKAGES: VipPackage[] = [
  {
    id: "monthly",
    duration: "1 tháng",
    months: 1,
    price: 39000,
    originalPrice: 39000,
    discount: 0,
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gắn nhãn ROX",
    ],
  },
  {
    id: "sixmonths",
    duration: "6 tháng",
    months: 6,
    price: 189000,
    originalPrice: 234000,
    discount: 19,
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gắn nhãn ROX",
    ],
    highlighted: true,
  },
  {
    id: "yearly",
    duration: "12 tháng",
    months: 12,
    price: 339000,
    originalPrice: 471000,
    discount: 28,
    features: [
      "Tắt quảng cáo",
      "Xem phim chất lượng 4K",
      "Chat không cần chờ",
      "Chat sử dụng stickers và Gifs",
      "Tải lên ảnh đại diện của bạn",
      "Tên được gắn nhãn ROX",
    ],
  },
];

export default function VipUpgradeContent() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string>("yearly");
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price);

  const handleUpgrade = async () => {
    const selected = VIP_PACKAGES.find((pkg) => pkg.id === selectedPackage);
    if (!selected) return;
    setIsLoading(true);
    const res = await paymentService.createPaymentURL(selected.price);
    const redirectURL: string = res.data.metadata.redirectUrl;
    if (redirectURL) {
      router.push(redirectURL);
    } else {
      alert("Không lấy được link thanh toán");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {isLoading && <LoadingSpinner />}

      {/* Hero */}
      <section className="py-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
          Tài khoản ChillFlix VIP
        </h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
          Nâng cấp để mở khóa quyền lợi và trải nghiệm xem phim không giới hạn
        </p>
      </section>
      {/* User status */}
      <section className="px-4 mt-4">
        <div className="max-w-xl mx-auto flex items-center gap-4 bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-lg">
          <img
            src={"/images/vn_flag.svg"}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border border-yellow-400/40"
          />

          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              {"Người dùng"}
              <span className="text-yellow-300 text-sm">
                ★ {true ? "VIP" : "Free"}
              </span>
            </h3>
            <p className="text-gray-400 text-xs">
              {true
                ? "Bạn đang là thành viên VIP."
                : "Bạn đang là thành viên miễn phí."}
            </p>
          </div>

          <Button
            className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 px-4 py-2 rounded-lg"
            size="sm"
            onClick={() => router.push("/nap-tien")}
          >
            + Nạp
          </Button>
        </div>
      </section>

      {/* VIP Benefits Banner */}
      <section className="px-4 my-6">
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-black/40 border border-yellow-500/30 p-6 rounded-2xl shadow-[0_0_45px_rgba(255,215,0,0.25)]">
          <h2 className="text-yellow-300 font-semibold text-center mb-4 text-lg">
            Quyền lợi VIP bao gồm
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              "Tắt toàn bộ quảng cáo",
              "Xem phim chất lượng 4K UHD",
              "Chat không delay - ưu tiên tốc độ",
              "Dùng sticker & GIF cực xịn",
              "Đổi avatar cá nhân không giới hạn",
              "Tên được gắn huy hiệu VIP ROX sáng chói",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-yellow-200">
                <Check className="w-4 h-4 text-yellow-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swiper Carousel */}
      <section className="py-10 px-4 !overflow-visible m-auto">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1.3}
          centeredSlides={true}
          centeredSlidesBounds={true} // Quan trọng
          loop={true}
          loopAdditionalSlides={VIP_PACKAGES.length} //Fix lệch khi loop
          initialSlide={VIP_PACKAGES.findIndex((p) => p.id === selectedPackage)} //Đặt đúng slide giữa
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 !overflow-visible"
        >
          {VIP_PACKAGES.map((pkg) => (
            <SwiperSlide key={pkg.id}>
              <div
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300
                    backdrop-blur-xl border 
                    ${
                      selectedPackage === pkg.id
                        ? "border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.55)] scale-[1.04] z-20"
                        : "border-white/10 hover:border-yellow-400/40 hover:scale-[1.02]"
                    }
                    bg-gradient-to-b from-[#1b1f2a] to-[#0d0f14]
                  `}
              >
                {/* Discount Badge */}
                {pkg.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-yellow-500/15 border border-yellow-400/60 text-yellow-300 px-2 py-1 text-xs rounded-md font-bold">
                    Giảm {pkg.discount}%
                  </span>
                )}

                {/* Duration */}
                <h3 className="text-white font-bold text-2xl mb-1 tracking-wide">
                  {pkg.duration}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2 mb-3">
                  <p className="text-yellow-300 text-3xl font-extrabold leading-none">
                    {formatPrice(pkg.price)}₫
                  </p>

                  {pkg.discount > 0 && (
                    <p className="text-gray-500 text-xs line-through">
                      {formatPrice(pkg.originalPrice)}₫
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="text-sm text-gray-300 space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <Button
                  size="sm"
                  className={`w-full font-bold py-2 rounded-xl transition-all ${
                    selectedPackage === pkg.id
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {selectedPackage === pkg.id ? "✓ Đã chọn" : "Chọn gói"}
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Confirm Purchase */}
      <div className="text-center pb-10">
        <Button
          onClick={handleUpgrade}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-105 font-bold py-3 px-10 rounded-xl transition-all"
        >
          Thanh Toán Ngay
        </Button>
        <p className="text-gray-500 text-xs mt-3">
          Bạn có thể hủy bất kỳ lúc nào — không phí ẩn.
        </p>
      </div>
    </div>
  );
}
