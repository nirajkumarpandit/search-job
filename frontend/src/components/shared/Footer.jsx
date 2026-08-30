import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagramSquare } from "react-icons/fa";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-600 text-white">
              <Briefcase className="h-4 w-4" />
            </span>
            <h2 className="font-extrabold text-xl text-white">Jobs<span className="text-violet-500">Portal</span></h2>
          </Link>
          <p className="text-sm mt-4 leading-relaxed max-w-xs">
            Connecting great talent with great companies. Search, apply, and land your dream job — all in one place.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition text-lg">
              <FaInstagramSquare />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition text-lg">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-lg">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* For candidates */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">For Candidates</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-white transition">Search</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">My Profile</Link></li>
          </ul>
        </div>

        {/* For employers */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">For Employers</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/companies" className="hover:text-white transition">Manage Companies</Link></li>
            <li><Link to="/job/create" className="hover:text-white transition">Post a Job</Link></li>
            <li><Link to="/recruiterJob" className="hover:text-white transition">Manage Jobs</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} JobsPortal. All rights reserved.</p>
          <p>Made with care, for people looking for their next opportunity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
