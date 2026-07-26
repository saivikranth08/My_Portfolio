'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string[];
  image: string;
  technologies: string[];
  github: string;
  featured: boolean;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Create an array that loops infinitely starting from currentIndex
  const visibleProjects = [
    ...projects.slice(currentIndex),
    ...projects.slice(0, currentIndex),
  ];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 pb-16">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-[90vw] md:w-[80%] flex-shrink-0"
              >
                <div className="relative overflow-hidden bg-[#121316] border border-gray-800 rounded-2xl p-8 sm:p-10 h-full flex flex-col group transition-colors duration-300 hover:border-gray-700">
                  
                  {/* Large Faded Background Number */}
                  <div className="absolute top-4 right-8 text-[120px] font-black text-white/[0.03] select-none pointer-events-none leading-none z-0">
                    {String(project.id).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex-grow">
                    {/* Title */}
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-4 mb-8">
                      {project.description.map((point, index) => (
                        <li key={index} className="flex items-start text-gray-300 text-sm sm:text-base leading-relaxed">
                          <FaArrowRight className="text-emerald-400 mt-1.5 mr-3 flex-shrink-0" size={12} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-gray-800/50 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-transparent border border-gray-800 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Link positioned absolutely at the top right, but below the number */}
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={18} />
                    <span className="hidden sm:inline">Source Code</span>
                  </a>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Square Navigation Buttons (Bottom Right) */}
      <div className="absolute -bottom-2 right-4 md:right-8 flex gap-3 z-30">
        <button 
          onClick={prevSlide}
          className="p-3 border border-gray-800 bg-[#121316] rounded-md text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
          aria-label="Previous project"
        >
          <FaChevronLeft size={14} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 border border-gray-800 bg-[#121316] rounded-md text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
          aria-label="Next project"
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
