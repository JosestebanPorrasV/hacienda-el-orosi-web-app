import React from "react";

export const Navbar = () => {
  return (
    <div class="bg-green-900 py-2 px-4 flex items-center justify-between lg:hidden text-white">
      <button id="menuToggle">
        <i class="fas fa-bars"></i>
      </button>
      <div class="flex flex-row items-center justify-center xl:justify-start space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
        <i class="pl-3 fas fa-briefcase"></i>
        <span class="font-bold text-blue-100 text-xs">Recursos Humanos</span>
        <i class="fas fa-user"></i>
        <span class="font-bold text-blue-100 text-xs">Adriana Vargas</span>
      </div>
    </div>
  );
};
