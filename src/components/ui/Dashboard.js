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

        <div className="flex-1 flex flex-col bg-gray-800  px-4 lg:px-6 xl:px-8 overflow-hidden">
          <div className="flex-1 py-4 lg:py-6">
            <div className="max-w-screen-2xl mx-auto">
              <DashboardRoutes />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
