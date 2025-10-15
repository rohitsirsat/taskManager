import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

function Layout() {
  // control mobile sidebar open state here and pass to Header & SideBar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header setSidebarOpen={setIsSidebarOpen} />
      <div className="flex">
        <SideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
