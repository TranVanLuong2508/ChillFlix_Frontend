import { Spinner } from "@/components/ui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] rounded-2xl p-8 flex flex-col items-center gap-4 border border-[#2a3040]">
        <Spinner className="size-12 text-yellow-400" />
        <div className="text-center">
          <p className="text-white font-semibold text-lg">
            Đang chuyển đến thanh toán...
          </p>
          <p className="text-gray-400 text-sm mt-2">Vui lòng chờ một chút</p>
        </div>
      </div>
    </div>
  );
}
