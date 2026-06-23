'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FaGraduationCap, FaLaptopCode, FaEye, FaLightbulb, FaPython, FaHtml5, FaCss3Alt, FaDocker, FaGithub, FaBrain, FaRobot, FaLinkedin, FaBriefcase } from 'react-icons/fa';
import { SiPostgresql, SiMysql, SiRedis, SiFastapi, SiHuggingface, SiC, SiStreamlit } from 'react-icons/si';
import Image from 'next/image';
import Card3D from '@/components/ui/Card3D';
import AnimatedHeading from '@/components/ui/AnimatedHeading';

// Import content management utilities
import { getAboutInfo } from '@/utils/content';

const SpotlightWrapper = ({ children, glowColor }: { children: React.ReactNode, glowColor: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic spotlight that follows the mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
        }}
      />
      {/* Static glow that shows when NOT hovering */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 0 : 0.8,
          background: `radial-gradient(200px circle at 50% 50%, ${glowColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

const marqueeSkills = [
  { name: 'Python', icon: FaPython, color: 'text-blue-500' },
  { name: 'C', icon: SiC, color: 'text-blue-500' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
  { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
  { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-400' },
  { name: 'LangChain', icon: FaBrain, color: 'text-purple-500' },
  { name: 'LangGraph', icon: FaBrain, color: 'text-indigo-500' },
  { name: 'FastAPI', icon: SiFastapi, color: 'text-emerald-500' },
  { name: 'Streamlit', icon: SiStreamlit, color: 'text-red-500' },
  { name: 'Playwright', icon: FaRobot, color: 'text-emerald-500' },
  { name: 'Hugging Face', icon: SiHuggingface, color: 'text-yellow-400' },
  { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
  { name: 'Docker', icon: FaDocker, color: 'text-blue-400' },
  { name: 'GitHub', icon: FaGithub, color: 'text-neutral-800 dark:text-white' },
];

export default function AboutPage() {
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [animationCycleComplete, setAnimationCycleComplete] = useState(false);
  const [hoverTriggered, setHoverTriggered] = useState(false);

  const typingSpeed = 100;
  const erasingSpeed = 50;
  const interRoleDelay = 1500;
  const interLineDelay = 500;

  // Get content from the centralized content management system
  const aboutInfo = getAboutInfo();
  const line1Config = React.useMemo(() => ({ text: aboutInfo.greeting + " ", gradientPart: aboutInfo.name }), [aboutInfo.greeting, aboutInfo.name]);
  const roles = aboutInfo.roles;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Typing Line 1
    if (typedLine1.length < (line1Config.text + line1Config.gradientPart).length) {
      timeoutId = setTimeout(() => {
        setTypedLine1((line1Config.text + line1Config.gradientPart).substring(0, typedLine1.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    }

    // Typing/Erasing Line 2 (Roles)
    if (typedLine1.length === (line1Config.text + line1Config.gradientPart).length) {
      const currentRoleConfig = roles[currentRoleIndex];
      const line2StaticText = currentRoleConfig.prefix;
      const currentRoleName = currentRoleConfig.name;
      const fullLine2Text = line2StaticText + currentRoleName;

      // Pause condition: initial cycle done AND not triggered by hover to advance, AND not currently erasing
      if (animationCycleComplete && !hoverTriggered && !isErasing) {
        if (typedLine2 !== fullLine2Text) { // Ensure the paused role is fully displayed
             setTypedLine2(fullLine2Text);
        }
        return;
      }

      if (isErasing) {
        if (typedLine2.length > line2StaticText.length) { // Erase only the role name part
          timeoutId = setTimeout(() => {
            setTypedLine2(prev => prev.substring(0, prev.length - 1));
          }, erasingSpeed);
        } else { // Finished erasing current role name
          setIsErasing(false);
          setCurrentRoleIndex(prev => (prev + 1) % roles.length);
          // If hoverTriggered was true, the new role will start typing.
          // If it was the initial cycle, the new role will start typing.
        }
      } else { // Typing
        if (typedLine2.length < fullLine2Text.length) {
          const initialDelay = typedLine2.length === 0 && currentRoleIndex === 0 && !animationCycleComplete ? interLineDelay : 0;
          timeoutId = setTimeout(() => {
            setTypedLine2(fullLine2Text.substring(0, typedLine2.length + 1));
          }, initialDelay || typingSpeed);
        } else { // Finished typing current role
          if (!animationCycleComplete && currentRoleIndex === roles.length - 1) {
            // Just finished the *initial* full cycle (typed the last role)
            setAnimationCycleComplete(true);
            setHoverTriggered(false); // Ready for hover trigger, will pause here on the last role.
          } else if (hoverTriggered) {
            // Finished typing a role that was triggered by hover
            setHoverTriggered(false); // Pause now until next hover
          } else if (!animationCycleComplete) {
            // Still in the initial cycle, not the last role yet. Prepare to erase.
            timeoutId = setTimeout(() => {
              setIsErasing(true);
            }, interRoleDelay);
          }
          // If animationCycleComplete is true and hoverTriggered became false, it will pause.
        }
      }
      return () => clearTimeout(timeoutId);
    }
  }, [
    typedLine1, typedLine2, currentRoleIndex, isErasing,
    animationCycleComplete, hoverTriggered,
    roles, line1Config,
    typingSpeed, erasingSpeed, interRoleDelay, interLineDelay
  ]);

  const handleMouseEnter = () => {
    const currentRoleConfig = roles[currentRoleIndex];
    // Trigger if:
    // 1. Initial cycle is complete.
    // 2. Not currently in an animation triggered by a previous hover (hoverTriggered is false).
    // 3. Not currently erasing.
    // 4. The current role is fully typed.
    if (animationCycleComplete && !hoverTriggered && !isErasing &&
        typedLine2 === (currentRoleConfig.prefix + currentRoleConfig.name)) {
      setHoverTriggered(true);
      setIsErasing(true); // Start by erasing the current role to move to the next
    }
  };

  const renderLine1 = () => {
    const staticPartLength = line1Config.text.length;
    let displayedStatic = '';
    let displayedGradient = '';

    if (typedLine1.length <= staticPartLength) {
      displayedStatic = typedLine1;
    } else {
      displayedStatic = line1Config.text;
      displayedGradient = typedLine1.substring(staticPartLength);
    }
    const showCursor = typedLine1.length < (line1Config.text + line1Config.gradientPart).length;

    return (
      <>
        {displayedStatic}
        <span className="gradient-text">{displayedGradient}</span>
        {showCursor && <span className="animate-blink">|</span>}
      </>
    );
  };

  const renderLine2 = () => {
    if (typedLine1.length < (line1Config.text + line1Config.gradientPart).length) {
      return <>&nbsp;</>;
    }

    const currentRoleConfig = roles[currentRoleIndex];
    const line2StaticTextForRender = currentRoleConfig.prefix;
    const currentRoleNameForRender = currentRoleConfig.name;
    const staticPartLength = line2StaticTextForRender.length;

    let displayedStatic = '';
    let displayedGradient = '';

    if (typedLine2.length <= staticPartLength) {
        displayedStatic = typedLine2;
    } else {
        displayedStatic = line2StaticTextForRender;
        displayedGradient = typedLine2.substring(staticPartLength);
    }

    const currentFullRoleText = line2StaticTextForRender + currentRoleNameForRender;
    const showCursor = typedLine2.length < currentFullRoleText.length ||
                       (isErasing && typedLine2.length > line2StaticTextForRender.length);

    return (
      <>
        {displayedStatic}
        <span
          className="gradient-text"
          onMouseEnter={animationCycleComplete ? handleMouseEnter : undefined}
        >
          {displayedGradient}
        </span>
        {showCursor && <span className="animate-blink">|</span>}
      </>
    );
  };

  return (
    <MainLayout>
      <section className="section container mx-auto px-4 pt-12 md:pt-24">
        {/* Main Split Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Text Column */}
          <div className="order-2 md:order-1 flex flex-col items-start text-left">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-block shadow-sm">
                Ready to Innovate
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 cursor-default text-white">
              {renderLine1()}
            </h2>
            <div className="text-2xl md:text-3xl text-gray-300 mb-8 cursor-default">
              {renderLine2()}
            </div>

            <div className="text-base md:text-lg mb-8 max-w-xl">
              {aboutInfo.bio.map((paragraph, index) => (
                <p key={index} className="mb-4 animate-text-shine font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Infinite Horizontal Scrolling Skills Marquee - Borderless, Monochrome */}
            <div className="relative w-full max-w-xl overflow-hidden py-4 mb-8">
              <div className="flex w-max animate-marquee">
                <div className="flex space-x-12 px-6">
                  {marqueeSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div key={`skill-1-${idx}`} className="flex items-center text-white transition-colors duration-300">
                        <Icon className="text-4xl" title={skill.name} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-12 px-6">
                  {marqueeSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div key={`skill-2-${idx}`} className="flex items-center text-white transition-colors duration-300">
                        <Icon className="text-4xl" title={skill.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Buttons & Social */}
            <div className="flex flex-col items-start space-y-4 mb-8">
              <Card3D
                className="inline-block"
                hoverScale={1.05}
                gradientShadow={false}
                glowOnHover={false}
              >
                <a
                  href="/resume"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                >
                  <FaEye className="mr-2" /> View Resume
                </a>
              </Card3D>

              <Card3D
                className="inline-block"
                hoverScale={1.05}
                gradientShadow={false}
                glowOnHover={false}
              >
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                >
                  Contact
                </a>
              </Card3D>
            </div>

            {/* Social media links */}
            <div className="flex items-center space-x-4">
              <a
                href={aboutInfo.github || "https://github.com/saivikranth08"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-500 hover:text-white transition-colors group text-xs font-semibold"
              >
                <span className="w-10 h-10 rounded-lg bg-gray-800/80 text-white flex items-center justify-center mr-2 border border-gray-700 transition-all duration-300 group-hover:bg-gray-700">
                  <FaGithub size={20} />
                </span>
                GitHub
              </a>
              <a
                href={aboutInfo.linkedin || "https://www.linkedin.com/in/vikranthkanuru/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-500 hover:text-white transition-colors group text-xs font-semibold"
              >
                <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-2 shadow-sm transition-all duration-300 group-hover:bg-blue-500">
                  <FaLinkedin size={20} />
                </span>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end md:items-start h-full perspective-1000">
            <div className="relative w-80 h-[28rem] md:w-[450px] md:h-[550px] group">
              <Image
                src="/images/Vicky_AI.jpg"
                alt="Vikranth's Profile"
                fill
                style={{ 
                  objectFit: 'contain', 
                  objectPosition: 'bottom',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
                className="mix-blend-lighten filter brightness-110 contrast-125 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-105 group-hover:drop-shadow-[0_25px_35px_rgba(168,85,247,0.4)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4 Bottom Cards Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pb-16">
          <Card3D
            className="bg-gray-900/50 border border-gray-800 text-white rounded-2xl backdrop-blur-sm min-h-[12rem] h-full"
            hoverScale={1.03}
            gradientShadow={false}
            glowOnHover={false}
          >
            <SpotlightWrapper glowColor="rgba(236, 72, 153, 0.2)">
              <div className="flex flex-col items-center justify-center py-8 px-6 h-full">
                <FaGraduationCap className="text-4xl text-pink-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Education</h3>
                <p className="text-center text-sm text-gray-400">
                  {aboutInfo.education}
                </p>
              </div>
            </SpotlightWrapper>
          </Card3D>

          <Card3D
            className="bg-gray-900/50 border border-gray-800 text-white rounded-2xl backdrop-blur-sm min-h-[12rem] h-full"
            hoverScale={1.03}
            gradientShadow={false}
            glowOnHover={false}
          >
            <SpotlightWrapper glowColor="rgba(59, 130, 246, 0.2)">
              <div className="flex flex-col items-center justify-center py-8 px-6 h-full">
                <FaBriefcase className="text-4xl text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Experience</h3>
                <p className="text-center text-sm text-gray-400">
                  {aboutInfo.experience}
                </p>
              </div>
            </SpotlightWrapper>
          </Card3D>

          <Card3D
            className="bg-gray-900/50 border border-gray-800 text-white rounded-2xl backdrop-blur-sm min-h-[12rem] h-full"
            hoverScale={1.03}
            gradientShadow={false}
            glowOnHover={false}
          >
            <SpotlightWrapper glowColor="rgba(16, 185, 129, 0.2)">
              <div className="flex flex-col items-center justify-center py-8 px-6 h-full">
                <FaLaptopCode className="text-4xl text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Technologies</h3>
                <p className="text-center text-sm text-gray-400">
                  {aboutInfo.technologies}
                </p>
              </div>
            </SpotlightWrapper>
          </Card3D>

          <Card3D
            className="bg-gray-900/50 border border-gray-800 text-white rounded-2xl backdrop-blur-sm min-h-[12rem] h-full"
            hoverScale={1.03}
            gradientShadow={false}
            glowOnHover={false}
          >
            <SpotlightWrapper glowColor="rgba(234, 179, 8, 0.2)">
              <div className="flex flex-col items-center justify-center py-8 px-6 h-full">
                <FaLightbulb className="text-4xl text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Exploring</h3>
                <p className="text-center text-sm text-gray-400">
                  {aboutInfo.currentlyExploring.join(', ')}
                </p>
              </div>
            </SpotlightWrapper>
          </Card3D>
        </div>
      </section>
    </MainLayout>
  );
};
