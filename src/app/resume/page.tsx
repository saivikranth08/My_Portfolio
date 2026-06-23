'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FaDownload, FaEye, FaGraduationCap, FaBriefcase, FaCode, FaCertificate, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResumePage = () => {
  const resumeUrl = '/Sai_Vikranth_Kanuru_Resume.pdf'; // Link to PDF in public folder
  const resumeDownloadUrl = '/Sai_Vikranth_Kanuru_Resume.pdf'; // Link to PDF in public folder for download

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Resume/CV</h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye className="mr-2" /> View Resume
            </motion.a>
            <motion.a
              href={resumeDownloadUrl}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 shadow-md hover:shadow-lg transition-all duration-300"
              download="Sai_Vikranth_Kanuru_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="mr-2" /> Download Resume
            </motion.a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center md:text-left border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">SAI VIKRANTH KANURU</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mt-1">AI Engineer | Generative AI Specialist</p>
              <div className="text-gray-600 dark:text-gray-400 mt-3 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm">
                <span>kanuruvikranth@gmail.com</span>
                <span className="hidden md:inline">•</span>
                <span>+91 9398596589</span>
                <span className="hidden md:inline">•</span>
                <a href="https://www.linkedin.com/in/vikranthkanuru" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>
                <span className="hidden md:inline">•</span>
                <a href="https://github.com/saivikranth08" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaInfoCircle className="mr-3 text-blue-600 dark:text-blue-400" /> Career Objective
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                B.Tech Electronics and Communication Engineering student building Generative AI and agentic systems, 
                particularly Retrieval-Augmented Generation (RAG) applications. Passionate about solving problems 
                end-to-end and developing production-grade AI solutions. Seeking an internship opportunity to contribute 
                to real-world AI projects and collaborate with engineering teams.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaCode className="mr-3 text-blue-600 dark:text-blue-400" /> Technical Skills
              </h3>
              <div className="space-y-3 text-sm sm:text-base">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-800 dark:text-gray-200">Programming:</strong> Python, C, SQL (MySQL, PostgreSQL), HTML, CSS
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-800 dark:text-gray-200">Frameworks & Libraries:</strong> LangChain, LangGraph, HuggingFace, FastAPI, Streamlit, Playwright, FastMCP
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-800 dark:text-gray-200">Databases & Retrieval:</strong> PostgreSQL, MySQL, Redis, Qdrant, FAISS, Chroma
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-800 dark:text-gray-200">AI/ML Concepts:</strong> LLMs, Embeddings, RAG, Prompt Engineering, Speech-to-Text (STT), Text-to-Speech (TTS), WebRTC
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-800 dark:text-gray-200">Tools:</strong> Docker, LangSmith, GitHub
                </p>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaBriefcase className="mr-3 text-blue-600 dark:text-blue-400" /> Projects
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Multi-Threaded WebRTC Voice Agent</h4>
                  <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <li>Built sub-100ms voice assistant using LiveKit WebRTC, Silero VAD, Deepgram STT, LLaMA 3.3, and Edge TTS.</li>
                    <li>Added voice-controlled browser automation with LangGraph workflows for website interaction and app triggers.</li>
                    <li>Implemented PostgreSQL memory and Redis caching for preference learning and 2ms API response optimization.</li>
                    <li>Created real-time 3D holographic UI using Three.js with WebRTC data synchronization.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Conversational Text2SQL Assistant & Obsidian Console</h4>
                  <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <li>Built natural language SQL assistant with intelligent routing and self-healing query execution.</li>
                    <li>Added SQL security layers with destructive command blocking and sensitive data masking.</li>
                    <li>Optimized Redis caching, connection pooling, and LangSmith tracing for query monitoring.</li>
                    <li>Developed console with live statistics, exports, and MySQL-to-PostgreSQL dialect conversion.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Multi-Source RAG AI Assistant</h4>
                  <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <li>Built document assistant supporting PDFs, websites, text files, and scanned documents using LlamaParse OCR.</li>
                    <li>Implemented hybrid retrieval using semantic search, keyword matching, embeddings, and neural reranking.</li>
                    <li>Designed LangGraph workflows with PostgreSQL memory and persistent conversation history.</li>
                    <li>Built telemetry dashboards with retrieval metrics, audit trails, and LangSmith integration.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaGraduationCap className="mr-3 text-blue-600 dark:text-blue-400" /> Education
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">Bachelor of Technology – Electronics and Communication Engineering</p>
                    <p className="text-gray-700 dark:text-gray-300">MVGR College of Engineering, Vizianagaram</p>
                  </div>
                  <div className="sm:text-right mt-1 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                    <p>Expected May 2028</p>
                    <p className="font-semibold">CGPA: 7.2</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">Intermediate – Science (MPC)</p>
                    <p className="text-gray-700 dark:text-gray-300">Narayana Junior College, Vizianagaram</p>
                  </div>
                  <div className="sm:text-right mt-1 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                    <p>May 2024</p>
                    <p className="font-semibold">CGPA: 8.72</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">Class 10 – SSC</p>
                    <p className="text-gray-700 dark:text-gray-300">Fort City School, Vizianagaram</p>
                  </div>
                  <div className="sm:text-right mt-1 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                    <p>March 2022</p>
                    <p className="font-semibold">CGPA: 8.58</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaCertificate className="mr-3 text-blue-600 dark:text-blue-400" /> Certifications
              </h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <li>Python Essentials 1 & 2 – Cisco Networking Academy</li>
                <li>Quantum Foundations – Andhra Pradesh Government</li>
              </ul>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 mb-3 flex items-center">
                <FaInfoCircle className="mr-3 text-blue-600 dark:text-blue-400" /> Additional Information
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">Areas of Interest:</strong> Generative AI, Information Retrieval, Agentic Systems, System Design, DSA
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">Strengths:</strong> Problem-solving, analytical thinking, system-oriented approach, rapid learning, adaptability, and teamwork.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ResumePage;
