import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Components ---

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-40">
    <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white"></div>
    <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-white"></div>
    <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-white"></div>
    <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-white"></div>
    
    {/* Intersections */}
    <div className="absolute left-[20%] top-[25%] -translate-x-1/2 -translate-y-1/2 text-white font-light text-[10px]">+</div>
    <div className="absolute right-[20%] top-[25%] -translate-x-1/2 -translate-y-1/2 text-white font-light text-[10px]">+</div>
    <div className="absolute left-[20%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 text-white font-light text-[10px]">+</div>
    <div className="absolute right-[20%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 text-white font-light text-[10px]">+</div>
  </div>
);

const NavBar = () => {
  return (
    <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8 text-white">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative w-8 h-8 flex items-center justify-center font-black text-xl italic tracking-tighter border-2 border-white rounded-sm group-hover:bg-white group-hover:text-[#eb5939] transition-colors">
          <span className="absolute -translate-x-1">A</span>
          <span className="absolute translate-x-1 translate-y-1 opacity-70">K</span>
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-tight hidden sm:block">Anmol</span>
      </Link>
      <div className="hidden md:flex gap-10 text-sm font-medium">
        <Link to="/" className="hover:border-b hover:border-white/50 pb-1 transition-all">Home</Link>
        <Link to="/about" className="hover:border-b hover:border-white/50 pb-1 transition-all">About</Link>
        <Link to="/work" className="hover:border-b hover:border-white/50 pb-1 transition-all">Work</Link>
        <Link to="/services" className="hover:border-b hover:border-white/50 pb-1 transition-all">Skills</Link>
        <Link to="/contact" className="hover:border-b hover:border-white/50 pb-1 transition-all">Contact</Link>
      </div>
    </nav>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative z-10 flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

// --- Pages ---

const Home = () => {
  return (
    <PageTransition>
      <div 
        className="flex-1 relative flex flex-col justify-center items-center h-full w-full overflow-hidden"
        style={{ perspective: 1200 }}
      >
        
        {/* Giant Background Text Top */}
        <div className="absolute top-[10%] md:top-[12%] w-full text-center pointer-events-none select-none z-0">
          <h1 className="text-[28vw] md:text-[24vw] font-black leading-none text-white opacity-[0.08] tracking-tighter mix-blend-overlay">ANMOL</h1>
        </div>

        {/* Bottom Giant Text */}
        <div className="absolute bottom-6 left-[5%] md:left-[6%] pointer-events-none select-none z-30 drop-shadow-xl">
          <p className="text-white text-[10px] md:text-xs font-bold mb-0 opacity-60 tracking-widest">©2026</p>
        </div>

        {/* Floating Black Card Bottom Right */}
        <Link to="/contact" className="absolute right-6 md:right-[6%] bottom-6 md:bottom-8 z-40 group">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-[#111] text-white p-3 w-60 md:w-64 shadow-2xl flex items-center gap-4 group-hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-12 h-12 md:w-12 md:h-12 overflow-hidden bg-transparent shrink-0">
              <img src="/anmol-ai.png" alt="Thumb" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-gray-400 mb-1 flex justify-between items-center tracking-widest uppercase">Let's Talk <span className="text-[7px]">✱</span></p>
              <p className="font-bold text-xs">Anmol Kumar</p>
              <p className="text-[9px] text-gray-500 tracking-wider">Software Engineer</p>
            </div>
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="19" x2="19" y2="5"/><polyline points="9 5 19 5 19 15"/></svg>
            </div>
          </motion.div>
        </Link>

        {/* Center Image Anchored to Bottom with Continuous 3D Rotation */}
        <motion.div 
          animate={{ rotateY: [-20, 20] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[90vw] md:w-[650px] pointer-events-none flex justify-center items-end origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img src="/anmol-ai.png" alt="Anmol Kumar" className="w-full max-h-[85vh] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]" />
        </motion.div>

        {/* Frosted Glass Summary Card (Bottom Left) */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-16 md:bottom-20 left-6 md:left-[6%] z-30 max-w-[280px] md:max-w-[340px]"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-5 md:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/20 transition-colors cursor-default">
            <div className="w-8 h-8 rounded-full bg-white text-[#eb5939] flex items-center justify-center mb-4 shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className="text-white text-[10px] md:text-[11px] font-semibold leading-relaxed tracking-wider opacity-90 uppercase">
              Computer Science graduate with hands-on experience building web applications using Python, Django, REST Framework, and Java Spring Boot. Passionate about backend development and scalable systems.
            </p>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
};

const Work = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 text-white w-full">
      <h1 className="text-5xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-16">
        SELECTED WORK
      </h1>
      <div className="flex flex-col gap-12">
        {[
          {
            name: "Booking Hai",
            date: "AUG 2026 - PRESENT",
            desc: "Multi-Business Appointment Booking Platform. Built backend using Django & REST APIs for authentication, scheduling, and business profiles. Designed PostgreSQL architecture using ORM.",
            tech: "Django • REST Framework • PostgreSQL • Vercel • Neon",
            link: "https://bookinghai.vercel.app"
          },
          {
            name: "Negeinno",
            date: "JAN 2026 - AUG 2026",
            desc: "Startup & Business Networking Platform. Developed backend features using Spring Boot following layered architecture. Built REST APIs for authentication, networking, messaging, and posts.",
            tech: "Spring Boot • React.js • PostgreSQL",
            link: "https://negeinno.com"
          }
        ].map((p, i) => (
          <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative border border-white/20 p-8 md:p-12 rounded-3xl hover:bg-white/10 transition-colors duration-500 overflow-hidden cursor-pointer">
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest mb-4 block opacity-60">0{i+1} — {p.date}</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">{p.name}</h2>
                  <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 mb-6">{p.desc}</p>
                  <span className="inline-block px-4 py-2 border border-current rounded-full text-xs font-bold uppercase tracking-widest">{p.tech}</span>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#eb5939] transition-all -rotate-45 group-hover:rotate-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </PageTransition>
);

const About = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 text-white w-full">
      <h1 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-16 text-center md:text-left">
        THE ENGINEER
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
        {/* Left Column - Image */}
        <div className="md:col-span-5 relative group order-2 md:order-1">
          <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-3xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div className="relative z-10 overflow-hidden rounded-3xl border-2 border-white/20 bg-black">
            <img 
              src="/about-pic.jpg" 
              alt="Anmol Kumar" 
              className="w-full object-cover aspect-[4/5] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column - Text */}
        <div className="md:col-span-7 text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 order-1 md:order-2">
          <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8 leading-snug">
            Building systems that scale.
          </p>
          <p>
            I am a Computer Science graduate from Chandigarh University (2020 - 2024). My journey in software engineering is driven by a deep passion for backend development and building robust digital architectures.
          </p>
          <p>
            I specialize in Python, Django, and Java Spring Boot. Whether it's designing complex RESTful APIs, optimizing PostgreSQL queries, or deploying seamless applications, I thrive on solving hard technical problems.
          </p>
          <p>
            Beyond code, I believe in creating products that are smart, impactful, and fundamentally human-centered.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-white/20">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest block opacity-50 mb-2">Education</span>
              <span className="font-bold">B.E. Computer Science</span>
              <span className="block text-sm opacity-70">Chandigarh University</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest block opacity-50 mb-2">Location</span>
              <span className="font-bold">India</span>
              <span className="block text-sm opacity-70">Available Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
);

const Services = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 text-white w-full">
      <h1 className="text-5xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-16">
        CORE SKILLS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {[
          {
            id: "01",
            title: "Backend Development",
            desc: "Architecting scalable and secure RESTful APIs and microservices. Ensuring high performance and robust data management for complex applications.",
            skills: ["Python", "Django", "Django REST Framework", "Java", "Spring Boot", "REST APIs"]
          },
          {
            id: "02",
            title: "Database Management",
            desc: "Designing optimized database schemas, writing efficient queries, and managing relational databases with ORMs.",
            skills: ["PostgreSQL", "MySQL", "SQL", "Django ORM", "Spring Data JPA"]
          },
          {
            id: "03",
            title: "Frontend Integration",
            desc: "Building responsive, modern user interfaces and seamlessly connecting them with backend systems.",
            skills: ["HTML5", "CSS3", "JavaScript", "React.js"]
          },
          {
            id: "04",
            title: "DevOps & Tools",
            desc: "Deploying applications, managing cloud services, and maintaining version control for collaborative development.",
            skills: ["Git", "GitHub", "AWS EC2", "AWS S3", "Vercel", "Render", "Neon", "Postman"]
          }
        ].map((s) => (
          <div key={s.id} className="border-t border-white/20 pt-8 group">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xl font-bold opacity-50 block">{s.id}</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors -rotate-45 group-hover:rotate-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">{s.title}</h2>
            <p className="text-lg font-medium opacity-80 mb-6 h-24">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
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
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-between order-2 lg:order-1">
            <div>
              <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-8">
                LET'S<br/>TALK
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 max-w-md leading-relaxed">
                I'm always open to discussing backend architecture, product design, or partnership opportunities.
              </p>
              
              <div className="flex items-center gap-4 mb-16 inline-flex px-5 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-90">Available for new opportunities</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-lg font-bold uppercase tracking-widest mt-auto">
              <a href="mailto:anmol.krhjp@gmail.com" className="hover:text-[#eb5939] transition-colors border-b border-white/20 pb-4 flex justify-between group items-center">
                Email <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-[-10px]">↗</span>
              </a>
              <a href="https://linkedin.com/in/anmol-kumar4" target="_blank" rel="noopener noreferrer" className="hover:text-[#eb5939] transition-colors border-b border-white/20 pb-4 flex justify-between group items-center">
                LinkedIn <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-[-10px]">↗</span>
              </a>
              <a href="https://github.com/negeinno" target="_blank" rel="noopener noreferrer" className="hover:text-[#eb5939] transition-colors border-b border-white/20 pb-4 flex justify-between group items-center">
                GitHub <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-[-10px]">↗</span>
              </a>
              <a href="/Anmol_Kumar_Resume.pdf" download className="hover:text-[#eb5939] transition-colors border-b border-white/20 pb-4 flex justify-between group items-center">
                Download Resume <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-y-[4px]">↓</span>
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white/5 p-8 md:p-12 lg:p-16 rounded-[2rem] border border-white/10 backdrop-blur-md relative shadow-2xl order-1 lg:order-2">
            {status === 'submitted' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <div className="w-24 h-24 rounded-full bg-white text-[#eb5939] flex items-center justify-center mb-8 shadow-2xl">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Message Sent</h2>
                <p className="text-lg opacity-80 font-medium max-w-xs">Thank you for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-12 px-8 py-4 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#eb5939] transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 text-left h-full justify-center">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 block ml-2">What's your email?</label>
                  <input type="email" name="email" required placeholder="hello@example.com" disabled={status === 'submitting'} className="w-full bg-black/20 border-none rounded-2xl px-6 py-5 text-xl font-medium tracking-wide placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 block ml-2">How can I help?</label>
                  <textarea name="message" required placeholder="Let's build something..." rows={4} disabled={status === 'submitting'} className="w-full bg-black/20 border-none rounded-2xl px-6 py-5 text-xl font-medium tracking-wide placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none disabled:opacity-50"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="mt-4 w-full py-6 bg-white text-[#eb5939] rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all disabled:opacity-70 flex justify-center items-center gap-3"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  {status === 'error' && <span className="text-red-500 ml-2">Error!</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#eb5939] font-sans selection:bg-white selection:text-[#eb5939] flex flex-col relative">
        <GridBackground />
        <NavBar />
        
        <div className="flex-1 flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
};

export default App;