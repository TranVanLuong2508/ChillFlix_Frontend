"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { userServices } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserLists = async () => {
      const res = await userServices.getAllUser();
      console.log("check res", res.data.users);
    };

    fetchUserLists();
  }, []);
  return (
    <main className="min-h-screen bg-[#0f1419] pb-0">
      <Header />
      <div className="h-[500px] bg-gray-700"></div>
      <Footer />
    </main>
  );
}
