import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-600 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-2xl text-white font-semibold tracking-tight">
          DreamNest.com
        </span>
        <div className="text-sm text-white mt-4 md:mt-0 flex gap-6">
          <p className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Terms And Conditions
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center text-xs text-white">
        <p>© 2024 DreamNest. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
