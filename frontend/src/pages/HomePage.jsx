import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContex";
import React from "react";

export default function HomePage() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const logOutRes = await logout();
    console.log("LOGOUT RES: ", logOutRes);
  };

  return (
    <>
      <div>HomePage</div>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
}
