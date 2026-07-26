'use client';

import React from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { FaGithub, FaCode, FaProjectDiagram } from 'react-icons/fa';
import Card3D from '@/components/ui/Card3D';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ExpandingText from '@/components/ui/ExpandingText';
import Button3D from '@/components/ui/Button3D';
import SkillTag3D from '@/components/ui/SkillTag3D';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import ProjectCarousel from '@/components/ui/ProjectCarousel';

// Import content management utilities
import { getFeaturedProjects } from '@/utils/content';

export default function ProjectsPage() {
  // Get projects from the centralized content management system
  const featuredProjects = getFeaturedProjects();

  return (
    <MainLayout>
      <section className="section container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <AnimatedHeading
            as="h1"
            className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
            staggerLetters={true}
            underlineWidth={0}
            gradientColors={['#3b82f6', '#8b5cf6']}
          >
            My Projects
          </AnimatedHeading>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            A showcase of my work, personal projects, and contributions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <AnimatedHeading
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold inline-block"
              staggerLetters={true}
              underlineWidth={0}
              gradientColors={['#3b82f6', '#8b5cf6']}
            >
              Featured Projects
            </AnimatedHeading>
          </div>
          <ProjectCarousel projects={featuredProjects} />
        </div>



        <div className="text-center mt-12 sm:mt-16">
          <AnimatedHeading
            as="h2"
            className="text-xl sm:text-2xl font-bold mb-4 inline-block"
            staggerLetters={true}
            underlineWidth={0}
            gradientColors={['#3b82f6', '#8b5cf6']}
          >
            Interested in collaborating?
          </AnimatedHeading>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
            I&apos;m always looking for new projects and challenges. Let&apos;s build something amazing together!
          </p>
          <Button3D
            href="/contact"
            variant="accent"
            size="lg"
            className="gradient-border"
          >
            Get in Touch
          </Button3D>
        </div>
      </section>
    </MainLayout>
  );
};
