'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TerminalHeader from './TerminalHeader';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import ThemeToggle from './ThemeToggle';
import ScanLines from './ScanLines';

// Import skill icons
import {
  FaPython, FaJs, FaDatabase,
  FaReact, FaHtml5, FaCss3Alt,
  FaNodeJs, FaDocker, FaAws, FaGoogle
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss,
  SiDjango, SiFlask, SiExpress,
  SiTensorflow, SiPytorch, SiScikitlearn, SiHuggingface,
  SiMongodb, SiPostgresql,
  SiKubernetes, SiRedux, SiGraphql, SiRedis, SiMysql
} from 'react-icons/si';

type OSTheme = 'windows' | 'linux' | 'mac';

interface Command {
  input: string;
  output: string | React.ReactNode;
}

const Terminal: React.FC = () => {
  // Initialize with default welcome message to avoid empty initial render
  const welcomeMessage = (
    <>
      <p className="text-green-400">Welcome to Vikranth&apos;s Terminal Portfolio!</p>
      <p className="mt-2">Type <span className="text-yellow-400">help</span> to see available commands.</p>
      <p className="mt-2">Type <span className="text-yellow-400">portfolio</span> to skip to the main portfolio.</p>
    </>
  );

  // Use state initialization with default values
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([{ input: '', output: welcomeMessage }]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [osTheme, setOsTheme] = useState<OSTheme>('linux');
  const [isLoaded] = useState(true); // Start with loaded=true for immediate rendering
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize the terminal immediately after component mounts
  useEffect(() => {
    // Focus the input after the terminal is loaded
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Auto-scroll to bottom on initial render
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }

    // Log for debugging
    console.log('Terminal component mounted and initialized');
  }, []);

  // This effect runs when the component is about to unmount
  useEffect(() => {
    return () => {
      console.log('Terminal component unmounting');
    };
  }, []);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Auto-scroll to bottom on initial render
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current && isLoaded) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isLoaded]);

  // Focus input on terminal click
  const focusInput = () => {
    if (inputRef.current && isLoaded) {
      inputRef.current.focus();
    }
  };

  // Process commands
  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output: string | React.ReactNode;

    switch (command) {
      case 'help':
        output = (
          <div>
            <p className="font-bold text-accent-light text-lg">Available commands:</p>

            <p className="font-semibold text-blue-400 mt-3 mb-1">Visit my Portfolio:</p>
            <ul className="ml-4 mb-3">
              <li><span className="text-yellow-400">portfolio</span> - Go to the main portfolio</li>
              <li><span className="text-yellow-400">resume</span> - View my resume</li>
              <li><span className="text-yellow-400">whoami</span> - Display my full name</li>
            </ul>

            <p className="font-semibold text-blue-400 mb-1">Other Commands:</p>
            <ul className="ml-4">
              <li><span className="text-yellow-400">help</span> - Show available commands</li>
              <li><span className="text-yellow-400">about</span> - Learn about me</li>
              <li><span className="text-yellow-400">skills</span> - View my technical skills</li>
              <li><span className="text-yellow-400">projects</span> - See my projects</li>
              <li><span className="text-yellow-400">contact</span> - Get my contact information</li>
              <li><span className="text-yellow-400">clear</span> - Clear the terminal</li>
              <li><span className="text-yellow-400">github</span> - Visit my GitHub profile</li>
              <li><span className="text-yellow-400">linkedin</span> - Visit my LinkedIn profile</li>
            </ul>
          </div>
        );
        break;

      case 'about':
        output = (
          <div>
            <p className="font-bold text-accent-light">About Me:</p>
            <p className="mt-1">
              I&apos;m Vikranth, a Software Engineer, AI/ML Engineer, and Data Scientist with a passion for building innovative solutions.
              I specialize in full-stack development, machine learning, and data analysis.
            </p>
            <p className="mt-1">
              Type <span className="text-yellow-400">portfolio</span> to see my full portfolio.
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-4">
            {/* Frontend Development */}
            <div>
              <p className="font-semibold text-purple-400 mb-1">Frontend Development:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <FaReact className="text-blue-400" size={18} /> React.js
                </div>
                <div className="flex items-center gap-2">
                  <SiNextdotjs className="text-gray-300" size={18} /> Next.js
                </div>
                <div className="flex items-center gap-2">
                  <FaJs className="text-yellow-400" size={18} /> JavaScript
                </div>
                <div className="flex items-center gap-2">
                  <SiTypescript className="text-blue-500" size={18} /> TypeScript
                </div>
                <div className="flex items-center gap-2">
                  <FaHtml5 className="text-orange-500" size={18} /> HTML
                </div>
                <div className="flex items-center gap-2">
                  <FaCss3Alt className="text-blue-500" size={18} /> CSS
                </div>
                <div className="flex items-center gap-2">
                  <SiTailwindcss className="text-cyan-400" size={18} /> Tailwind CSS
                </div>
                <div className="flex items-center gap-2">
                  <SiRedux className="text-purple-600" size={18} /> Redux
                </div>
              </div>
            </div>

            {/* Backend Development */}
            <div>
              <p className="font-semibold text-yellow-500 mb-1">Backend Development:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <FaNodeJs className="text-green-500" size={18} /> Node.js
                </div>
                <div className="flex items-center gap-2">
                  <SiExpress className="text-gray-400" size={18} /> Express
                </div>
                <div className="flex items-center gap-2">
                  <FaPython className="text-blue-400" size={18} /> Python
                </div>
                <div className="flex items-center gap-2">
                  <SiDjango className="text-green-700" size={18} /> Django
                </div>
                <div className="flex items-center gap-2">
                  <SiFlask className="text-gray-300" size={18} /> Flask
                </div>
                <div className="flex items-center gap-2">
                  <SiGraphql className="text-pink-600" size={18} /> GraphQL
                </div>
              </div>
            </div>

            {/* Database & Data */}
            <div>
              <p className="font-semibold text-blue-400 mb-1">Database & Data:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <SiMongodb className="text-green-500" size={18} /> MongoDB
                </div>
                <div className="flex items-center gap-2">
                  <SiPostgresql className="text-blue-500" size={18} /> PostgreSQL
                </div>
                <div className="flex items-center gap-2">
                  <SiMysql className="text-blue-700" size={18} /> MySQL
                </div>
                <div className="flex items-center gap-2">
                  <SiRedis className="text-red-500" size={18} /> Redis
                </div>
                <div className="flex items-center gap-2">
                  <FaDatabase className="text-green-400" size={18} /> SQL
                </div>
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div>
              <p className="font-semibold text-pink-400 mb-1">AI & Machine Learning:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <SiTensorflow className="text-orange-500" size={18} /> TensorFlow
                </div>
                <div className="flex items-center gap-2">
                  <SiPytorch className="text-red-500" size={18} /> PyTorch
                </div>
                <div className="flex items-center gap-2">
                  <SiScikitlearn className="text-orange-400" size={18} /> scikit-learn
                </div>
                <div className="flex items-center gap-2">
                  <SiHuggingface className="text-yellow-300" size={18} /> Hugging Face
                </div>
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div>
              <p className="font-semibold text-blue-400 mb-1">DevOps & Cloud:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <FaDocker className="text-blue-400" size={18} /> Docker
                </div>
                <div className="flex items-center gap-2">
                  <SiKubernetes className="text-blue-500" size={18} /> Kubernetes
                </div>
                <div className="flex items-center gap-2">
                  <FaAws className="text-orange-400" size={18} /> AWS
                </div>
                <div className="flex items-center gap-2">
                  <FaGoogle className="text-blue-400" size={18} /> GCP
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <p className="font-bold text-accent-light">Featured Projects:</p>
            <ul className="ml-4 mt-1">
              <li><span className="text-yellow-400">Project 1:</span> Multi-Threaded WebRTC Voice Agent</li>
              <li><span className="text-yellow-400">Project 2:</span> Conversational Text2SQL Assistant & Obsidian Console</li>
              <li><span className="text-yellow-400">Project 3:</span> Multi-Source RAG AI Assistant</li>
            </ul>
            <p className="mt-1">
              Type <span className="text-yellow-400">portfolio</span> to see detailed project information.
            </p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div>
            <p className="font-bold text-accent-light">Contact Information:</p>
            <p className="mt-1"><span className="text-yellow-400">Email:</span> kanuruvikranth@gmail.com</p>
            <p><span className="text-yellow-400">Phone:</span> +91 9398596589</p>
            <p><span className="text-yellow-400">LinkedIn:</span> linkedin.com/in/vikranthkanuru</p>
            <p><span className="text-yellow-400">GitHub:</span> github.com/saivikranth08</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'portfolio':
        output = <p>Redirecting to portfolio...</p>;
        setTimeout(() => {
          window.location.href = '/about';
        }, 1000);
        break;

      case 'resume':
        output = (
          <div className="font-mono text-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-blue-400">SAI VIKRANTH KANURU</h2>
              <p>AI Engineer | Generative AI Specialist</p>
              <p>kanuruvikranth@gmail.com | +91 9398596589 | Vizianagaram, Andhra Pradesh, India</p>
              <p>github.com/saivikranth08 | linkedin.com/in/vikranthkanuru</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-yellow-400">CAREER OBJECTIVE</h3>
              <p className="border-b border-gray-600 mb-2"></p>
              <p>B.Tech Electronics and Communication Engineering student building Generative AI and agentic systems, 
              particularly Retrieval-Augmented Generation (RAG) applications. Passionate about solving problems 
              end-to-end and developing production-grade AI solutions. Seeking an internship opportunity to contribute 
              to real-world AI projects and collaborate with engineering teams.</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-yellow-400">EDUCATION</h3>
              <p className="border-b border-gray-600 mb-2"></p>
              <p className="font-bold">B.Tech – Electronics and Communication Engineering</p>
              <p>MVGR College of Engineering, Vizianagaram | Expected May 2028</p>
              <p className="mb-2">CGPA: 7.2</p>

              <p className="font-bold">Intermediate – Science (MPC)</p>
              <p>Narayana Junior College, Vizianagaram | May 2024</p>
              <p className="mb-2">CGPA: 8.72</p>

              <p className="font-bold">Class 10 – SSC</p>
              <p>Fort City School, Vizianagaram | March 2022</p>
              <p>CGPA: 8.58</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-yellow-400">PROJECTS</h3>
              <p className="border-b border-gray-600 mb-2"></p>

              <p className="font-bold">Multi-Threaded WebRTC Voice Agent</p>
              <ul className="list-disc ml-4 mb-2">
                <li>Built sub-100ms voice assistant using LiveKit WebRTC, Silero VAD, Deepgram STT, LLaMA 3.3, and Edge TTS.</li>
                <li>Added voice-controlled browser automation with LangGraph workflows for website interaction and app triggers.</li>
                <li>Implemented PostgreSQL memory and Redis caching for preference learning and 2ms API response optimization.</li>
              </ul>

              <p className="font-bold">Conversational Text2SQL Assistant & Obsidian Console</p>
              <ul className="list-disc ml-4 mb-2">
                <li>Built natural language SQL assistant with intelligent routing and self-healing query execution.</li>
                <li>Added SQL security layers with destructive command blocking and sensitive data masking.</li>
                <li>Optimized Redis caching, connection pooling, and LangSmith tracing for query monitoring.</li>
              </ul>

              <p className="font-bold">Multi-Source RAG AI Assistant</p>
              <ul className="list-disc ml-4 mb-2">
                <li>Built document assistant supporting PDFs, websites, text files, and scanned documents using LlamaParse OCR.</li>
                <li>Implemented hybrid retrieval using semantic search, keyword matching, embeddings, and neural reranking.</li>
                <li>Designed LangGraph workflows with PostgreSQL memory and persistent conversation history.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-yellow-400">SKILLS</h3>
              <p className="border-b border-gray-600 mb-2"></p>
              <p><span className="font-bold">Programming:</span> Python, C, SQL (MySQL, PostgreSQL), HTML, CSS</p>
              <p><span className="font-bold">Frameworks & Libraries:</span> LangChain, LangGraph, HuggingFace, FastAPI, Streamlit, Playwright, FastMCP</p>
              <p><span className="font-bold">Databases & Retrieval:</span> PostgreSQL, MySQL, Redis, Qdrant, FAISS, Chroma</p>
              <p><span className="font-bold">AI/ML Concepts:</span> LLMs, Embeddings, RAG, Prompt Engineering, Speech-to-Text (STT), Text-to-Speech (TTS), WebRTC</p>
              <p><span className="font-bold">Tools & DevOps:</span> Docker, LangSmith, GitHub</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-yellow-400">CERTIFICATIONS</h3>
              <p className="border-b border-gray-600 mb-2"></p>
              <p>• Python Essentials 1 & 2 – Cisco Networking Academy</p>
              <p>• Quantum Foundations – Andhra Pradesh Government</p>
            </div>

            <div className="mt-4 text-center">
              <p>Type <span className="text-yellow-400">portfolio</span> to visit my portfolio website for more details</p>
            </div>
          </div>
        );
        break;

      case 'github':
        output = <p>Opening GitHub profile...</p>;
        window.open('https://github.com/saivikranth08', '_blank');
        break;

      case 'linkedin':
        output = <p>Opening LinkedIn profile...</p>;
        window.open('https://linkedin.com/in/vikranthkanuru', '_blank');
        break;

      case 'whoami':
        output = (
          <div>
            <p className="text-xl font-bold text-green-400 mb-2">Sai Vikranth Kanuru</p>
            <p className="text-gray-300">AI Engineer & Generative AI Specialist</p>
          </div>
        );
        break;

      case '':
        output = '';
        break;

      default:
        output = (
          <p className="text-red-500">
            Command not found: {command}. Type <span className="text-yellow-400">help</span> to see available commands.
          </p>
        );
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
    setInput('');
    setHistoryIndex(-1);
  };

  // Keep track of hydration to prevent typing before React is ready
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle key navigation and command execution
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        processCommand(input);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (osTheme) {
      case 'windows':
        return {
          bg: 'bg-black',
          text: 'text-white',
          prompt: 'C:\\Users\\vikranth>',
          fontFamily: 'font-mono',
          headerBg: 'bg-blue-900',
          headerText: 'text-white',
          title: 'Command Prompt',
        };
      case 'mac':
        return {
          bg: 'bg-black',
          text: 'text-green-400',
          prompt: 'vikranth@macbook ~ %',
          fontFamily: 'font-mono',
          headerBg: 'bg-gray-200 dark:bg-gray-800',
          headerText: 'text-gray-700 dark:text-gray-300',
          title: 'brew — zsh',
        };
      case 'linux':
      default:
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-100',
          prompt: 'vikranth@ubuntu:~$',
          fontFamily: 'font-mono',
          headerBg: 'bg-gray-800',
          headerText: 'text-gray-300',
          title: 'Terminal - bash',
        };
    }
  };

  const themeStyles = getThemeStyles();

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center perspective-container"
      ref={terminalContainerRef}
    >
      <ThemeToggle currentTheme={osTheme} onThemeChange={setOsTheme} />

      {/* Enhanced 3D Terminal */}
      <motion.div
        className={`w-full h-[65vh] overflow-hidden flex flex-col rounded-lg terminal-3d gradient-shadow ${themeStyles.bg} ${themeStyles.text} ${themeStyles.fontFamily}`}
        onClick={focusInput}
        initial={{ opacity: 1, y: 0, rotateX: 0 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          boxShadow: `
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(103, 232, 249, 0.1),
            inset 0 0 15px rgba(255, 255, 255, 0.05)
          `
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
      <TerminalHeader osTheme={osTheme} />

      {/* Add scan lines effect */}
      <ScanLines opacity={osTheme === 'mac' ? 0.1 : 0.15} />

      {isLoaded ? (
        <div
          ref={terminalRef}
          className="flex-grow overflow-y-auto p-4"
        >
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.input && (
                <TerminalPrompt input={item.input} prompt={themeStyles.prompt} />
              )}
              <TerminalOutput output={item.output} />
            </div>
          ))}

          <div className="flex items-center">
            <div className={`mr-2 ${osTheme === 'mac' ? 'text-green-400' : osTheme === 'windows' ? 'text-white' : 'text-purple-400'}`}>
              {themeStyles.prompt}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none flex-grow"
              readOnly={!mounted}
              placeholder={!mounted ? "Loading terminal..." : ""}
            />
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="text-lg">Initializing terminal...</div>
            <div className="mt-2 text-sm text-gray-400">Please wait</div>
          </div>
        </div>
      )}
      </motion.div>
    </div>
  );
};

export default Terminal;
