import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  Code2, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';
import type { CaseStudy } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({ caseStudy, onClose }) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#10121a] text-white border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Top Header */}
          <div className="sticky top-0 z-30 bg-[#161924]/95 backdrop-blur-md border-b border-white/10 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {caseStudy.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" /> {caseStudy.timeline}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                {caseStudy.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
                {caseStudy.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1 mr-2">
                  <Briefcase className="w-3.5 h-3.5" /> Role: {caseStudy.role}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">Tech Stack:</span>
                {caseStudy.tools.map((tool, i) => (
                  <span key={i} className="text-[11px] font-medium bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md text-gray-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-2xl border border-white/10">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">{m.label}</p>
                  <p className="text-2xl sm:text-3xl font-black text-white">{m.value}</p>
                  {m.change && (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> {m.change}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Problem & Solution Dual Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-bold text-base uppercase tracking-wider">The Business Challenge</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-bold text-base uppercase tracking-wider">The Analytical Solution</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Methodology Step-by-Step */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-orange-400" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Analytical Methodology & Workflow
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.methodology.map((m, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-orange-500/40 transition-colors">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
                        {m.step}
                      </span>
                      <h4 className="font-bold text-base text-white mb-2">{m.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippets Showcase */}
            {caseStudy.codeSnippets && caseStudy.codeSnippets.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    Code & Query Implementations
                  </h3>
                </div>
                <div className="space-y-6">
                  {caseStudy.codeSnippets.map((snippet, idx) => (
                    <div key={idx} className="bg-[#090b10] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                      <div className="bg-[#141720] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          {snippet.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-gray-400">
                          {snippet.language}
                        </span>
                      </div>
                      <div className="p-4 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed max-h-[280px]">
                        <pre><code>{snippet.code}</code></pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Measurable Business Impact & Learnings
              </h3>
              <ul className="space-y-3">
                {caseStudy.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                {caseStudy.githubUrl && (
                  <a
                    href={caseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" /> View on GitHub
                  </a>
                )}
                <a
                  href="mailto:anmol.krhjp@gmail.com?subject=Regarding%20Case%20Study:%20"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Discuss this Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-white font-medium"
              >
                Close Modal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
