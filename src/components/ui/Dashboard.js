import React from "react";
import { Navbar } from "./Navbar";

import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { FooterSmall } from "./FooterSmall";
import { Sidebar } from "./Sidebar";
import { NavbarInfo } from "./NavbarInfo";

export const Dashboard = () => {
  return (
    <>
      <div class="flex flex-col lg:flex-row min-h-screen font-semibold text-white text-base subpixel-antialiased">
        <Navbar />
        <Sidebar />

        <div class="flex-1 flex flex-col bg-gray-800 py-4 lg:py-8 px-4 lg:px-6 xl:px-8 overflow-hidden">
          <NavbarInfo />
          <div class="flex-1 py-4 lg:py-10">
            <div class="max-w-screen-2xl mx-auto">
              <DashboardRoutes />
            </div>
          </div>
        </div>
      </div>
      <FooterSmall />
    </>
  );
};
