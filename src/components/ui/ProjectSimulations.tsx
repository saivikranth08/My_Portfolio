'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDatabase, FaGithub, FaRobot, FaSearch, FaCheckCircle, FaExclamationTriangle, FaDownload } from 'react-icons/fa';

// --- 1. Text2SQL Simulation ---
export const Text2SQLSimulation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600)); setStep(1);
      await new Promise(r => setTimeout(r, 1200)); setStep(2);
      await new Promise(r => setTimeout(r, 1800)); setStep(3);
      await new Promise(r => setTimeout(r, 2200)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-[340px] bg-[#0d1117] rounded-xl overflow-hidden flex font-mono text-sm border border-gray-800 shadow-2xl relative">
      {/* Left Chat UI */}
      <div className="w-1/2 h-full flex flex-col border-r border-gray-800 bg-[#161b22] relative p-4">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
          <span className="font-bold text-gray-200 text-lg tracking-wider">Obsidian Console</span>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs flex items-center gap-1"><FaDatabase size={10}/> PG</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1"><FaDatabase size={10}/> Redis</span>
          </div>
        </div>

        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <span className="text-blue-400">User:</span> Show me the top 5 customers by total revenue this year.
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0d1117] border border-gray-700 rounded p-3 mt-4">
              <div className="text-blue-400 font-bold mb-2 flex items-center gap-2"><FaCheckCircle/> Query Generated</div>
              <div className="text-[10px] text-gray-300 font-mono leading-relaxed">
                <span className="text-pink-400">SELECT</span> customer_name, <span className="text-pink-400">SUM</span>(revenue) <span className="text-pink-400">AS</span> total<br/>
                <span className="text-pink-400">FROM</span> sales<br/>
                <span className="text-pink-400">GROUP BY</span> customer_name<br/>
                <span className="text-pink-400">ORDER BY</span> total <span className="text-pink-400">DESC LIMIT</span> 5;
              </div>
              <button className="mt-3 w-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/50 rounded py-1 flex items-center justify-center gap-2 transition-colors">
                <FaDownload /> Download CSV
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Terminal/Backend UI */}
      <div className="w-1/2 h-full p-4 bg-[#010409] text-gray-300 flex flex-col font-mono text-xs overflow-hidden relative">
        <div className="text-gray-500 mb-2">// LangSmith Backend Trace</div>
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1 mb-2">
              <div className="text-blue-300">[LangGraph] classify_intent: Data Analytics</div>
              <div className="text-gray-400">[LangGraph] generate_sql...</div>
              <div className="text-gray-400">[LangGraph] validate_ast...</div>
            </motion.div>
          )}
          {step >= 3 && step < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 mb-2">
              <div className="text-red-400 font-bold">[Error] column "revenue" does not exist</div>
              <div className="text-yellow-400">[Self-Heal] Re-entering generate_sql with error context...</div>
              <div className="text-blue-400">[Success] AST Validation Passed.</div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-auto border-t border-gray-800 pt-2 text-blue-400 font-bold bg-blue-900/20 p-2 rounded flex justify-between">
              <span>⚡ Redis CACHE HIT</span>
              <span>Latency: 2ms</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 2. Multi-Source RAG Simulation ---
export const RAGSimulation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600)); setStep(1); 
      await new Promise(r => setTimeout(r, 1200)); setStep(2); 
      await new Promise(r => setTimeout(r, 1800)); setStep(3); 
      await new Promise(r => setTimeout(r, 2200)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-[340px] bg-[#0d1117] rounded-xl overflow-hidden flex font-mono text-sm border border-gray-800 shadow-2xl relative">
      <div className="w-1/2 h-full bg-[#161b22] p-4 flex flex-col border-r border-gray-800 relative">
        <div className="text-center text-gray-400 font-semibold mb-4 border-b border-gray-700 pb-2">RAG Workspace</div>
        
        {step < 1 ? (
           <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg text-gray-500">
             Drag & Drop Scanned PDF
           </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-grow flex flex-col">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 text-blue-300 mb-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-t-blue-400 animate-spin"></div>
              Processing PDF Layouts...
            </div>
            <AnimatePresence>
              {step >= 4 && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gray-800/50 rounded p-3 mt-auto">
                  <div className="text-white font-bold mb-1">Q: Can you rate these projects?</div>
                  <div className="text-gray-300 text-xs">Based on the analysis, the projects exceed enterprise standards...</div>
                  <div className="mt-2 text-xs text-blue-400 cursor-pointer">📚 View 3 Sources</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <div className="w-1/2 h-full bg-black p-4 text-blue-400 flex flex-col text-xs space-y-1 relative overflow-hidden">
        <div className="text-gray-500 mb-2 border-b border-gray-800 pb-1">FastAPI Terminal</div>
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
              <div>[INFO] Routing scanned PDF to LlamaParse Cloud OCR...</div>
              <div className="text-yellow-300">[INFO] Extracted 15 tabular structures cleanly.</div>
              <div>[INFO] Added 42 chunks to Qdrant Vectorstore.</div>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-4 bg-gray-900 border border-gray-700 p-2 rounded">
              <div className="text-blue-300 font-bold border-b border-gray-700 pb-1 mb-1">LangGraph Trace</div>
              <div>➔ <span className="text-gray-400">retrieve (Qdrant + BM25)</span></div>
              <div className="text-purple-400">➔ Cohere Rerank: Filtering 10 chunks to Top 3</div>
              <div>➔ <span className="text-gray-400">generate</span></div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-blue-300">
              [SQLAlchemy] COMMIT row to chat_messages...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 3. PR Review Simulation ---
export const PRReviewSimulation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600)); setStep(1);
      await new Promise(r => setTimeout(r, 1200)); setStep(2);
      await new Promise(r => setTimeout(r, 1800)); setStep(3);
      await new Promise(r => setTimeout(r, 2200)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-[340px] bg-[#0d1117] rounded-xl overflow-hidden flex font-mono text-sm border border-gray-800 shadow-2xl relative">
      <div className="w-1/2 h-full bg-[#161b22] p-4 border-r border-gray-800 flex flex-col text-gray-300 relative">
        <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
          <FaGithub size={20} /> <span className="font-bold">saivikranth08 / core-api</span>
        </div>
        
        <div className="bg-[#0d1117] border border-gray-800 rounded p-3 mb-4">
          <div className="font-semibold text-gray-300 mb-1">Update database.py</div>
          <div className="text-[10px] bg-red-900/20 text-red-400 p-2 rounded mt-2 border border-red-900/50 font-mono leading-relaxed">
            + cursor.execute(f"SELECT * FROM users WHERE id = {'{user_id}'}")<br/>
            + for item in items:<br/>
            + &nbsp;&nbsp;&nbsp;&nbsp;time.sleep(1) # simulate work
          </div>
          {step < 1 && (
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-xs transition-colors">
              Create pull request
            </button>
          )}
        </div>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-blue-900/50 bg-blue-900/20 rounded p-3 mt-auto relative">
               <div className="absolute -top-3 -left-3 bg-blue-600 text-white p-1.5 rounded-full"><FaRobot size={12}/></div>
               <div className="font-bold text-blue-300 text-xs mb-1">Autonomous Agent Review</div>
               <div className="text-xs text-gray-300">
                 <strong className="text-red-400">High Severity:</strong> SQL Injection vulnerability detected on line 42. Use parameterized queries.<br/><br/>
                 <strong className="text-yellow-400">Performance:</strong> O(N) database lock detected in loop.
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-1/2 h-full bg-[#1e1e1e] p-4 text-gray-300 flex flex-col text-xs space-y-1 relative overflow-hidden font-mono">
        <div className="text-gray-500 mb-2 border-b border-gray-700 pb-1">FastAPI Gateway & Celery</div>
        
        {step >= 1 && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-blue-400">[Webhook] POST /github-event HTTP 202 Accepted</motion.div>}
        
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-2 space-y-2">
              <div className="text-blue-300">[Celery] Task received. Launching LangGraph...</div>
              <div className="bg-gray-800 p-2 rounded border border-gray-700 flex flex-col gap-1">
                 <div className="text-white font-bold text-[10px]">Parallel Llama-3 Agents Running:</div>
                 <div className="flex gap-2">
                   <div className="bg-red-900/50 text-red-300 px-1 rounded animate-pulse">Security Agent</div>
                   <div className="bg-purple-900/50 text-purple-300 px-1 rounded animate-pulse">Style Agent</div>
                   <div className="bg-yellow-900/50 text-yellow-300 px-1 rounded animate-pulse">Perf Agent</div>
                 </div>
              </div>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="text-blue-400">[Qdrant] RAG Memory Context Retrieved.</div>
              <div className="text-yellow-400 font-bold border border-yellow-700 bg-yellow-900/20 p-1 rounded mt-1">
                LLM-as-a-Judge: confidence_score=0.95
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 4. WebRTC Voice Simulation ---
export const XYRASimulation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600)); setStep(1); 
      await new Promise(r => setTimeout(r, 1200)); setStep(2);
      await new Promise(r => setTimeout(r, 1800)); setStep(3);
      await new Promise(r => setTimeout(r, 2200)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-[340px] bg-[#0a0a0a] rounded-xl overflow-hidden flex font-mono text-sm border border-gray-800 shadow-2xl relative">
      <div className="w-1/2 h-full flex flex-col items-center justify-center border-r border-gray-800 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black overflow-hidden">
        
        {/* Holographic Globe Placeholder */}
        <motion.div 
          animate={{ rotate: 360, scale: step >= 1 ? [1, 1.1, 1] : 1 }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5, repeat: step >= 1 ? Infinity : 0 } }}
          className="w-32 h-32 rounded-full border border-cyan-500/50 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        >
           <div className="w-full h-[1px] bg-cyan-500/30 absolute"></div>
           <div className="h-full w-[1px] bg-cyan-500/30 absolute"></div>
           {step >= 1 && <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping"></div>}
        </motion.div>

        {step < 1 && (
          <button className="mt-8 bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 px-6 py-2 rounded-full hover:bg-cyan-600/40 transition-colors">
            Connect LiveKit
          </button>
        )}
        
        {step >= 1 && (
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-500 text-xs font-bold">CONNECTED</span>
          </div>
        )}

        <AnimatePresence>
          {step >= 2 && step < 4 && (
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl w-48 shadow-xl">
               <div className="text-cyan-300 font-bold mb-1">Chennai Weather</div>
               <div className="text-white text-2xl font-light">32°C</div>
               <div className="text-gray-300 text-xs mt-1">Humidity: 78%</div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl w-48 shadow-xl">
               <div className="text-blue-300 font-bold mb-1 flex items-center gap-2"><FaSearch size={10}/> OpenAI News</div>
               <div className="text-gray-200 text-xs line-clamp-3">OpenAI just released a new model update focusing on reasoning capabilities and lower latency API endpoints...</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-1/2 h-full bg-[#050505] p-4 text-gray-300 flex flex-col text-xs space-y-1 relative overflow-hidden font-mono">
        <div className="text-gray-500 mb-2 border-b border-gray-800 pb-1">LiveKit Backend Logger</div>
        
        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
              <div className="text-blue-400">[Voice Input] "Hi XYRA, what is the weather in Chennai?"</div>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-2 space-y-1">
              <div className="text-yellow-400">[Tool Trigger] get_weather(location='Chennai')</div>
              <div className="text-cyan-400">[WebRTC Data Channel] Broadcasting UI Event: weather_widget</div>
            </motion.div>
          )}
          {step >= 3 && step < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 border border-blue-800 bg-blue-900/20 p-2 rounded">
              <div className="text-blue-400 font-bold">[Cache HIT] Redis cache HIT for weather in: 'chennai'</div>
              <div className="text-blue-500">Latency: 2ms (Bypassed API)</div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-1">
               <div className="text-blue-400">[Voice Input] "Search for the latest news on OpenAI."</div>
               <div className="text-purple-400">[Playwright] Launching headless browser...</div>
               <div className="text-purple-400">[Playwright] Stripping scripts & style tags...</div>
               <div className="text-rose-400">[Optimizer] Pruned chat context to maintain TPM limits.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
