'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Chatbot from '../ui/Chatbot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Static top navy blue glow, center black */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"></div>
      
      {/* Dynamic Cursor Spotlight (Navy Blue) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 58, 138, 0.25), transparent 40%)`
        }}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      
      {/* Soft screen bottom blur overlay - faded progressively via CSS mask */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-14 pointer-events-none z-40 bg-gradient-to-t from-white/60 to-transparent dark:from-gray-900/80 dark:to-transparent backdrop-blur-[3px]"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0))'
        }}
      />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
