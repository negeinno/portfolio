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
  ArrowRight,
  Sparkles,
  Maximize2
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-white text-slate-800 border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Top Header */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-orange-50 text-orange-600 border border-orange-200">
                {caseStudy.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" /> {caseStudy.timeline}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
                {caseStudy.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {caseStudy.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mr-2">
                  <Briefcase className="w-3.5 h-3.5 text-orange-500" /> Role: {caseStudy.role}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">Tech Stack:</span>
                {caseStudy.tools.map((tool, i) => (
                  <span key={i} className="text-[11px] font-medium bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md text-slate-700 font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* High-Resolution Dashboard Visual Showcase */}
            {caseStudy.image && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg group">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[11px] font-mono text-orange-600 flex items-center gap-1.5 font-bold shadow-xs">
                  <Maximize2 className="w-3 h-3" /> Production BI Dashboard Interface
                </div>
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title} 
                  className="w-full max-h-[460px] object-cover object-top group-hover:scale-[1.01] transition-transform duration-700" 
                />
              </div>
            )}

            {/* Behind-the-Scenes Human Analyst Notes */}
            {caseStudy.analystNotes && (
              <div className="bg-orange-50/80 border-l-4 border-orange-500 p-5 rounded-r-2xl border border-orange-200/60">
                <div className="flex items-center gap-2 text-orange-600 font-mono text-xs uppercase font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Anmol's Field Notes • Behind The Scenes</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{caseStudy.analystNotes}"
                </p>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">{m.label}</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">{m.value}</p>
                  {m.change && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> {m.change}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Problem & Solution Dual Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50/70 border border-red-200 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-bold text-base uppercase tracking-wider">The Business Challenge</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-bold text-base uppercase tracking-wider">The Analytical Solution</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Methodology Step-by-Step */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                  Analytical Methodology & Workflow
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.methodology.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between hover:border-orange-400 transition-colors">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
                        {m.step}
                      </span>
                      <h4 className="font-bold text-base text-slate-900 mb-2">{m.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippets Showcase */}
            {caseStudy.codeSnippets && caseStudy.codeSnippets.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                    Code & Query Implementations
                  </h3>
                </div>
                <div className="space-y-6">
                  {caseStudy.codeSnippets.map((snippet, idx) => (
                    <div key={idx} className="bg-[#0c1017] border border-slate-300 rounded-2xl overflow-hidden shadow-md">
                      <div className="bg-[#141a24] px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          {snippet.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {snippet.language}
                        </span>
                      </div>
                      <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[280px]">
                        <pre><code>{snippet.code}</code></pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Measurable Business Impact & Learnings
              </h3>
              <ul className="space-y-3">
                {caseStudy.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                {caseStudy.githubUrl && (
                  <a
                    href={caseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" /> View on GitHub
                  </a>
                )}
                <a
                  href="mailto:anmol.krhjp@gmail.com?subject=Regarding%20Case%20Study:%20"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  Discuss this Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
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
