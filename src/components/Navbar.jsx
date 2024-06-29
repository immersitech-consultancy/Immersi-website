import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-opacity-90 p-2 z-10 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
        <ul className="flex justify-center list-none m-0 p-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
          <li className="mx-2">
            <Link
              to="/"
              className="text-white no-underline text-lg px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/contact"
              className="text-white no-underline text-lg px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Contact
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/services"
              className="text-white no-underline text-lg px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Services
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Navbar;
