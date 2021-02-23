import React from "react";

export const NotificationBell = () => {
  return (
    <button
      type="button"
      class="bg-gray-600 rounded-lg h-10 px-3 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 relative"
    >
      <svg
        class="w-6 h-6 text-blue-100 opacity-80"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
      </svg>
      <div class="w-2 h-2 rounded-full bg-red-500 absolute top-3 right-4 ring-2 ring-red-400 ring-opacity-60">
        &nbsp;
      </div>
    </button>
  );
};
