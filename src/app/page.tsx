"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
// import { userServices } from "@/services";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetchUserLists();
  // }, []);

  // const fetchUserLists = async () => {
  //   const res = await userServices.getAllUser();
  //   console.log("check res", res.data.users);
  // };
  return (
    <>
      <Header />
      <div className="h-[500px] bg-gray-700"></div>
      <Footer />
    </>

  );
}


