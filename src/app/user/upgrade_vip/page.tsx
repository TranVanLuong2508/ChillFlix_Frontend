"use client";

import { Check, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { paymentService } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { useAuthStore } from "@/stores/authStore";
import { subsciptionPlanService } from "@/services/subscriptionPlanService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useAppRouter } from "@/hooks/useAppRouter";
import { plan } from "@/types/subcsciptionPlan.type";
import { VIPFeatures } from "@/data/vipFeaturesData";
import { UpgradeVipMessage } from "@/constants/messages/user.message";
import { toast } from "sonner";

export default function VipUpgradeContent() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [planList, setPlanList] = useState<plan[]>([]);
  const { replaceToHome, replaceToUpgradeVip } = useAppRouter();
  const { authUser } = useAuthStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchPlanList();
  }, []);

  useEffect(() => {
    const statusResponse = searchParams.get("responseCode");
    const fromVNPay = Boolean(localStorage.getItem("from_VNPAY"));
    if (statusResponse === "00" && fromVNPay) {
      toast.success(UpgradeVipMessage.paymentSucess);
      localStorage.removeItem("from_VNPAY");
      replaceToUpgradeVip();
    }
  }, []);

  useEffect(() => {
    const isAuth = useAuthStore.getState().isAuthenticated;
    if (!isAuth) {
      replaceToHome();
    }
  });

  const fetchPlanList = async () => {
    const res = await subsciptionPlanService.getSubscriptionsPlanList();
    if (res && res.EC === 1) {
      setPlanList(res.data?.plans || []);
      setSelectedPackage(res.data?.plans[0].planId || 2);
    } else {
      setPlanList([]);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price);

  const handleUpgrade = async () => {
    const selected = planList.find((pkg) => pkg.planId === selectedPackage);
    if (!selected) return;
    setIsLoading(true);
    const res = await paymentService.createPaymentURL(parseInt(selected.price));
    const redirectURL: string = res.data.metadata.redirectUrl;
    if (redirectURL) {
      localStorage.setItem("from_VNPAY", "true");
      router.push(redirectURL);
    } else {
      alert("Không lấy được link thanh toán");
      setIsLoading(false);
    }
  };

  const isVip = useAuthStore.getState().authUser.isVip;

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

          <div className="flex-1 ">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              {authUser.fullName}
              <span className="text-yellow-300 text-sm flex gap-1 justify-between items-center ">
                <StarIcon /> {isVip ? "VIP" : "Free"}
              </span>
            </h3>
            <p className="text-gray-400 text-xs">
              {isVip
                ? UpgradeVipMessage.vipMember
                : UpgradeVipMessage.basicMember}
            </p>
          </div>
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
              "Tên được gắn huy hiệu VIP sáng chói",
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
          pagination={{ enabled: false }}
          spaceBetween={24}
          slidesPerView={1.3}
          centeredSlides={true}
          centeredSlidesBounds={true} // Quan trọng
          loop={true}
          loopAdditionalSlides={planList.length} //Fix lệch khi loop
          initialSlide={planList.findIndex((p) => p.planId === selectedPackage)} //Đặt đúng slide giữa
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 !overflow-visible"
        >
          {planList.map((pkg) => (
            <SwiperSlide key={pkg.planId}>
              <div
                onClick={() => setSelectedPackage(pkg.planId)}
                className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300
                    backdrop-blur-xl border 
                    ${
                      selectedPackage === pkg.planId
                        ? "border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.55)] scale-[1.04] z-20"
                        : "border-white/10 hover:border-yellow-400/40 hover:scale-[1.02]"
                    }
                    bg-gradient-to-b from-[#1b1f2a] to-[#0d0f14]
                  `}
              >
                <h3 className="text-white font-bold text-2xl mb-1 tracking-wide">
                  {`${
                    pkg.planDuration === 9999
                      ? "Vĩnh viễn"
                      : `${pkg.planDuration} ${pkg.durationInfo.valueVi}`
                  }`}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2 mb-3">
                  <p className="text-yellow-300 text-3xl font-extrabold leading-none">
                    {formatPrice(parseInt(pkg.price))} VNĐ
                  </p>
                </div>

                {/* VIPFeatures */}
                <ul className="text-sm text-gray-300 space-y-2 mb-6">
                  {VIPFeatures.map((feature, i) => (
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
                    selectedPackage === pkg.planId
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {selectedPackage === pkg.planId ? "✓ Đã chọn" : "Chọn gói"}
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
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-105 font-bold py-3 px-10 rounded-xl transition-all cursor-pointer"
        >
          Thanh Toán Ngay
        </Button>
        <p className="text-gray-500 text-xs mt-3">
          Bạn có thể hủy bất kỳ lúc nào — không phí phát sinh.
        </p>
      </div>
    </div>
  );
}
