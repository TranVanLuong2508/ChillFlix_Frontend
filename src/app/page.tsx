import Image from "next/image";

export default function Home() {
  
  return (
    
    <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <p className="text-gray-500 mt-2">Dự án ChillFlix Frontend</p>
    </div>
      <h1 className="text-4xl font-bold mb-6 text-center">
        Chào mừng đến với ChillFlix
      </h1>
    </main>
  );
}
