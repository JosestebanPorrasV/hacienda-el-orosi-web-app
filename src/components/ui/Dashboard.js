import React from "react";
import { Navbar } from "./Navbar";

import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { Sidebar } from "./Sidebar";
//import { NavbarInfo } from "./NavbarInfo";
import '../../assets/css/TopLoaderService.css'

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen font-semibold text-white text-base subpixel-antialiased">
        <Navbar />
        <Sidebar />

        <div className="flex-1 flex flex-col px-3 overflow-hidden">
          <div className="flex-1">
            <div className="mx-auto">
              <DashboardRoutes />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
