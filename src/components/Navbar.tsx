'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            BlogNext
          </Link>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden lg:flex space-x-6 text-gray-700">
          <li className="hover:text-blue-600">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/categories">Categories</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="lg:hidden bg-white shadow-md space-y-4 py-4 px-4 text-gray-700">
          <li className="hover:text-blue-600">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/categories">Categories</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

