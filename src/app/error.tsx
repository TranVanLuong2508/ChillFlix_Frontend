"use client";

import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/"); // quay về trang chủ
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Đã xảy ra lỗi</h1>
      <p className="text-gray-700 mb-6">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã có lỗi xảy ra.
      </p>
      <button
        onClick={goHome}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default ErrorPage;
