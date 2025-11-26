import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      {/* 404 Number */}
      <h1 className="text-[7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-600 select-none">
        404
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-900">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-center max-w-md mb-8">
        Sorry, we couldn’t find the page you’re looking for.  
        It might have been removed or temporarily unavailable.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-red-400 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
