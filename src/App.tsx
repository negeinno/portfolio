import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Award, 
  GraduationCap, 
  Users, 
  ChevronRight,
  Filter,
  Maximize2,
  Eye,
  FileCheck2,
  Workflow
} from 'lucide-react';

import { 
  PERSONAL_INFO, 
  CORE_KPIS, 
  TECHNICAL_SKILLS, 
  CASE_STUDIES, 
  CERTIFICATIONS, 
  EDUCATION, 
  DATA_METHODOLOGY_STEPS
} from './data/portfolioData';
import type { CaseStudy } from './data/portfolioData';

import { 
  SalesDashboardVisualizer, 
  HRWorkforceVisualizer, 
  CodeQueryExplorer 
} from './components/InteractiveDataVisuals';

import { CaseStudyDetailModal } from './components/CaseStudyDetailModal';
import { LinkedinIcon, GithubIcon } from './components/Icons';

// --- Shared UI Elements ---

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Subtle Data Grid Mesh */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '36px 36px'
      }}
    />
    {/* Ambient Glows */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
  </div>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/work' },
    { name: 'Data Skills', path: '/skills' },
    { name: 'About & Leadership', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0d14]/85 border-b border-white/10 px-6 md:px-12 py-4 text-white transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#eb5939] to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              AK
            </div>
            <div>
              <span className="text-base font-bold tracking-tight block leading-tight">Anmol Kumar</span>
              <span className="text-[10px] text-orange-400 font-mono tracking-wider uppercase block">Data Analyst • BI</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors py-1 relative ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#eb5939] rounded-full" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#eb5939] hover:bg-[#d64b2d] text-white shadow-lg shadow-orange-500/20 transition-all"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0c0e16]/98 backdrop-blur-2xl flex flex-col justify-center items-center px-6 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold uppercase tracking-tight text-white hover:text-[#eb5939] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/15 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Resume PDF
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-[#eb5939] text-white flex items-center justify-center gap-2"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#08090f] text-white border-t border-white/10 py-12 px-6 md:px-12 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#eb5939] flex items-center justify-center text-xs font-black text-white">
            AK
          </div>
          <span className="font-bold text-base">Anmol Kumar</span>
          <span className="text-gray-500">•</span>
          <span className="text-xs text-gray-400 font-mono">Data Analyst Portfolio</span>
        </div>
        <p className="text-xs text-gray-400 max-w-md leading-relaxed">
          Transforming messy datasets into clear business decisions through SQL, Python, Power BI, and AI-assisted analytics.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
        <a href="mailto:anmol.krhjp@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-orange-400" /> anmol.krhjp@gmail.com
        </a>
        <a href="https://linkedin.com/in/anmol-kumar4" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
          <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
        </a>
        <a href="https://github.com/negeinno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
          <GithubIcon className="w-3.5 h-3.5 text-gray-300" /> GitHub
        </a>
        <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5 text-emerald-400" /> Resume PDF
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
      <p>© 2026 Anmol Kumar. Built with precision, data empathy & React.</p>
      <p className="flex items-center gap-2 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Based in Bengaluru, Karnataka • Ready to Relocate
      </p>
    </div>
  </footer>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="relative z-10 flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

// --- PAGES ---

// 1. HOME PAGE
const Home = ({ onSelectCaseStudy }: { onSelectCaseStudy: (study: CaseStudy) => void }) => {
  const [salesViewMode, setSalesViewMode] = useState<'interactive' | 'screenshot'>('interactive');

  return (
    <PageTransition>
      <div className="w-full text-white">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 px-6 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Bio */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#eb5939] animate-pulse"></span>
                Seeking Entry-Level Data Analyst & BI Roles
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
                Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Raw Data</span> Into High-Impact Business Decisions.
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
                Hello! I am <span className="text-white font-semibold">Anmol Kumar</span>, a Computer Science graduate specialized in 
                <span className="text-orange-400 font-medium"> SQL</span>, 
                <span className="text-orange-400 font-medium"> Python</span>, 
                <span className="text-orange-400 font-medium"> Power BI</span>, and 
                <span className="text-orange-400 font-medium"> AI-assisted Analytics</span>. I build robust data pipelines, design Star Schema data models, and engineer executive dashboards that cut through reporting noise.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/work"
                  className="px-6 py-3.5 rounded-xl bg-[#eb5939] hover:bg-[#d64b2d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-orange-500/20 transition-all hover:gap-3"
                >
                  Explore Case Studies <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider border border-white/15 flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
                <Link
                  to="/contact"
                  className="px-5 py-3.5 rounded-xl text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  Contact Me <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Contact & Location Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-400 border-t border-white/10 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" /> Bengaluru, Karnataka
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Chandigarh University (CGPA: 7.66)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cisco & IBM Certified
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Image & Telemetry Cards */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Background Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-indigo-500/10 rounded-full blur-3xl transform scale-90" />
              
              <div className="relative w-full max-w-[400px]">
                {/* Image Frame */}
                <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-white/15 bg-gradient-to-b from-[#1c1f2e] to-[#0e1018] shadow-2xl">
                  <img
                    src="/anmol-ai.png"
                    alt="Anmol Kumar - Data Analyst"
                    className="w-full h-[430px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Identity Strip */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#141722]/90 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Anmol Kumar</p>
                        <p className="text-[10px] text-gray-400">Data Analyst & BI Specialist</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Available Now
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Telemetry Card 1 - Top Left */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -left-6 z-20 bg-[#161924]/95 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow-xl hidden sm:flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">Primary Focus</p>
                    <p className="text-xs font-bold text-white">Power BI DAX & SQL</p>
                  </div>
                </motion.div>

                {/* Floating Telemetry Card 2 - Bottom Right */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -right-6 z-20 bg-[#161924]/95 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow-xl hidden sm:flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">AI Augmentation</p>
                    <p className="text-xs font-bold text-white">Automated Reporting</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* Live Core KPI Strip */}
        <section className="bg-[#0e1019] py-10 px-6 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_KPIS.map((kpi, idx) => (
              <div 
                key={idx}
                className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all hover:-translate-y-1"
              >
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {kpi.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mt-1">
                  {kpi.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {kpi.subtext}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Live Visualizer: AI Sales Insights Dashboard */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
                  Featured Case Study Showcase
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  AI Sales Executive Intelligence Dashboard
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mt-2">
                  Engineered using SQL, Python, Excel, and Power BI. Experience both the live interactive data model simulator and the production dashboard interface.
                </p>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start md:self-auto">
                <button
                  onClick={() => setSalesViewMode('interactive')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    salesViewMode === 'interactive'
                      ? 'bg-[#eb5939] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5" /> Interactive Model
                </button>
                <button
                  onClick={() => setSalesViewMode('screenshot')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    salesViewMode === 'screenshot'
                      ? 'bg-[#eb5939] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> BI Dashboard UI
                </button>
                <button
                  onClick={() => onSelectCaseStudy(CASE_STUDIES[0])}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-400 hover:text-orange-300 ml-1 border-l border-white/10 pl-2"
                >
                  Full Breakdown →
                </button>
              </div>
            </div>

            {/* View container */}
            {salesViewMode === 'interactive' ? (
              <SalesDashboardVisualizer />
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group cursor-pointer" onClick={() => onSelectCaseStudy(CASE_STUDIES[0])}>
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono text-orange-400 flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5" /> Production Power BI Multi-Regional Analytics Screen
                </div>
                <img 
                  src="/case-studies/sales-dashboard.jpg" 
                  alt="Sales Dashboard UI" 
                  className="w-full max-h-[580px] object-cover object-top group-hover:scale-[1.01] transition-transform duration-500" 
                />
              </div>
            )}
          </div>
        </section>

        {/* Featured Case Studies Grid with Visual Artwork */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                Selected Data Case Studies
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Detailed breakdowns demonstrating business problem scoping, SQL data mart modeling, Python preprocessing, and executive storytelling with real dashboard deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  onClick={() => onSelectCaseStudy(study)}
                  className="group bg-[#11131e] rounded-3xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview Image */}
                    {study.image && (
                      <div className="relative h-52 w-full overflow-hidden border-b border-white/10 bg-black/50">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11131e] via-transparent to-transparent opacity-80" />
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-orange-400 border border-white/15">
                            {study.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-4 z-10 text-xs font-mono text-gray-300 bg-black/70 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/10">
                          {study.timeline}
                        </div>
                      </div>
                    )}

                    <div className="p-7 space-y-5">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                          {study.subtitle}
                        </p>
                      </div>

                      {/* Behind The Scenes Quote */}
                      {study.analystNotes && (
                        <div className="bg-white/5 border-l-2 border-orange-400 p-3 rounded-r-xl text-xs text-gray-300 italic line-clamp-2">
                          "{study.analystNotes}"
                        </div>
                      )}

                      {/* Quick Metric Highlights */}
                      <div className="grid grid-cols-2 gap-3">
                        {study.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="bg-black/40 p-3 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-400 font-mono uppercase">{m.label}</p>
                            <p className="text-xl font-black text-white mt-0.5">{m.value}</p>
                            {m.change && <p className="text-[10px] text-emerald-400 font-bold">{m.change}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Tools Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {study.tools.map((tool, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-medium bg-black/40 text-gray-300 px-2 py-0.5 rounded border border-white/10">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="px-7 py-4 bg-[#161926] border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white group-hover:bg-orange-500 transition-colors">
                    <span>View In-Depth Breakdown</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/15 transition-all"
              >
                Browse All Case Studies & Code Explorer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6-Step Data Analytics Methodology with Architecture Visual */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#090b12] border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
                Analytical Framework & Pipeline
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                End-To-End Data Architecture Flow
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                A structured, disciplined methodology ensuring every analysis produces dependable, verifiable, and actionable business intelligence.
              </p>
            </div>

            {/* Architecture Visual Diagram */}
            <div className="mb-14 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
              <img 
                src="/case-studies/pipeline-architecture.jpg" 
                alt="Data Pipeline Flow Diagram" 
                className="w-full max-h-[440px] object-cover object-center" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA_METHODOLOGY_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#12141e] p-6 rounded-2xl border border-white/10 hover:border-orange-500/40 transition-colors relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-orange-400/80">
                        {step.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Human Philosophy Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-white/10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-950/30 via-[#151825] to-indigo-950/30 p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-orange-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Philosophy & Human Perspective</span>
              </div>
              <blockquote className="text-xl sm:text-3xl font-black text-white leading-snug">
                "{PERSONAL_INFO.philosophy}"
              </blockquote>
              <p className="text-sm text-gray-300 leading-relaxed">
                As a Computer Science graduate with hands-on technical foundations in SQL, relational databases, and Python, I do not just treat data as numbers. I treat each metric as representing real customer behaviors, real employee careers, and real revenue opportunities. That human bridge is what makes analytics powerful.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Read My Full Story & Leadership Role
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/15 transition-colors"
                >
                  Schedule an Interview
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

// 2. CASE STUDIES & WORK PAGE
const Work = ({ onSelectCaseStudy }: { onSelectCaseStudy: (study: CaseStudy) => void }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Business Intelligence' | 'Python & EDA' | 'SQL & Data Modeling'>('All');

  const filteredStudies = activeFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === activeFilter);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-white w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
            Portfolio Work & Case Studies
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Data Case Studies & Deep-Dives
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            Each case study outlines the full lifecycle: business context, raw data hygiene, SQL star-schema modeling, Python exploratory data analysis, and Power BI executive scorecards with verified deliverables.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          <span className="text-xs text-gray-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter By:
          </span>
          {(['All', 'Business Intelligence', 'Python & EDA', 'SQL & Data Modeling'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-[#eb5939] text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Study Cards */}
        <div className="space-y-16 mb-20">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-[#11131c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Image banner */}
              {study.image && (
                <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-white/10 bg-black/60 group">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131c] via-black/30 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-orange-400 border border-white/15">
                      {study.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 z-10 flex justify-between items-end">
                    <p className="text-xs font-mono text-gray-300 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      Deliverable: Production Power BI & Python Solution
                    </p>
                    <button
                      onClick={() => onSelectCaseStudy(study)}
                      className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-orange-500/20"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Enlarge
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-10">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <span className="text-xs text-gray-400 font-mono">
                    Timeline: {study.timeline}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Role: {study.role}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  {study.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 font-medium">
                  {study.subtitle}
                </p>

                {/* Behind the scenes personal note */}
                {study.analystNotes && (
                  <div className="bg-gradient-to-r from-orange-950/20 to-transparent border-l-3 border-orange-500 p-4 rounded-r-xl mb-6 text-xs sm:text-sm text-gray-300 italic">
                    <span className="text-orange-400 font-bold block not-italic uppercase font-mono text-[11px] mb-1">
                      Analyst Reflection:
                    </span>
                    "{study.analystNotes}"
                  </div>
                )}

                {/* Metrics Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5">
                      <p className="text-[10px] text-gray-400 font-mono uppercase">{m.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{m.value}</p>
                      {m.change && (
                        <p className="text-[11px] font-bold text-emerald-400 mt-0.5">{m.change}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Problem vs Solution Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="font-bold text-red-400 uppercase tracking-wider block mb-1">
                      Problem Context:
                    </span>
                    <p className="line-clamp-3 leading-relaxed">{study.problem}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Analytical Solution:
                    </span>
                    <p className="line-clamp-3 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Tools & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tools.map((t, i) => (
                      <span key={i} className="text-[11px] font-medium bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectCaseStudy(study)}
                    className="px-5 py-2.5 rounded-xl bg-[#eb5939] hover:bg-[#d64b2d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
                  >
                    Launch Full Interactive Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Visualizer: HR Workforce Analytics in Depth */}
        <div className="mb-20">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400 block mb-1">
              Interactive People Analytics Preview
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              HR Workforce Retention Visualizer
            </h2>
          </div>
          <HRWorkforceVisualizer />
        </div>

        {/* Interactive Query & Code Sandbox */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-1">
              Code & Query Repository
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Production Scripts, CTEs & DAX Formulas
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Inspect real queries and scripts written for data sanitization, RFM scoring, and variance reporting.
            </p>
          </div>
          <CodeQueryExplorer />
        </div>

      </div>
    </PageTransition>
  );
};

// 3. SKILLS & CAPABILITIES PAGE
const Skills = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-white w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
            Technical Proficiency Matrix
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Data Tools, Languages & Methodologies
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            From low-level SQL queries and Python data frames to executive Power BI dashboards and prompt-engineered summaries, here is a comprehensive breakdown of my capabilities.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TECHNICAL_SKILLS.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-[#11131c] p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base uppercase tracking-tight text-white">
                    {cat.category}
                  </h3>
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills list with progress */}
                <div className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-medium text-gray-200">{skill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-orange-400 border border-white/5">
                          {skill.tag}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tool Stack Badges */}
        <div className="bg-[#12141f] p-8 sm:p-10 rounded-3xl border border-white/10 mb-16">
          <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-orange-400" />
            Software & Environment Ecosystem
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              { name: 'MySQL', category: 'Relational DB' },
              { name: 'Python 3', category: 'Analytics Core' },
              { name: 'Power BI', category: 'BI & Modeling' },
              { name: 'MS Excel', category: 'Spreadsheets' },
              { name: 'Pandas', category: 'Data Munging' },
              { name: 'NumPy', category: 'Vector Math' },
              { name: 'Matplotlib', category: 'Visualization' },
              { name: 'Jupyter', category: 'Notebook EDA' },
              { name: 'Git & GitHub', category: 'Version Control' },
              { name: 'VS Code', category: 'IDE' },
              { name: 'DAX', category: 'Data Analysis Expr' },
              { name: 'Prompt Eng.', category: 'AI Summaries' },
            ].map((tool, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                <p className="font-bold text-xs text-white">{tool.name}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{tool.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-orange-600/20 to-indigo-600/20 p-8 rounded-3xl border border-white/15">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
            Have a Data Challenge or Open Role?
          </h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto mb-6">
            I am eager to contribute clean code, structured SQL queries, and sharp analytical insights to your team.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#eb5939] hover:bg-[#d64b2d] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
          >
            Connect with Anmol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};

// 4. ABOUT & LEADERSHIP PAGE - VIBRANT COLOR PHOTO & HUMAN NARRATIVE
const About = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-white w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
            The Analyst & Coordinator
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Anmol Kumar
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            Computer Science Graduate • Data Analyst • Academic Class Representative
          </p>
        </div>

        {/* Main Grid: Story & Vibrant Colorful Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Colorful Vibrant Photo Card */}
          <div className="lg:col-span-5 relative group">
            {/* Colorful Ambient Glow Layer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700" />
            
            <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-white/20 bg-[#12141e] shadow-2xl">
              {/* True Full-Color Image (No Grayscale!) */}
              <img
                src="/about-pic.jpg"
                alt="Anmol Kumar - Full Color Portrait"
                className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Vibrant Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-black/90 to-[#12141e]/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-white">Anmol Kumar</p>
                    <p className="text-[11px] text-orange-400 font-mono">Chandigarh University CSE (2022–2026)</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Text & Human Context */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-snug">
              Passionate about turning raw data into meaningful business intelligence.
            </h2>
            <p>
              {PERSONAL_INFO.bio}
            </p>
            <p>
              Throughout my degree at Chandigarh University (<span className="text-white font-semibold">CGPA 7.66 / 10</span>), I cultivated strong foundations in relational database management, data structures, and statistical reasoning. I quickly realized that the greatest superpower in modern organizations is the ability to turn disparate, unstandardized transactional logs into clear, actionable stories that non-technical leaders can act on immediately.
            </p>
            <p>
              In addition to traditional analytics, I have actively mastered AI-assisted data analysis and prompt engineering to accelerate report compilation, automate data anomalies summarization, and craft executive briefings in minutes rather than days.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Education</span>
                <span className="font-bold text-white block">B.E. Computer Science</span>
                <span className="text-gray-400">Chandigarh University (CGPA 7.66)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Location</span>
                <span className="font-bold text-white block">Bengaluru, Karnataka</span>
                <span className="text-gray-400">Available across India & Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Spotlight: Academic Class Representative */}
        <div className="bg-[#11131c] rounded-3xl border border-white/10 p-8 sm:p-12 mb-20">
          <div className="flex items-center gap-3 text-orange-400 mb-4">
            <Users className="w-6 h-6" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">
              Leadership Experience • 2024 – 2025
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Academic Class Representative (70+ Students)
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 max-w-3xl">
            Elected as the official liaison representing a class of 70+ engineering students to university faculty, department chairs, and administrative leadership. Used structured tracking spreadsheets to streamline communications and eliminate operational friction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <span className="text-orange-400 font-bold text-sm block mb-2">Bridge of Communication</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Served as the primary channel between faculty members and 70+ students, relaying critical curriculum guidelines, project rubrics, and administrative policies with zero ambiguity.
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <span className="text-orange-400 font-bold text-sm block mb-2">Schedule & Exam Logistics</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Coordinated academic schedules, lab batch rotations, and examination preparation schedules, avoiding timetable clashes across 4 consecutive academic semesters.
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <span className="text-orange-400 font-bold text-sm block mb-2">Issue Resolution & Mediation</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Resolved 180+ student academic concerns by collaborating directly with professors and administrative heads with a 24-hour turnaround SLA.
              </p>
            </div>
          </div>
        </div>

        {/* Education & Certifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Education Card */}
          <div className="bg-[#11131c] p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-orange-400 mb-4">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Formal Education</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
              {EDUCATION.degree}
            </h3>
            <p className="text-sm text-gray-300 font-medium">{EDUCATION.institution}</p>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400 my-4">
              <span>{EDUCATION.period}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">CGPA: {EDUCATION.cgpa}</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((c, i) => (
                  <span key={i} className="text-[11px] bg-white/5 text-gray-300 px-3 py-1 rounded-md border border-white/5">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-[#11131c] p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-orange-400 mb-4">
              <Award className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Verified Credentials</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
              Professional Certifications
            </h3>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-white">{cert.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{cert.issuer} • {cert.date}</p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 border border-white/10 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.map((s, sI) => (
                      <span key={sI} className="text-[10px] text-gray-300 bg-black/40 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

// 5. CONTACT & RECRUITER INQUIRY PAGE
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [inquiryType, setInquiryType] = useState('Data Analyst Full-Time');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('inquiry_category', inquiryType);
    
    try {
      const response = await fetch('https://formspree.io/f/xqpaekag', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('submitted');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Let's Discuss Opportunities.
              </h1>
              <p className="text-base text-gray-300 leading-relaxed">
                I am actively interviewing for entry-level Data Analyst, Business Intelligence Analyst, and Junior Analytics roles. Feel free to send a message, connect on LinkedIn, or schedule an exploratory chat.
              </p>
            </div>

            {/* Availability Banner */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <p className="text-xs font-bold text-emerald-300">Ready for Immediate Onboarding</p>
                <p className="text-[11px] text-gray-400">Open to Bengaluru, onsite roles, and remote opportunities.</p>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 pt-2">
              <a 
                href="mailto:anmol.krhjp@gmail.com"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Email Address</p>
                    <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      anmol.krhjp@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a 
                href="tel:+919508412334"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Phone Number</p>
                    <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                      +91 95084 12334
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-mono">LinkedIn Profile</p>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      linkedin.com/in/anmol-kumar4
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-mono">GitHub Repositories</p>
                    <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      github.com/negeinno
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-orange-300 uppercase font-mono font-bold">Curriculum Vitae</p>
                    <p className="text-sm font-bold text-white">Download Resume PDF</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#11131c] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            {status === 'submitted' ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                  Message Transmitted!
                </h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. I receive form submissions directly in my inbox and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                    Send a Message or Interview Invitation
                  </h3>
                  <p className="text-xs text-gray-400">
                    Fill out the form below to connect directly with Anmol.
                  </p>
                </div>

                {/* Inquiry Type Chips */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Topic / Opportunity Type:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Analyst Full-Time',
                      'BI & Dashboard Project',
                      'Interview Invitation',
                      'General Networking'
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setInquiryType(chip)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          inquiryType === chip
                            ? 'bg-[#eb5939] text-white shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins (Hiring Manager)"
                    disabled={status === 'submitting'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@company.com"
                    disabled={status === 'submitting'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Hi Anmol, we are looking for a Data Analyst with Power BI and SQL skills to join our analytics team..."
                    disabled={status === 'submitting'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-[#eb5939] hover:bg-[#d64b2d] text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Dispatching...' : 'Submit Message'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {status === 'error' && (
                  <p className="text-xs text-red-400 text-center font-mono">
                    Failed to send message. Please email anmol.krhjp@gmail.com directly!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// --- Scroll to Top Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0c14] text-gray-100 font-sans selection:bg-[#eb5939] selection:text-white flex flex-col relative">
        <GridBackground />
        <NavBar />
        
        <main className="flex-1 flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home onSelectCaseStudy={setSelectedCaseStudy} />} />
              <Route path="/work" element={<Work onSelectCaseStudy={setSelectedCaseStudy} />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/services" element={<Skills />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />

        {/* Global Case Study Modal */}
        <CaseStudyDetailModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      </div>
    </Router>
  );
};

export default App;