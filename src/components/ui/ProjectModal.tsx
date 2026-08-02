'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Text2SQLSimulation, RAGSimulation, PRReviewSimulation, XYRASimulation } from './ProjectSimulations';

interface Project {
  id: number;
  title: string;
  shortDescription?: string;
  description: string[];
  simulationType?: string;
  image: string;
  technologies: string[];
  github: string;
  featured: boolean;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  nextProjectTitle: string;
  prevProjectTitle: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onNext, onPrev, nextProjectTitle, prevProjectTitle }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  if (!project) return null;

  const renderSimulation = () => {
    switch (project.simulationType) {
      case 'text2sql':
        return <Text2SQLSimulation />;
      case 'rag':
        return <RAGSimulation />;
      case 'pr-review':
        return <PRReviewSimulation />;
      case 'voice':
        return <XYRASimulation />;
      default:
        return (
          <div className="w-full h-[400px] bg-gray-900 rounded-xl flex items-center justify-center border border-gray-800">
            <span className="text-gray-500">Simulation not available</span>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Full screen page) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-black w-full h-full flex flex-col relative overflow-hidden"
            >
              {/* MainLayout matching static top navy blue glow */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"></div>
              
              {/* Dynamic Cursor Spotlight (Navy Blue) */}
              <div 
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 58, 138, 0.15), transparent 40%)`
                }}
              ></div>

              {/* Fixed Back Button */}
              <button
                onClick={onClose}
                className="absolute top-6 left-6 lg:left-12 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono bg-[#0a0a0a]/80 backdrop-blur px-4 py-2 rounded-lg"
              >
                ← back to projects
              </button>

              {/* Scrollable Content Area */}
              <div className="relative z-10 overflow-y-auto w-full h-full scrollbar-hide">
                <div className="max-w-[90rem] mx-auto w-full pt-20 px-8 lg:px-12 pb-12">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
                    
                    {/* Left Column: Details */}
                    <div className="w-full lg:w-[55%] flex flex-col">
                      <div className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                        Project {String(project.id).padStart(2, '0')}
                      </div>
                      <h2 className="text-4xl lg:text-[42px] xl:text-[50px] font-bold text-white mb-6 leading-tight">
                        {project.title}
                      </h2>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <FaGithub size={16} /> View source
                        </a>
                      </div>

                      <div className="mb-0">
                        <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">Overview</h3>
                        <ul className="space-y-2.5">
                          {project.description.map((point, idx) => (
                            <li key={idx} className="flex items-start text-gray-300 text-sm leading-relaxed">
                              <span className="text-blue-500 mr-3 mt-1.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Simulation Video */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-end items-center relative lg:pl-2">
                      <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden ring-1 ring-gray-800 shadow-2xl relative">
                        {renderSimulation()}
                        
                        <div className="mt-4 flex justify-center w-full">
                          <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live code simulation running
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Full Width Below Both Columns */}
                  <div className="mt-8 pt-6 border-t border-gray-800/50 w-full">
                    <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4 text-center lg:text-left">Built With</h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-900 border border-gray-800 rounded-md whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Footer Navigation */}
                  <div className="mt-10 pt-6 border-t border-gray-800/50 flex justify-between items-center w-full">
                    <button 
                      onClick={onPrev}
                      className="flex items-center gap-4 group text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        ←
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                          Previous Project
                        </div>
                        <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {prevProjectTitle}
                        </span>
                      </div>
                    </button>

                    <button 
                      onClick={onNext}
                      className="flex items-center gap-4 group text-right"
                    >
                      <div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                          Next Project
                        </div>
                        <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {nextProjectTitle}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        →
                      </div>
                    </button>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
