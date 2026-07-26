'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaProjectDiagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card3D from '@/components/ui/Card3D';
import Button3D from '@/components/ui/Button3D';
import SkillTag3D from '@/components/ui/SkillTag3D';

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

  // Reorder the array so the current index is always first
  const visibleProjects = [
    ...projects.slice(currentIndex),
    ...projects.slice(0, currentIndex),
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-12 sm:px-16 pb-8">
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110"
        aria-label="Previous project"
      >
        <FaChevronLeft className="text-xl sm:text-2xl" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110"
        aria-label="Next project"
      >
        <FaChevronRight className="text-xl sm:text-2xl" />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden p-4 -m-4">
        <motion.div 
          className="flex gap-6 sm:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] flex-shrink-0"
              >
                <Card3D
                  className="overflow-hidden flex flex-col h-full bg-gray-100 dark:bg-gray-800 p-0 text-gray-800 dark:text-gray-100 shadow-xl"
                  hoverScale={1.03}
                  mouseIntensity={0}
                  gradientShadow={false}
                  glowOnHover={false}
                >
                  {project.image ? (
                    <div 
                      className="h-40 sm:h-48 relative w-full overflow-hidden"
                      style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-400/80 to-purple-500/80 dark:from-blue-600/70 dark:to-purple-700/70 relative flex items-center justify-center">
                      <FaProjectDiagram className="text-white dark:text-gray-100 text-4xl sm:text-6xl opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 dark:from-blue-900/30 dark:to-purple-900/30"></div>
                    </div>
                  )}

                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent line-clamp-2">
                      {project.title}
                    </h3>
                    <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2 flex-grow">
                      {project.description.map((point, index) => (
                        <li key={index} className="flex items-start text-sm sm:text-base">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <SkillTag3D
                            key={index}
                            className="text-xs"
                          >
                            {tech}
                          </SkillTag3D>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pt-0 flex justify-center mt-auto">
                    <Button3D
                      href={project.github}
                      variant="outline"
                      size="sm"
                      icon={<FaGithub />}
                      className="bg-transparent w-full justify-center"
                    >
                      Source Code
                    </Button3D>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
