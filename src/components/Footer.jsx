import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">
          YAMDS: Yet Another Movie Database Searcher
        </p>
        <p className="text-sm">
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-300"
          >
            The Movie Database API
          </a>
        </p>
        <p className="text-sm mt-1">
          Developed by <span className="font-medium">beabzk</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
