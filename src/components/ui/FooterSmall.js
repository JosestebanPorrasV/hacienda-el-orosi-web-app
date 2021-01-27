import React from "react";

export const FooterSmall = () => {
  return (
    <>
      <footer className="absolute w-full bottom-0 bg-black  pb-4">
        <div className="container mx-auto px-2">
          <hr className="mb-6 border-b-1 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-2">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href=""
                  className="text-white hover:text-gray-400 text-sm font-semibold py-1"
                >
                  Hacienda El Orosi
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
