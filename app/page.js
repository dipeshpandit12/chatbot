"use client"
import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Nav Links */}
            <div className="flex items-center space-x-8">
              <div className="text-xl font-bold text-gray-800">LOGO</div>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                <Link href="/services" className="text-gray-600 hover:text-gray-800">Services</Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="hidden md:flex">
              <Link href="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-600">Home</Link>
                <Link href="/services" className="text-gray-600">Services</Link>
                <Link href="/about" className="text-gray-600">About</Link>
                <Link href="/contact" className="text-gray-600">Contact</Link>
                <Link href="/login" className="text-blue-600">Login</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Social Media Planning
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Grow Your Business With AI
          </p>
          <Link 
            href="/questionnaire" 
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
