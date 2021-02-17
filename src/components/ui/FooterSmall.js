import React from "react";

export const FooterSmall = () => {
  return (
    <footer className="w-full text-center bg-green-900  pb-2">
      <div className="text-sm text-white font-semibold py-1">
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="google.com"
          className="text-white hover:text-gray-400 text-sm font-semibold"
        >
          Hacienda El Orosi
        </a>
      </div>
    </footer>
  );
};
