import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl text-white font-extrabold tracking-wider hover:text-gray-300 transition-colors duration-300"
        >
          DreamNest.com
        </Link>
        <nav className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white font-medium text-lg px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white font-medium text-lg px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-blue-700 font-semibold text-lg px-5 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
