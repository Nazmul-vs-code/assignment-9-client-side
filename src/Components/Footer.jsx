import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    // Added w-full block m-0 to force-kill margins and expand across the viewport edge
    <footer className="w-full block bg-black text-white m-0 p-0 clear-both">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-primary">
            IdeaVault
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            A modern platform to share, explore, and validate
            innovative startup ideas with the community.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Platform
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link
                href="/ideas"
                className="hover:text-primary duration-300"
              >
                Ideas
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-primary duration-300"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/add-idea"
                className="hover:text-primary duration-300"
              >
                Add Idea
              </Link>
            </li>
            <li>
              <Link
                href="/my-ideas"
                className="hover:text-primary duration-300"
              >
                My Ideas
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>Email: support@ideavault.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary duration-300"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary duration-300"
            >
              <FaXTwitter size={18} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary duration-300"
            >
              <FaLinkedinIn size={18} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary duration-300"
            >
              <FaGithub size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} IdeaVault. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;