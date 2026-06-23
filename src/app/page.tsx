'use client';

import { motion } from 'framer-motion';
import { getPersonalInfo } from '@/utils/content';
import InteractiveGrid from '@/components/ui/InteractiveGrid';

import Terminal from '@/components/terminal/Terminal';

export default function Home() {
  // Get personal info from content management system
  const personalInfo = getPersonalInfo();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4 perspective-1000 relative">
      <InteractiveGrid />
      <motion.div
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{personalInfo.displayName}&apos;s Portfolio</span>
        </h1>

        <motion.p
          className="text-base md:text-lg text-gray-300"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Interact with the terminal below to explore my portfolio
        </motion.p>
      </motion.div>

      {/* Terminal container using Next.js dynamic loading */}
      <div className="relative z-10 w-full max-w-4xl min-h-[400px]">
        <Terminal />
      </div>

      <motion.div
        className="mt-6 text-sm text-gray-300 relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>Type <span className="text-purple-400 font-mono">help</span> to see available commands</p>
        <p>Type <span className="text-purple-400 font-mono">portfolio</span> to skip to the main portfolio</p>
      </motion.div>
    </div>
  );
}
