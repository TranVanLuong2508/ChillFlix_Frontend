"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log("Session:", session);
  console.log("Status:", status);
  console.log("session:", session);
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not logged in</p>;
  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Access Token: {session?.accessToken}</p>
    </div>
  );
}
