import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
import { LinkedinIcon, GithubIcon, AKLogo } from './components/Icons';
import { FishOceanBackground } from './components/FishOceanBackground';

// --- Shared UI Elements ---

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Subtle Data Mesh for Light Theme */}
    <div 
      className="absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}
    />
    {/* Fresh Atmospheric Sunlit Glows for Depth */}
    <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-orange-400/10 to-amber-300/10 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-sky-400/12 to-blue-300/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/10 to-teal-300/10 rounded-full blur-[140px] pointer-events-none" />
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
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/90 border-b border-slate-200/90 px-6 md:px-12 py-3.5 text-slate-800 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3.5 group" onClick={() => setIsOpen(false)}>
            <AKLogo className="w-10 h-10 group-hover:scale-105 transition-transform shrink-0" />
            <div>
              <span className="text-base font-bold tracking-tight block leading-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                Anmol Kumar
              </span>
              <span className="text-[11px] text-orange-600 font-mono tracking-wider uppercase block font-semibold">
                Data Analyst • BI
              </span>
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
                  className={`transition-colors py-1.5 relative ${
                    isActive ? 'text-orange-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs transition-all hover:text-slate-900"
            >
              <Download className="w-3.5 h-3.5 text-orange-500" /> Resume PDF
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm shadow-orange-500/25 transition-all font-semibold"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none rounded-lg bg-slate-100 border border-slate-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
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
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col justify-center items-center px-6 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold uppercase tracking-tight text-slate-900 hover:text-orange-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-orange-500" /> Download Resume PDF
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-orange-500 text-white flex items-center justify-center gap-2 shadow-xs"
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
  <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 py-12 px-6 md:px-12 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <AKLogo className="w-8 h-8 shrink-0" />
          <span className="font-bold text-base text-slate-900">Anmol Kumar</span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-orange-600 font-mono font-semibold">Data Analyst & BI Specialist</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md leading-relaxed">
          Transforming messy multi-source datasets into executive business intelligence through SQL, Python, Power BI, and AI-assisted analytics.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
        <a href="mailto:anmol.krhjp@gmail.com" className="hover:text-orange-600 transition-colors flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-orange-500" /> anmol.krhjp@gmail.com
        </a>
        <a href="https://linkedin.com/in/anmol-kumar4" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
          <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
        </a>
        <a href="https://github.com/negeinno" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
          <GithubIcon className="w-3.5 h-3.5 text-slate-700" /> GitHub
        </a>
        <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5 text-emerald-600" /> Resume PDF
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
      <p>© 2026 Anmol Kumar. Engineered with data discipline, clarity & human empathy.</p>
      <p className="flex items-center gap-2 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Based in Bengaluru, Karnataka • Open to Relocation
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
      <div className="w-full text-slate-800">
        
        {/* Hero Section - Clean, Non-Overlapping Spacing */}
        <section className="relative overflow-hidden pt-12 md:pt-16 pb-16 md:pb-24 px-6 md:px-12 border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Headline, Pill & Bio */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Standalone Status Pill Badge with Clean Bottom Margin */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-medium shadow-2xs mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Seeking Entry-Level Data Analyst & BI Roles</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Bengaluru & Remote</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.04] text-slate-900 mb-6">
                Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">Raw Data</span> Into High-Impact Business Decisions.
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal mb-8">
                Hello! I am <span className="text-slate-900 font-semibold">Anmol Kumar</span>, a Computer Science graduate specialized in 
                <span className="text-orange-600 font-semibold"> SQL</span>, 
                <span className="text-orange-600 font-semibold"> Python</span>, 
                <span className="text-orange-600 font-semibold"> Power BI</span>, and 
                <span className="text-orange-600 font-semibold"> AI-assisted Analytics</span>. I build robust data pipelines, design Star Schema models, and craft executive dashboards that cut through reporting noise.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  to="/work"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-orange-500/25 transition-all hover:gap-3"
                >
                  Explore Case Studies <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200/90 flex items-center gap-2 transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-orange-600" /> Download Resume PDF
                </a>
                <Link
                  to="/contact"
                  className="px-4 py-3.5 text-slate-600 hover:text-slate-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  Contact Me <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Contact & Location Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/90 font-mono w-full">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" /> Bengaluru, Karnataka
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" /> Chandigarh University (CGPA 7.66)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cisco & IBM Certified
                </span>
              </div>
            </div>

            {/* Right Column: Clean Non-Overlapping Profile Window Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[390px] rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden glass-card">
                
                {/* Window Header */}
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 font-medium">anmol_profile.pbix</span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    Live
                  </span>
                </div>

                {/* Profile Image - Clean, Fully Visible, High Fidelity */}
                <div className="p-4 bg-slate-50">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-white">
                    <img
                      src="/about-pic.jpg"
                      alt="Anmol Kumar - Data Analyst"
                      className="w-full aspect-[4/4.6] object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Structured Info Dock (Below image, zero overlap!) */}
                <div className="px-5 pb-5 pt-1 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base text-slate-900">Anmol Kumar</p>
                      <p className="text-xs text-orange-600 font-mono font-medium">Data Analyst & BI Specialist</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-mono font-medium">
                      CSE '26
                    </span>
                  </div>

                  {/* Core Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['SQL (MySQL)', 'Power BI DAX', 'Python (Pandas)', 'Excel'].map((skill, sI) => (
                      <span key={sI} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available for Immediate Joining
                    </span>
                    <span className="text-orange-600 font-mono font-bold">100% Focused</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Live Core KPI Strip - Modern UI Card Grid */}
        <section className="bg-slate-100/70 py-12 px-6 md:px-12 border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_KPIS.map((kpi, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-orange-400/50 transition-all hover:-translate-y-1 shadow-sm glass-card"
              >
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600">
                  {kpi.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mt-1 font-mono">
                  {kpi.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {kpi.subtext}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Live Visualizer: AI Sales Insights Dashboard */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
                  Featured Case Study Showcase
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
                  AI Sales Executive Intelligence Dashboard
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
                  Engineered using SQL, Python, Excel, and Power BI. Toggle between the live interactive data model simulator and the production dashboard interface.
                </p>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
                <button
                  onClick={() => setSalesViewMode('interactive')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    salesViewMode === 'interactive'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5" /> Interactive Model
                </button>
                <button
                  onClick={() => setSalesViewMode('screenshot')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    salesViewMode === 'screenshot'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Full BI Dashboard UI
                </button>
                <button
                  onClick={() => onSelectCaseStudy(CASE_STUDIES[0])}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-600 hover:text-orange-700 ml-1 border-l border-slate-300 pl-2"
                >
                  Full Breakdown →
                </button>
              </div>
            </div>

            {/* View Container */}
            {salesViewMode === 'interactive' ? (
              <SalesDashboardVisualizer />
            ) : (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl glass-card">
                {/* Browser Titlebar */}
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="font-mono text-slate-700 ml-2">app.powerbi.com/groups/me/reports/sales-executive-intelligence</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">Production Refresh: Active</span>
                </div>
                {/* Full Uncropped High-Res Image */}
                <img 
                  src="/case-studies/sales-dashboard.jpg" 
                  alt="Sales Dashboard Full UI" 
                  className="w-full h-auto object-contain block" 
                />
              </div>
            )}
          </div>
        </section>

        {/* Featured Case Studies Grid with Visual Artwork */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">
                Selected Data Case Studies
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Detailed breakdowns demonstrating business problem scoping, SQL data mart modeling, Python preprocessing, and executive storytelling with real deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  onClick={() => onSelectCaseStudy(study)}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between glass-card"
                >
                  <div>
                    {/* Visual Preview Image - Full uncropped aspect ratio */}
                    {study.image && (
                      <div className="relative w-full overflow-hidden border-b border-slate-200 bg-slate-50">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full aspect-[16/9.5] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-orange-600 border border-slate-200 shadow-xs">
                            {study.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-4 z-10 text-xs font-mono text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded border border-slate-200 shadow-xs">
                          {study.timeline}
                        </div>
                      </div>
                    )}

                    <div className="p-7 space-y-5">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {study.subtitle}
                        </p>
                      </div>

                      {/* Behind The Scenes Quote */}
                      {study.analystNotes && (
                        <div className="bg-orange-50/70 border-l-2 border-orange-500 p-3 rounded-r-xl text-xs text-slate-700 italic line-clamp-2">
                          "{study.analystNotes}"
                        </div>
                      )}

                      {/* Quick Metric Highlights */}
                      <div className="grid grid-cols-2 gap-3">
                        {study.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <p className="text-[10px] text-slate-500 font-mono uppercase">{m.label}</p>
                            <p className="text-xl font-black text-slate-900 mt-0.5">{m.value}</p>
                            {m.change && <p className="text-[10px] text-emerald-600 font-bold">{m.change}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Tools Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {study.tools.map((tool, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="px-7 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <span>View In-Depth Breakdown</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs transition-all hover:border-orange-300"
              >
                Browse All Case Studies & Code Explorer <ArrowRight className="w-4 h-4 text-orange-600" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6-Step Data Analytics Methodology with UNCLIPPED Architecture Visual */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-100/60 border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
                Analytical Framework & Pipeline
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">
                End-To-End Data Architecture Flow
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A structured, disciplined methodology ensuring every analysis produces dependable, verifiable, and actionable business intelligence.
              </p>
            </div>

            {/* Architecture Visual Diagram - 100% Fully Visible, No Cropping */}
            <div className="mb-14 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl glass-card">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-slate-700 ml-2">architecture_pipeline_diagram.svg</span>
                </div>
                <span className="text-[11px] font-mono text-orange-600 font-semibold">Production Specification</span>
              </div>
              
              {/* Full Unclipped Image */}
              <img 
                src="/case-studies/pipeline-architecture.jpg" 
                alt="Data Pipeline Flow Diagram" 
                className="w-full h-auto object-contain block" 
              />

              {/* Caption Bar Explaining All 4 Stages */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 border-t border-slate-200 text-xs">
                <div>
                  <p className="font-bold text-orange-600 font-mono">Stage 1: Sources</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">MySQL, SQL Server & CSV file dumps</p>
                </div>
                <div>
                  <p className="font-bold text-amber-600 font-mono">Stage 2: Ingestion</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Python Pandas cleaning & ETL sanitation</p>
                </div>
                <div>
                  <p className="font-bold text-blue-600 font-mono">Stage 3: Warehousing</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Analytical Star Schema & Fact modeling</p>
                </div>
                <div>
                  <p className="font-bold text-emerald-600 font-mono">Stage 4: BI & AI</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Power BI DAX & AI insight briefs</p>
                </div>
              </div>
            </div>

            {/* Methodology Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA_METHODOLOGY_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-orange-400/50 transition-colors relative flex flex-col justify-between glass-card shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-orange-600">
                        {step.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Human Philosophy Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 border-b border-slate-200/90">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-50/80 via-amber-50/70 to-orange-50/80 p-8 sm:p-12 rounded-3xl border border-orange-200/90 relative overflow-hidden shadow-lg glass-card">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-orange-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Philosophy & Human Perspective</span>
              </div>
              <blockquote className="text-xl sm:text-3xl font-black text-slate-900 leading-snug">
                "{PERSONAL_INFO.philosophy}"
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                As a Computer Science graduate with hands-on technical foundations in SQL, relational databases, and Python, I do not just treat data as numbers. I treat each metric as representing real customer behaviors, real employee careers, and real revenue opportunities. That human bridge is what makes analytics powerful.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Read My Full Story & Leadership Role
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-300 transition-colors shadow-xs"
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-slate-800 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
            Portfolio Work & Case Studies
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Data Case Studies & Deep-Dives
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Each case study outlines the full lifecycle: business context, raw data hygiene, SQL star-schema modeling, Python exploratory data analysis, and Power BI executive scorecards with verified deliverables.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter By:
          </span>
          {(['All', 'Business Intelligence', 'Python & EDA', 'SQL & Data Modeling'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
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
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:border-orange-400/50 transition-all duration-300 glass-card"
            >
              {/* Full Unclipped Image Banner */}
              {study.image && (
                <div className="w-full overflow-hidden border-b border-slate-200 bg-slate-50">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-mono text-slate-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                      Production Dashboard Artifact
                    </span>
                    <button
                      onClick={() => onSelectCaseStudy(study)}
                      className="px-3 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs"
                    >
                      <Maximize2 className="w-3 h-3" /> Expand Full View
                    </button>
                  </div>
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-auto object-contain block hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
              )}

              <div className="p-6 sm:p-10">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <span className="text-xs text-orange-600 font-mono font-bold uppercase tracking-wider">
                    {study.category} • {study.timeline}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Role: {study.role}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-2">
                  {study.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mb-6 font-medium">
                  {study.subtitle}
                </p>

                {/* Behind the scenes personal note */}
                {study.analystNotes && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl mb-6 text-xs sm:text-sm text-slate-700 italic border border-orange-200/50">
                    <span className="text-orange-600 font-bold block not-italic uppercase font-mono text-[11px] mb-1">
                      Analyst Reflection:
                    </span>
                    "{study.analystNotes}"
                  </div>
                )}

                {/* Metrics Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">{m.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{m.value}</p>
                      {m.change && (
                        <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{m.change}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Problem vs Solution Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 mb-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-red-600 uppercase tracking-wider block mb-1">
                      Problem Context:
                    </span>
                    <p className="leading-relaxed">{study.problem}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                      Analytical Solution:
                    </span>
                    <p className="leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Tools & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tools.map((t, i) => (
                      <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectCaseStudy(study)}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
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
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block mb-1">
              Interactive People Analytics Preview
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              HR Workforce Retention Visualizer
            </h2>
          </div>
          <HRWorkforceVisualizer />
        </div>

        {/* Interactive Query & Code Sandbox */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Code & Query Repository
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              Production Scripts, CTEs & DAX Formulas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-slate-800 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
            Technical Proficiency Matrix
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Data Tools, Languages & Methodologies
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            From low-level SQL queries and Python data frames to executive Power BI dashboards and prompt-engineered summaries, here is a comprehensive breakdown of my capabilities.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TECHNICAL_SKILLS.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-orange-400/50 transition-all flex flex-col justify-between glass-card shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base uppercase tracking-tight text-slate-900">
                    {cat.category}
                  </h3>
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
                    <Database className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills list with progress */}
                <div className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-medium text-slate-800">{skill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-orange-600 border border-slate-200">
                          {skill.tag}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" 
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
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 mb-16 glass-card shadow-sm">
          <h3 className="text-xl font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-orange-600" />
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
              <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <p className="font-bold text-xs text-slate-900">{tool.name}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{tool.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-orange-50/80 via-amber-50/70 to-orange-50/80 p-8 rounded-3xl border border-orange-200 shadow-sm">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">
            Have a Data Challenge or Open Role?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
            I am eager to contribute clean code, structured SQL queries, and sharp analytical insights to your team.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-sm"
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-slate-800 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
            The Analyst & Coordinator
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Anmol Kumar
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Computer Science Graduate • Data Analyst • Academic Class Representative
          </p>
        </div>

        {/* Main Grid: Story & Vibrant Colorful Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Colorful Vibrant Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[400px] rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden glass-card">
              
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-mono text-slate-800 font-bold">anmol_kumar.jpg</span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Chandigarh University CSE
                </span>
              </div>

              {/* Natural Full-Color Photography */}
              <div className="p-4 bg-slate-50">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-white">
                  <img
                    src="/about-pic.jpg"
                    alt="Anmol Kumar - Full Color Portrait"
                    className="w-full aspect-[4/4.8] object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="p-5 bg-white border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-base">Anmol Kumar</p>
                  <span className="text-xs text-emerald-700 font-mono font-bold">CGPA: 7.66 / 10</span>
                </div>
                <p className="text-xs text-slate-500">
                  Academic Class Representative (2024–2025) • 70+ Students
                </p>
              </div>

            </div>
          </div>

          {/* Biography Text & Human Context */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 leading-snug">
              Passionate about turning raw data into meaningful business intelligence.
            </h2>
            <p>
              {PERSONAL_INFO.bio}
            </p>
            <p>
              Throughout my degree at Chandigarh University (<span className="text-slate-900 font-semibold">CGPA 7.66 / 10</span>), I cultivated strong foundations in relational database management, data structures, and statistical reasoning. I quickly realized that the greatest superpower in modern organizations is the ability to turn disparate, unstandardized transactional logs into clear, actionable stories that non-technical leaders can act on immediately.
            </p>
            <p>
              In addition to traditional analytics, I have actively mastered AI-assisted data analysis and prompt engineering to accelerate report compilation, automate data anomalies summarization, and craft executive briefings in minutes rather than days.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">Education</span>
                <span className="font-bold text-slate-900 block">B.E. Computer Science</span>
                <span className="text-slate-500">Chandigarh University (CGPA 7.66)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">Location</span>
                <span className="font-bold text-slate-900 block">Bengaluru, Karnataka</span>
                <span className="text-slate-500">Available across India & Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Spotlight: Academic Class Representative */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 mb-20 glass-card shadow-lg">
          <div className="flex items-center gap-3 text-orange-600 mb-4">
            <Users className="w-6 h-6" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">
              Leadership Experience • 2024 – 2025
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Academic Class Representative (70+ Students)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Elected as the official liaison representing a class of 70+ engineering students to university faculty, department chairs, and administrative leadership. Used structured tracking spreadsheets to streamline communications and eliminate operational friction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-orange-600 font-bold text-sm block mb-2">Bridge of Communication</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Served as the primary channel between faculty members and 70+ students, relaying critical curriculum guidelines, project rubrics, and administrative policies with zero ambiguity.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-orange-600 font-bold text-sm block mb-2">Schedule & Exam Logistics</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinated academic schedules, lab batch rotations, and examination preparation schedules, avoiding timetable clashes across 4 consecutive academic semesters.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-orange-600 font-bold text-sm block mb-2">Issue Resolution & Mediation</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Resolved 180+ student academic concerns by collaborating directly with professors and administrative heads with a 24-hour turnaround SLA.
              </p>
            </div>
          </div>
        </div>

        {/* Education & Certifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Education Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 glass-card shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 mb-4">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Formal Education</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-1">
              {EDUCATION.degree}
            </h3>
            <p className="text-sm text-slate-600 font-medium">{EDUCATION.institution}</p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 my-4">
              <span>{EDUCATION.period}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">CGPA: {EDUCATION.cgpa}</span>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((c, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200 font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 glass-card shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 mb-4">
              <Award className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Verified Credentials</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">
              Professional Certifications
            </h3>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{cert.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{cert.issuer} • {cert.date}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 border border-emerald-300 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.map((s, sI) => (
                      <span key={sI} className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-slate-800 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 block mb-2">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
                Let's Discuss Opportunities.
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                I am actively interviewing for entry-level Data Analyst, Business Intelligence Analyst, and Junior Analytics roles. Feel free to send a message, connect on LinkedIn, or schedule an exploratory chat.
              </p>
            </div>

            {/* Availability Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-xs font-bold text-emerald-800">Ready for Immediate Onboarding</p>
                <p className="text-[11px] text-slate-600">Open to Bengaluru, onsite roles, and remote opportunities.</p>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3.5 pt-2">
              <a 
                href="mailto:anmol.krhjp@gmail.com"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 transition-all group glass-card shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Email Address</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      anmol.krhjp@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>

              <a 
                href="tel:+919508412334"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-all group glass-card shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Phone Number</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      +91 95084 12334
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all group glass-card shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">LinkedIn Profile</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      linkedin.com/in/anmol-kumar4
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 transition-all group glass-card shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">GitHub Repositories</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      github.com/negeinno
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>

              <a 
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 transition-all group glass-card shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-orange-600 uppercase font-mono font-bold">Curriculum Vitae</p>
                    <p className="text-sm font-bold text-slate-900">Download Resume PDF</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-600" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl glass-card">
            {status === 'submitted' ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">
                  Message Transmitted!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. I receive form submissions directly in my inbox and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-1">
                    Send a Message or Interview Invitation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the form below to connect directly with Anmol.
                  </p>
                </div>

                {/* Inquiry Type Chips */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
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
                            ? 'bg-orange-500 text-white shadow-xs font-semibold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins (Hiring Manager)"
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@company.com"
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Hi Anmol, we are looking for a Data Analyst with Power BI and SQL skills to join our analytics team..."
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Dispatching...' : 'Submit Message'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {status === 'error' && (
                  <p className="text-xs text-red-600 text-center font-mono">
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
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-orange-500 selection:text-white flex flex-col relative overflow-hidden">
        <FishOceanBackground />
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