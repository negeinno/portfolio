import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 opacity-50"><polyline points="6 9 12 15 18 9"/></svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
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
              <div key={i} className={`max-w-[85%] rounded-2xl p-3 text-sm ${m.isBot ? 'bg-white/10 self-start rounded-tl-sm' : 'bg-accent text-white ml-auto rounded-tr-sm'}`}>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <a href="https://linkedin.com/in/anmol-kumar4" target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:anmol.krhjp@gmail.com" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
        <p className="text-gray-500">© 2026 Anmol Kumar. Crafted with passion.</p>
      </section>

      <Chatbot />
    </div>
  );
}

export default App;