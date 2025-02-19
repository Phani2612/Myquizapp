import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 grid  grid-cols-1 sm:grid-cols-3  gap-8 text-center sm:text-left">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">Company Name</h2>
          <p className="mt-2 text-sm opacity-80">
            We provide the best services and products to enhance your business growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Services</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <FaFacebook className="h-6 w-6 hover:text-yellow-400 transition cursor-pointer" />
            <FaTwitter className="h-6 w-6 hover:text-yellow-400 transition cursor-pointer" />
            <FaInstagram className="h-6 w-6 hover:text-yellow-400 transition cursor-pointer" />
            <FaLinkedin className="h-6 w-6 hover:text-yellow-400 transition cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm opacity-80 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Company Name. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
