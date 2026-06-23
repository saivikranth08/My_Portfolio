'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  FaCode, FaDatabase, FaTools, FaBrain,
  FaPython, FaHtml5, FaCss3Alt, FaDocker, FaGithub, 
  FaLaptopCode, FaHeadphones, FaVolumeUp, FaVideo, FaRobot,
  FaLink, FaSitemap, FaSearch, FaBookOpen, FaKeyboard,
  FaMicrophone, FaPlug, FaChartLine, FaVectorSquare
} from 'react-icons/fa';
import {
  SiPostgresql, SiRedis, SiHuggingface, SiFastapi,
  SiMysql, SiC, SiStreamlit, SiWebrtc
} from 'react-icons/si';
import Card3D from '@/components/ui/Card3D';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button3D from '@/components/ui/Button3D';


// Import content management utilities
import { getSkills } from '@/utils/content';

// Icon mapping for skills
const iconMap: { [key: string]: React.ReactNode } = {
  // Programming Languages
  FaPython: <FaPython className="text-blue-400" size={24} />,
  SiC: <SiC className="text-blue-500" size={24} />,
  FaDatabase: <FaDatabase className="text-green-400" size={24} />,
  FaHtml5: <FaHtml5 className="text-orange-500" size={24} />,
  FaCss3Alt: <FaCss3Alt className="text-blue-500" size={24} />,

  // Frameworks & Libraries
  FaBrain: <FaBrain className="text-purple-500" size={24} />,
  FaLink: <FaLink className="text-blue-400" size={24} />, // LangChain
  FaSitemap: <FaSitemap className="text-green-500" size={24} />, // LangGraph
  SiHuggingface: <SiHuggingface className="text-yellow-400" size={24} />,
  SiFastapi: <SiFastapi className="text-emerald-500" size={24} />,
  SiStreamlit: <SiStreamlit className="text-red-500" size={24} />,
  FaRobot: <FaRobot className="text-emerald-500" size={24} />, // LLMs
  FaCode: <FaCode className="text-blue-600" size={24} />, // FastMCP

  // Databases & Retrieval
  SiPostgresql: <SiPostgresql className="text-blue-500" size={24} />,
  SiMysql: <SiMysql className="text-blue-700" size={24} />,
  SiRedis: <SiRedis className="text-red-500" size={24} />,
  FaSearch: <FaSearch className="text-teal-400" size={24} />, // FAISS

  // AI/ML Concepts
  FaVectorSquare: <FaVectorSquare className="text-purple-400" size={24} />, // Embeddings
  FaBookOpen: <FaBookOpen className="text-indigo-400" size={24} />, // RAG
  FaKeyboard: <FaKeyboard className="text-gray-400" size={24} />, // Prompt Engineering
  FaMicrophone: <FaMicrophone className="text-red-400" size={24} />, // STT
  FaHeadphones: <FaHeadphones className="text-lime-500" size={24} />,
  FaVolumeUp: <FaVolumeUp className="text-blue-400" size={24} />, // TTS
  FaVideo: <FaVideo className="text-teal-400" size={24} />,
  SiWebrtc: <SiWebrtc className="text-red-500" size={24} />, // WebRTC
  FaPlug: <FaPlug className="text-yellow-500" size={24} />, // MCP

  // Tools
  FaDocker: <FaDocker className="text-blue-400" size={24} />,
  FaChartLine: <FaChartLine className="text-green-400" size={24} />, // LangSmith
  FaGithub: <FaGithub className="text-gray-700 dark:text-gray-300" size={24} />,
};

// Skills data based on content management
const getSkillCategories = () => {
  const skills = getSkills();

  return [
    {
      id: 1,
      title: 'Programming',
      icon: <FaCode className="text-4xl text-purple-500 mb-4" />,
      skills: skills.programmingLanguages || [],
    },
    {
      id: 2,
      title: 'Frameworks & Libraries',
      icon: <FaLaptopCode className="text-4xl text-green-500 mb-4" />,
      skills: skills.frameworksAndLibraries || [],
    },
    {
      id: 3,
      title: 'Databases & Retrieval',
      icon: <FaDatabase className="text-4xl text-blue-500 mb-4" />,
      skills: skills.databasesAndRetrieval || [],
    },
    {
      id: 4,
      title: 'AI/ML Concepts',
      icon: <FaBrain className="text-4xl text-pink-500 mb-4" />,
      skills: skills.aiMlConcepts || [],
    },
    {
      id: 5,
      title: 'Tools',
      icon: <FaTools className="text-4xl text-gray-500 mb-4" />,
      skills: skills.tools || [],
    },
  ];
};

// Skill component with icon
const SkillItem = ({ name, iconName }: { name: string; iconName: string }) => {
  const icon = iconMap[iconName] || <FaCode className="text-gray-500" size={24} />;

  return (
    <div className="mb-3 flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default function SkillsPage() {
  // Get skill categories from content management system
  const skillCategories = getSkillCategories();

  return (
    <MainLayout>
      <section className="section container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedHeading
            as="h1"
            className="mb-4 text-5xl font-bold"
            staggerLetters={true}
            underlineWidth={0}
            gradientColors={['#3b82f6', '#8b5cf6']}
          >
            My Skills
          </AnimatedHeading>
          <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            A comprehensive overview of my technical skills and expertise based on my resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(category => (
            <Card3D
              key={category.id}
              className="p-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 h-full"
              hoverScale={1.03}
              gradientShadow={false}
              glowOnHover={false}
            >
              <div className="text-center mb-6">
                {category.icon}
                <AnimatedHeading
                  as="h2"
                  className="text-2xl font-bold"
                  staggerLetters={false}
                  gradientColors={['#3b82f6', '#8b5cf6']}
                >
                  {category.title}
                </AnimatedHeading>
              </div>

              <div>
                {category.skills.map((skill, index) => (
                  <SkillItem key={index} name={skill.name} iconName={skill.icon} />
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        <div className="mt-16 text-center">
          <AnimatedHeading
            as="h2"
            className="text-3xl font-bold mb-4"
            staggerLetters={true}
            underlineWidth={0}
            gradientColors={['#3b82f6', '#8b5cf6']}
          >
            Continuous Learning
          </AnimatedHeading>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
            I&apos;m constantly expanding my skill set and staying up-to-date with the latest technologies.
            {/* Original learning: Rust, WebAssembly, and advanced MLOps. Can be updated if needed. */}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button3D
              href="/projects"
              variant="primary"
              size="lg"
              className="gradient-border"
            >
              View My Projects
            </Button3D>
            <Button3D
              href="/contact"
              variant="outline"
              size="lg"
              className="gradient-border"
            >
              Get in Touch
            </Button3D>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
