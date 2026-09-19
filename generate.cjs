const fs = require('fs');
const path = require('path');

const files = {
  'tailwind.config.js': `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        light: '#f5f5f7',
        accent: '#0070f3'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
`,
  'src/index.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-color: #f5f5f7;
  --text-color: #1d1d1f;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0a0a0a;
    --text-color: #f5f5f7;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-panel {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
`,
  'src/App.tsx': `
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 16]} />
              <meshStandardMaterial color="#0070f3" wireframe opacity={0.2} transparent />
            </mesh>
          </Float>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/avatar.jpg" 
            alt="Anmol Kumar" 
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-2 border-accent shadow-[0_0_30px_rgba(0,112,243,0.3)]"
          />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Anmol Kumar
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
            Software Engineer & Backend Specialist
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
              Hire Me
            </a>
            <a href="/resume.pdf" className="px-8 py-3 rounded-full glass-panel hover:bg-white/10 transition-colors flex items-center gap-2">
              <Download size={18} />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} className="text-gray-400 opacity-50" />
      </motion.div>
    </section>
  );
};

const Experience = () => {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="experience">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center"
      >
        Projects & Experience
      </motion.h2>
      
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
            Booking Hai
            <a href="https://bookinghai.vercel.app" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <ExternalLink size={20} />
            </a>
          </h3>
          <p className="text-accent mb-4">Aug 2026 – Present</p>
          <p className="text-gray-300 mb-6">Multi-Business Appointment Booking Platform for salons, clinics, gyms, tutors, and other service providers.</p>
          <div className="flex flex-wrap gap-2">
            {['Django', 'Django REST Framework', 'PostgreSQL', 'JavaScript', 'Vercel', 'Render'].map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-sm">{tech}</span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
            Negeinno
            <a href="https://negeinno.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <ExternalLink size={20} />
            </a>
          </h3>
          <p className="text-accent mb-4">Jan – Aug 2026</p>
          <p className="text-gray-300 mb-6">Startup & Business Networking Platform with features for user authentication, startup profiles, networking, messaging, and posts.</p>
          <div className="flex flex-wrap gap-2">
            {['Spring Boot', 'React.js', 'PostgreSQL', 'REST APIs', 'Git'].map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-sm">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([{ text: "Hi! I'm Anmol's AI assistant. Ask me anything about his experience or skills.", isBot: true }]);
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if(!input.trim()) return;
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      let reply = "I can tell you that Anmol is a skilled Backend Developer proficient in Python, Java, Django, and Spring Boot.";
      if(currentInput.toLowerCase().includes('education') || currentInput.toLowerCase().includes('university')) reply = "Anmol has a Bachelor of Engineering in Computer Science from Chandigarh University (2022-2026) with a CGPA of 7.66.";
      else if(currentInput.toLowerCase().includes('booking hai')) reply = "Booking Hai is a Multi-Business Appointment Booking Platform built with Django, PostgreSQL, and deployed on Vercel/Render.";
      else if(currentInput.toLowerCase().includes('negeinno')) reply = "Negeinno is a Startup & Business Networking Platform built using Spring Boot, React.js, and PostgreSQL.";
      else if(currentInput.toLowerCase().includes('skill') || currentInput.toLowerCase().includes('tech')) reply = "Anmol's skills include Python, Java, JavaScript, SQL, Django, Spring Boot, React.js, PostgreSQL, AWS, and Git.";
      else if(currentInput.toLowerCase().includes('contact') || currentInput.toLowerCase().includes('email')) reply = "You can reach Anmol at anmol.krhjp@gmail.com or via LinkedIn/GitHub.";
      
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-panel w-80 sm:w-96 h-[400px] rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              AI Assistant
            </span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={\`max-w-[85%] rounded-2xl p-3 text-sm \${m.isBot ? 'bg-white/10 self-start rounded-tl-sm' : 'bg-accent text-white ml-auto rounded-tr-sm'}\`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-white/10 bg-black/20">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </motion.div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform ml-auto"
      >
        <span className="text-2xl">✨</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="bg-dark text-light min-h-screen">
      <Hero />
      <Experience />
      
      <section className="py-24 px-4 max-w-5xl mx-auto text-center" id="contact">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Let's Connect</h2>
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://github.com/negeinno" target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/anmol-kumar4" target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:anmol.krhjp@gmail.com" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-gray-500">© 2026 Anmol Kumar. Crafted with passion.</p>
      </section>

      <Chatbot />
    </div>
  );
}

export default App;
`,
'index.html': `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anmol Kumar | Software Engineer</title>
    <meta name="description" content="Portfolio of Anmol Kumar, Backend Developer and Computer Science Graduate." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
}

console.log('Files generated successfully.');
