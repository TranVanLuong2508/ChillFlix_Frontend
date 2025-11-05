"use client";
import { useSession } from "next-auth/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { paymentService } from "@/services";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { useAuthStore } from "@/stores/authStore";
import { subsciptionPlanService } from "@/services/subscriptionPlanService";
import { toast } from "sonner";

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
  const [selectedPackage, setSelectedPackage] = useState<string>("sixmonths");
  const [isLoading, setIsLoading] = useState(false);
  const {
    isRefreshToken,
    errorRefreshToken,
    setRefreshTokenAction,
    isAuthenticated,
  } = useAuthStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleUpgrade = async () => {
    const selected = VIP_PACKAGES.find((pkg) => pkg.id === selectedPackage);
    if (!selected) return;
    setIsLoading(true);
    const res = await paymentService.createPaymentURL(selected.price);
    const redirectURL: string = res.data.metadata.redirectUrl;
    if (redirectURL) {
      // redirect to vnpay
      setTimeout(() => {
        router.push(redirectURL);
      }, 1000);
    } else {
      alert("Không lấy được link thanh toán");
      setIsLoading(false);
    }
  };

  const fetchPlanList = async () => {
    try {
      const res = await subsciptionPlanService.getSubscriptionsPlanList();
      if (res && res.EC === 1) {
        console.log("check plans", res);
      }
    } catch (error) {
      console.log("error fetch plan", error);
    }
  };

  console.log("check authenticated", isAuthenticated);

  return (
    <div className="w-full">
      {isLoading && <LoadingSpinner />}
      {/* Hero Section */}
      <section className="py-12 px-4 text-center border-b border-[#1a1f2e]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
          Tài khoản ChillFlix
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto text-balance">
          Số hữu tài khoản ChillFlix để nhận nhiều quyền lợi và tăng trải nghiệm
          xem phim.
        </p>
      </section>

      {/* User Info Section */}
      <section className="py-12 px-4 border-b border-[#1a1f2e]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">👤</span>
            </div>
            <div className="text-left">
              <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                Trần Văn Lương
                <span className="text-yellow-400 text-sm">∞</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Bạn đang là thành viên miễn phí.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 bg-[#1a1f2e] px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Số dư</span>
              <span className="text-yellow-400 font-semibold">0</span>
              <span className="text-yellow-400 text-xs">₽</span>
            </div>
            <Button
              onClick={() => {
                fetchPlanList();
              }}
              className="bg-white text-[#0f1419] hover:bg-gray-200 font-semibold"
            >
              + Nạp
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 text-balance">
            Nâng cấp tài khoản ChillFlix ngay bây giờ
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIP_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedPackage === pkg.id
                    ? "ring-2 ring-yellow-400 scale-105"
                    : "hover:scale-102"
                } ${
                  pkg.highlighted
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/50"
                    : "bg-gradient-to-br from-blue-700 to-blue-900 border border-blue-600/30"
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {/* Discount Badge */}
                {pkg.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-white text-[#0f1419] px-3 py-1 rounded-full text-sm font-semibold">
                    Giảm {pkg.discount}%
                  </div>
                )}

                {/* Highlight Badge */}
                {pkg.highlighted && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-[#0f1419] px-3 py-1 rounded-full text-xs font-bold">
                    PHỔ BIẾN
                  </div>
                )}

                <div className="p-8">
                  {/* Duration */}
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {pkg.duration}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-yellow-300">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-yellow-400 text-sm">₽</span>
                    </div>
                    {pkg.discount > 0 && (
                      <p className="text-gray-300 text-sm line-through">
                        {formatPrice(pkg.originalPrice)} ₽
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full mb-8 font-semibold py-3 rounded-lg transition-all ${
                      selectedPackage === pkg.id
                        ? "bg-yellow-400 text-[#0f1419] hover:bg-yellow-500"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                    }`}
                  >
                    {selectedPackage === pkg.id ? "Đã chọn" : "Chọn gói"}
                  </Button>

                  {/* Features List */}
                  <div className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => {
                handleUpgrade();
              }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f1419] hover:from-yellow-500 hover:to-yellow-600 font-bold py-3 px-8 rounded-lg text-lg transition-all hover:scale-105"
            >
              Nâng cấp ngay
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Bạn có thể hủy bất cứ lúc nào. Không có phí ẩn.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-[#1a1f2e]/50 border-t border-[#1a1f2e]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Tại sao nâng cấp ChillFlix?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Xem không quảng cáo",
                desc: "Thưởng thức phim yêu thích mà không bị gián đoạn",
              },
              {
                title: "Chất lượng 4K",
                desc: "Xem phim với độ phân giải cao nhất",
              },
              {
                title: "Tải xuống phim",
                desc: "Tải phim để xem offline bất cứ khi nào",
              },
              {
                title: "Ưu tiên hỗ trợ",
                desc: "Nhận hỗ trợ nhanh chóng từ đội ngũ của chúng tôi",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
