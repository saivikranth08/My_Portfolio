'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectModal from './ProjectModal';

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

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const handleNextProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((activeProjectIndex + 1) % projects.length);
    }
  };

  const handlePrevProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((activeProjectIndex - 1 + projects.length) % projects.length);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-16">
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {projects.map((project, idx) => {
            const visibleTechs = project.technologies.slice(0, 3);
            const remainingTechs = project.technologies.length - 3;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[85vw] sm:w-[360px] xl:w-[380px] flex-shrink-0 snap-start flex"
              >
                <div className="relative w-full overflow-hidden bg-[#0d1117] border border-gray-800 rounded-2xl p-6 flex flex-col group transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer" onClick={() => setActiveProjectIndex(idx)}>
                  
                  {/* Large Faded Background Number */}
                  <div className="absolute top-2 right-4 text-[100px] font-black text-white/[0.02] select-none pointer-events-none leading-none z-0 group-hover:text-white/[0.04] transition-colors duration-500">
                    {String(project.id).padStart(2, '0')}
                  </div>

                  {/* Header/Tags */}
                  <div className="relative z-10 flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      {String(project.id).padStart(2, '0')} PROJECT
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2 min-h-[56px] group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="relative z-10 mt-6 flex flex-row overflow-x-auto scrollbar-hide gap-2 pb-1">
                    {visibleTechs.map((tech, index) => (
                      <span
                        key={index}
                        className="whitespace-nowrap px-2 py-1 text-[11px] font-medium text-gray-400 bg-black/50 border border-gray-800 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {remainingTechs > 0 && (
                      <span className="whitespace-nowrap px-2 py-1 text-[11px] font-medium text-gray-500 bg-transparent rounded-md">
                        +{remainingTechs}
                      </span>
                    )}
                  </div>

                  {/* Footer Links */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-gray-800/50 flex justify-between items-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveProjectIndex(idx); }}
                      className="text-blue-400 font-semibold text-sm flex items-center gap-2 hover:text-blue-300 transition-colors"
                    >
                      Case study <FaArrowRight size={12} />
                    </button>
                    
                    <div className="flex gap-4">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
                      >
                        <FaGithub size={14} /> Source
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Square Navigation Buttons (Bottom Right) */}
        <div className="absolute bottom-0 right-4 md:right-8 flex gap-3 z-30">
          <button 
            onClick={scrollLeft}
            className="p-3 border border-gray-800 bg-[#0d1117] rounded-md text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
            aria-label="Previous project"
          >
            <FaChevronLeft size={14} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-3 border border-gray-800 bg-[#0d1117] rounded-md text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
            aria-label="Next project"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <ProjectModal 
        project={activeProjectIndex !== null ? projects[activeProjectIndex] : null}
        isOpen={activeProjectIndex !== null}
        onClose={() => setActiveProjectIndex(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        nextProjectTitle={
          activeProjectIndex !== null 
            ? projects[(activeProjectIndex + 1) % projects.length].title 
            : ''
        }
        prevProjectTitle={
          activeProjectIndex !== null 
            ? projects[(activeProjectIndex - 1 + projects.length) % projects.length].title 
            : ''
        }
      />
    </>
  );
};

export default ProjectCarousel;

