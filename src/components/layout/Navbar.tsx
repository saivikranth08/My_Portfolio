'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaHome, 
  FaUser, 
  FaBriefcase, 
  FaCode, 
  FaCodeBranch, 
  FaFileAlt 
} from 'react-icons/fa';
import CopyTooltip from '../ui/CopyTooltip';
import { motion, AnimatePresence } from 'framer-motion';

// Import content management utilities
import {
  getPersonalInfo,
  getNavigationInfo,
  getGithubUrl,
  getLinkedinUrl
} from '@/utils/content';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Get content from the centralized content management system
  const personalInfo = getPersonalInfo();
  const navigation = getNavigationInfo();

  // Handle scroll to fade out title
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        // Only close if click is not on the hamburger button itself
        const target = event.target as HTMLElement;
        if (!target.closest('.hamburger-btn')) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close drawer on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/', label: navigation.home || 'Home', icon: FaHome },
    { href: '/about', label: navigation.about || 'About', icon: FaUser },
    { href: '/projects', label: navigation.projects || 'Projects', icon: FaBriefcase },
    { href: '/skills', label: navigation.skills || 'Skills', icon: FaCode },
    { href: '/resume-parser', label: navigation.aiResumeMatch || 'AI Matcher', icon: FaCodeBranch },
    { href: '/resume', label: 'Resume', icon: FaFileAlt },
    { href: '/contact', label: navigation.contact || 'Contact', icon: FaEnvelope },
  ];

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Home';
      case '/about': return 'About';
      case '/projects': return 'Projects';
      case '/skills': return 'Skills';
      case '/resume-parser': return 'Resume Matcher';
      case '/resume': return 'Resume';
      case '/contact': return 'Contact';
      default: return 'Portfolio';
    }
  };

  const pageTitle = getPageTitle(pathname || '/');

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2.5 px-6 transition-colors duration-300 relative">
          
          {/* Top Left: Active page title with underline */}
          <div className={`flex items-center z-10 w-1/3 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link href="/" className="group relative pb-1">
              <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                {pageTitle}
              </span>
              <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Center: Glassmorphic Capsule Menu (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/40 dark:border-gray-700/40 backdrop-blur-md rounded-full px-2.5 py-1.5 shadow-inner z-10">
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative p-2 rounded-full transition-all duration-300 group ${
                      isActive 
                        ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/40 dark:hover:bg-gray-900/40'
                    }`}
                  >
                    <Icon size={18} />
                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-medium shadow-sm z-50">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Circular Hamburger (Always visible) */}
          <div className={`flex items-center justify-end z-10 w-1/3 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Circular Hamburger button */}
            <button
              onClick={toggleMobileMenu}
              className="hamburger-btn w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-300 animate-none"
              aria-label="Toggle navigation drawer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Sidebar/Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              ref={drawerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-2xl border-l border-gray-200/50 dark:border-gray-800/50 flex flex-col p-6 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                  {personalInfo.displayName}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links (mobile & extra desktop view) */}
              <div className="flex flex-col space-y-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  Navigation
                </span>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Contact Info Section */}
              <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 block">
                  Get in Touch
                </span>
                <div className="space-y-3 mb-6">
                  <div className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                    <CopyTooltip
                      id="drawer-email-tooltip"
                      text={personalInfo.email}
                      isEmail={true}
                      label={
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <FaEnvelope size={16} className="mr-3 text-purple-500" />
                          <span className="truncate">{personalInfo.email}</span>
                        </div>
                      }
                    />
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                    <CopyTooltip
                      id="drawer-phone-tooltip"
                      text={personalInfo.phone}
                      label={
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <FaPhone size={16} className="mr-3 text-purple-500" />
                          <span>{personalInfo.phone}</span>
                        </div>
                      }
                    />
                  </div>
                </div>

                {/* Social links */}
                <div className="flex space-x-4">
                  <a
                    href={getGithubUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-purple-600 transition-all duration-200"
                    title="GitHub"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href={getLinkedinUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-purple-600 transition-all duration-200"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
