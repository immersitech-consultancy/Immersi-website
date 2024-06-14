import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-black bg-opacity-80 p-4 z-10">
    <ul className="flex justify-center list-none m-0 p-0">
      <li className="mx-4">
        <Link to="/" className="text-white no-underline md:text-2xl">Home</Link>
      </li>
      <li className="mx-4">
        <Link to="/contact" className="text-white no-underline md:text-2xl">Contact</Link>
      </li>
      <li className="mx-4">
        <Link to="/services" className="text-white no-underline md:text-2xl">Services</Link>
      </li>
    </ul>
  </nav>
  
    );
  };

export default Navbar
