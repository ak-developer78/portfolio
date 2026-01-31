
import React, { useState, useEffect, useRef } from 'react';
import { SKILL_CATEGORIES, EXPERIENCES, PROJECTS, FILTERS } from './constants';
import { Project, SkillCategory, Skill } from './types';

// --- Subcomponents ---

const AutoCodingCard = () => {
  const snippets = [
    `const developer = {
  name: 'Arun',
  role: 'Full Stack Developer',
  passion: 'Building amazing web apps'
};`,
    `async function deployProject() {
  await analytics.init();
  const build = await buildSystem.bundle();
  return await cloud.push(build);
}`,
    `interface PortfolioProps {
  owner: string;
  skills: string[];
  vibe: 'Professional' | 'Futuristic';
}`,
    `db.collection('projects').find({
  status: 'completed',
  tech: { $in: ['React', 'Node'] }
}).limit(20);`,
    `const UI = styled.div\`
  display: flex;
  backdrop-filter: blur(12px);
  background: rgba(0,0,0,0.5);
\`;`
  ];

  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 40;
  const pauseTime = 2500;

  useEffect(() => {
    let timeout: number;
    const currentSnippet = snippets[snippetIndex];

    if (isTyping) {
      if (displayText.length < currentSnippet.length) {
        timeout = window.setTimeout(() => {
          setDisplayText(currentSnippet.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = window.setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, typingSpeed / 3);
      } else {
        setIsTyping(true);
        setSnippetIndex((prev) => (prev + 1) % snippets.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, snippetIndex]);

  const highlightCode = (text: string) => {
    return text.split('\n').map((line, i) => (
      <div key={i} className="min-h-[1.5em] whitespace-pre">
        {line.split(/(\s+|['"].*?['"]|[=:{}[\](),;.]|[0-9]+)/).map((part, j) => {
          if (/^['"].*?['"]$/.test(part)) return <span key={j} className="text-orange-300">{part}</span>;
          if (/^(const|let|var|function|async|await|return|export|default|import|from|interface|type)$/.test(part)) return <span key={j} className="text-blue-400">{part}</span>;
          if (/^[0-9]+$/.test(part)) return <span key={j} className="text-purple-400">{part}</span>;
          if (/^[=:{}[\](),;.]$/.test(part)) return <span key={j} className="text-cyan-500">{part}</span>;
          if (/^(developer|name|role|passion|deployProject|analytics|init|buildSystem|bundle|cloud|push|PortfolioProps|owner|skills|vibe|db|collection|find|status|tech|limit|UI|styled|div)$/.test(part)) return <span key={j} className="text-cyan-200">{part}</span>;
          return <span key={j}>{part}</span>;
        })}
      </div>
    ));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-cyan-500/20 rounded-3xl blur-2xl"></div>
      <div className="relative glass bg-[#0a0f1d]/80 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
          </div>
        </div>
        <div className="p-8 font-mono text-sm md:text-base leading-relaxed text-gray-300 h-[300px] overflow-hidden">
          {highlightCode(displayText)}
          <span className="inline-block w-2.5 h-5 bg-cyan-500 ml-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Arun
        </div>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-gray-400 hover:text-cyan-400 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20">
            Resume
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300">
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      <div className={`md:hidden glass overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 py-6 border-b' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-gray-300 font-medium"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-cyan-500 text-white px-8 py-2 rounded-full font-bold">Resume</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-24 px-6 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
    
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-10 text-center lg:text-left">
        <div className="space-y-4">
          <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase flex items-center justify-center lg:justify-start gap-3">
            <span className="text-xl">👋</span> Hi, I'm
          </p>
          <h1 className="text-7xl md:text-8xl font-black text-white leading-none tracking-tight">
            Arun <span className="text-cyan-500">.</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-300">Full Stack Developer</h2>
        </div>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
          I build scalable, modern & high-performance web applications. I turn complex problems into simple, beautiful digital experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
          <a href="#" className="w-full sm:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-600 text-[#030712] rounded-xl font-black text-lg transition-all shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-3">
            <i className="fas fa-download"></i>
            Download Resume
          </a>
          <a href="#contact" className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 group">
            <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            Contact Me
          </a>
        </div>
      </div>
      
      <div className="hidden lg:block">
        <AutoCodingCard />
      </div>
    </div>
  </section>
);

const TypingText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      let fullText = phrases[index % phrases.length];
      let updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        clearInterval(ticker);
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setIndex(index + 1);
      }
    }, isDeleting ? 30 : 50);

    return () => clearInterval(ticker);
  }, [text, isDeleting, index, phrases]);

  return <span className="text-gray-400 leading-relaxed min-h-[140px] block">{text}<span className="animate-pulse">|</span></span>;
};

const About = () => {
  const phrases = [
    "I'm a passionate Full Stack Developer with extensive experience in building scalable, modern, and high-performance web applications. With over 2 years of professional experience, I specialize in creating seamless user experiences using cutting-edge technologies.",
    "My expertise spans across the entire development stack, from crafting beautiful and responsive frontends with React and Next.js to building robust backend systems with Node.js, PHP, and Laravel. I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry trends."
  ];

  return (
    <section id="about" className="py-32 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-black mb-6">About <span className="text-cyan-500">Me</span></h2>
          <div className="w-24 h-2 bg-cyan-500 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group max-w-sm mx-auto lg:mx-0">
            <div className="absolute -inset-1 bg-cyan-500 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass bg-[#0a0f1d]/90 rounded-[40px] border border-white/10 p-12 aspect-square flex items-center justify-center shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
               
               <div className="relative flex flex-col items-center text-center z-10">
                 <div className="relative">
                    <h3 className="text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 leading-none -rotate-12 group-hover:rotate-0 transition-all duration-700 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">A</h3>
                 </div>
                 <div className="mt-4 flex gap-3">
                   <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                   <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                   <div className="w-2 h-2 rounded-full bg-cyan-500/20"></div>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-white leading-tight">Full Stack Developer</h3>
              <TypingText phrases={phrases} />
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group">
                <h4 className="text-4xl font-black text-cyan-400 group-hover:scale-105 transition-transform origin-left">2+</h4>
                <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">Years Experience</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group">
                <h4 className="text-4xl font-black text-cyan-400 group-hover:scale-105 transition-transform origin-left">20+</h4>
                <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const isExpert = skill.level === 'Expert';
  const accentColorClass = isExpert ? 'bg-green-500' : 'bg-blue-500';
  const textColorClass = isExpert ? 'text-green-500' : 'text-blue-500';
  const shadowColorClass = isExpert ? 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]';
  const borderHoverClass = isExpert ? 'hover:border-green-500/40' : 'hover:border-blue-500/40';

  return (
    <div className={`relative glass bg-[#0a0f1d] rounded-3xl border border-white/5 p-8 transition-all duration-500 group ${shadowColorClass} ${borderHoverClass}`}>
      <div className="absolute top-6 right-6">
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border border-white/10 ${accentColorClass} bg-opacity-10 ${textColorClass}`}>
          {skill.level}
        </span>
      </div>
      <div className="flex flex-col items-start gap-4 mb-8">
        <div className="p-3 bg-white/5 rounded-2xl">
          <i className={`${skill.icon} text-4xl text-white group-hover:scale-110 transition-transform duration-500`}></i>
        </div>
        <h4 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
          {skill.name}
        </h4>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Proficiency</span>
        <span className={`text-xs font-black uppercase tracking-widest ${textColorClass}`}>
          {skill.level}
        </span>
      </div>
      <div className="h-3 w-full bg-[#161b2c] rounded-full overflow-hidden">
        <div 
          className={`h-full ${accentColorClass} transition-all duration-1000 ease-out group-hover:brightness-125`}
          style={{ width: `${skill.proficiency}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => (
  <section id="skills" className="py-32 px-6 bg-[#030712] scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <h2 className="text-5xl font-black mb-6">Technical <span className="text-cyan-500">Skills</span></h2>
        <div className="w-24 h-2 bg-cyan-500 rounded-full"></div>
      </div>
      
      <div className="space-y-24">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
              <i className={`fas ${cat.icon} text-cyan-500`}></i>
              {cat.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-black mb-6">Professional <span className="text-cyan-500">Journey</span></h2>
          <div className="w-24 h-2 bg-cyan-500 rounded-full"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-transparent hidden md:block"></div>
          
          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 hidden md:block"></div>
                
                {/* Card Container */}
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="glass p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group relative">
                    {/* Current Badge */}
                    {i === 0 && (
                      <span className="absolute top-6 right-6 px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-black uppercase rounded-lg border border-green-500/30">Current</span>
                    )}
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{exp.role}</h3>
                        <p className="text-cyan-500 font-bold">{exp.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm font-bold mb-4 flex items-center gap-2">
                      <i className="far fa-calendar-alt text-xs"></i>
                      {exp.period}
                    </p>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(s => (
                        <span key={s} className="bg-white/5 text-gray-300 px-3 py-1 rounded-lg text-[10px] font-bold uppercase border border-white/10">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filtered = PROJECTS.filter(p => filter === 'All' || p.category.includes(filter));

  return (
    <section id="projects" className="py-32 px-6 bg-[#030712] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-black mb-6">Latest <span className="text-cyan-500">Works</span></h2>
          <div className="w-24 h-2 bg-cyan-500 rounded-full mb-12"></div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {FILTERS.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${filter === f ? 'bg-cyan-500 text-white shadow-xl shadow-cyan-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(p => (
            <div key={p.id} className="glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-cyan-500/40 transition-all flex flex-col h-full">
              <div className="h-60 overflow-hidden relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {p.tags.slice(0, 2).map(t => (
                    <span key={t} className="bg-[#030712]/80 backdrop-blur-md text-cyan-400 text-[10px] font-black uppercase px-2 py-1 rounded border border-cyan-500/20">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 space-y-4">
                <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                <div className="mt-auto pt-6 flex gap-4">
                  <a href={p.liveUrl} className="flex-1 text-center py-3 bg-cyan-500 hover:bg-cyan-600 text-[#030712] rounded-xl font-black text-xs transition-all uppercase tracking-widest">Demo</a>
                  <a href={p.repoUrl} className="flex-1 text-center py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-xs transition-all border border-white/10 uppercase tracking-widest">Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onFormSubmit }: { onFormSubmit: (data: any) => void }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      onFormSubmit({
        ...form,
        id: Date.now(),
        date: new Date().toLocaleString()
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-black mb-6">Let's <span className="text-cyan-500">Connect</span></h2>
          <div className="w-24 h-2 bg-cyan-500 rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg">I'm currently looking for new opportunities. My inbox is always open.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="glass p-10 rounded-[40px] border border-white/5 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl border border-cyan-500/20">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Me</p>
                  <p className="text-xl font-black text-white">arunkashyap7834@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl border border-cyan-500/20">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Call Me</p>
                  <p className="text-xl font-black text-white">+91 88106 21749</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl border border-cyan-500/20">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="text-xl font-black text-white">India</p>
                </div>
              </div>
              <div className="pt-10 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-500 font-black uppercase tracking-widest text-sm">Available for projects</span>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={send} className="glass p-10 rounded-[40px] border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
              <input 
                required
                className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" 
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email"
                className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" 
                placeholder="john@example.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Subject</label>
              <input 
                required
                className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" 
                placeholder="Project Inquiry"
                value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium resize-none" 
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
              />
            </div>
            <button 
              disabled={status === 'sending'}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/20 active:scale-[0.98] ${status === 'success' ? 'from-green-500 to-green-600' : ''}`}
            >
              {status === 'sending' ? <i className="fas fa-circle-notch fa-spin"></i> : 
               status === 'success' ? <><i className="fas fa-check"></i> Sent!</> : 
               <><i className="fas fa-paper-plane"></i> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onSymbolClick }: { onSymbolClick: () => void }) => (
  <footer className="py-20 px-6 bg-[#010409] border-t border-white/5 relative">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
      <div className="flex gap-4">
        {[
          // { icon: 'linkedin-in', link: '#' },
          // { icon: 'github', link: '#' },
    // { icon: 'whatsapp', link: '#' },
          // { icon: 'instagram', link: '#' },
    {
    icon: 'linkedin-in',
    link: 'https://www.linkedin.com/in/arun-kashyap-22188a325/'
  },
  {
    icon: 'github',
    link: 'https://github.com/ak-developer78'
  },
  {
    icon: 'instagram',
    link: '#' // you said leave insta
  },
  {
    icon: 'whatsapp',
    link: 'https://wa.me/918810621749?text=Hello%20Arun'
  }
          
          { icon: 'envelope', link: 'mailto:arunkashyap7834@gmail.com' }
        ].map((s, idx) => (
          <a key={idx} href={s.link} className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-110">
            <i className={`fab fa-${s.icon} ${s.icon === 'envelope' ? 'fas' : ''} text-lg`}></i>
          </a>
        ))}
      </div>
      
      <div className="text-center space-y-3">
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
          © 2026 Arun. All rights reserved.
        </p>
        <p className="text-gray-600 font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2">
          Built with <span className="text-cyan-500">React</span>, <span className="text-cyan-500">Tailwind CSS</span> & <span className="text-cyan-500">Magic</span>
        </p>
      </div>
    </div>
    {/* Unique Hidden Symbol with Animation */}
    <div 
      onClick={onSymbolClick}
      className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-cyan-500/10 cursor-pointer hover:bg-cyan-500/30 hover:animate-pulse transition-all z-0 flex items-center justify-center"
      title="Admin Access"
    >
      <div className="w-1 h-1 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500"></div>
    </div>
  </footer>
);

// --- Admin Dashboard & Login ---

const LoginModal = ({ onClose, onLogin }: { onClose: () => void, onLogin: (pin: string, pass: string) => void }) => {
  const [pin, setPin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '8287' && pass === 'Ajay@8287') {
      onLogin(pin, pass);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-6">
      <div className="glass p-10 rounded-[40px] border border-white/10 w-full max-w-md relative animate-in fade-in zoom-in duration-300 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 text-3xl border border-cyan-500/20 mx-auto mb-6">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2 className="text-3xl font-black text-white">Admin Access</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Enter credentials to proceed</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">PIN Number</label>
            <input 
              required
              type="text"
              maxLength={4}
              className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-mono tracking-[1em] text-center" 
              placeholder="****"
              value={pin}
              onChange={e => setPin(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              required
              type="password"
              className="w-full bg-[#030712] border-2 border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" 
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs font-black text-center animate-bounce">{error}</p>}
          <button className="w-full py-5 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-[#030712] font-black text-lg transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard = ({ submissions, onClose, onDelete }: { submissions: any[], onClose: () => void, onDelete: (id: number) => void }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-[#030712] overflow-y-auto pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Personalized Welcome Section - Unique for Ajay */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-in slide-in-from-top duration-700">
          <div>
            <h1 className="text-6xl font-black text-white leading-none">
              Welcome back, <span className="text-cyan-500">Ajay</span>.
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs mt-4">System Administrator | Portfolio Controller</p>
          </div>
          <button 
            onClick={onClose}
            className="mt-8 md:mt-0 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95"
          >
            <i className="fas fa-sign-out-alt"></i> Exit Secure Mode
          </button>
        </div>

        {/* Quick Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-in fade-in duration-1000 delay-150">
          <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -mr-8 -mt-8"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Total Messages</p>
            <h3 className="text-4xl font-black text-white mt-2 group-hover:scale-110 transition-transform origin-left">{submissions.length}</h3>
          </div>
          <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-8 -mt-8"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">System Status</p>
            <h3 className="text-4xl font-black text-green-500 mt-2">ACTIVE</h3>
          </div>
          <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Uptime</p>
            <h3 className="text-4xl font-black text-white mt-2">99.9%</h3>
          </div>
          <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-8 -mt-8"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Security</p>
            <h3 className="text-4xl font-black text-white mt-2">ENCRYPTED</h3>
          </div>
        </div>

        {/* Unique "Only Me" Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-4">
              <i className="fas fa-inbox text-cyan-500"></i>
              Inbox Submissions
            </h2>
            
            {submissions.length === 0 ? (
              <div className="glass p-20 rounded-[40px] border border-white/5 text-center">
                <div className="text-gray-800 text-6xl mb-6">
                  <i className="fas fa-ghost"></i>
                </div>
                <h3 className="text-2xl font-black text-white">No signals detected</h3>
                <p className="text-gray-600 font-medium mt-2">Awaiting connection from visitors.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((sub) => (
                  <div key={sub.id} className="glass p-8 rounded-[32px] border border-white/5 hover:border-cyan-500/20 transition-all relative group animate-in slide-in-from-bottom duration-300">
                    <button 
                      onClick={() => onDelete(sub.id)}
                      className="absolute top-8 right-8 text-gray-600 hover:text-red-500 transition-colors p-2"
                      title="Delete Entry"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                        {sub.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{sub.name}</h4>
                          <p className="text-gray-500 font-bold text-sm tracking-tight">{sub.email}</p>
                        </div>
                        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400">
                          {sub.subject}
                        </div>
                        <div className="bg-[#010409]/60 p-6 rounded-2xl border border-white/5 mt-4">
                          <p className="text-gray-400 text-sm leading-relaxed">{sub.message}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-600">
                          <span>Received: {sub.date}</span>
                          <span>UID: {sub.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Owners Only: Tech Stack & System Status */}
          <div className="space-y-8 animate-in slide-in-from-right duration-1000">
             <h2 className="text-2xl font-black text-white flex items-center gap-4">
              <i className="fas fa-microchip text-cyan-500"></i>
              System Core
            </h2>
            <div className="glass p-8 rounded-[40px] border border-white/5 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Environment Info</p>
                <div className="space-y-3">
                  {[
                    { label: 'OS', value: 'PortOS 2.0' },
                    { label: 'Latency', value: '14ms' },
                    { label: 'Storage', value: 'LocalCache@v1' },
                    { label: 'Auth', value: 'Ajay Secure' }
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-bold">{stat.label}</span>
                      <span className="text-cyan-400 font-black">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-white/5">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Traffic Analyzer</p>
                 <div className="h-40 flex items-end gap-1 px-2">
                    {[30, 45, 20, 60, 80, 50, 40, 70, 90, 60, 45, 80].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-cyan-500/20 rounded-t-sm hover:bg-cyan-500 transition-all cursor-crosshair" 
                        style={{ height: `${h}%` }}
                        title={`Point ${i}: ${h}% capacity`}
                      ></div>
                    ))}
                 </div>
              </div>
              <div className="pt-8 border-t border-white/5">
                 <button className="w-full py-4 rounded-2xl bg-white/5 text-gray-400 hover:text-white border border-white/10 font-black text-[10px] uppercase tracking-widest transition-all">
                    Generate System Report
                 </button>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border border-white/5 flex items-center gap-6">
               <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 animate-pulse">
                  <i className="fas fa-check-double"></i>
               </div>
               <div>
                  <h4 className="text-sm font-black text-white">All Systems Nominal</h4>
                  <p className="text-xs text-gray-600 font-bold">Encrypted connection active.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse submissions');
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (data: any) => {
    const newSubmissions = [data, ...submissions];
    setSubmissions(newSubmissions);
    localStorage.setItem('portfolio_submissions', JSON.stringify(newSubmissions));
  };

  const handleDeleteSubmission = (id: number) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const filtered = submissions.filter(s => s.id !== id);
      setSubmissions(filtered);
      localStorage.setItem('portfolio_submissions', JSON.stringify(filtered));
    }
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact onFormSubmit={handleFormSubmit} />
      <Footer onSymbolClick={() => setShowLogin(true)} />
      
      {/* Admin UI */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onLogin={() => {
            setShowLogin(false);
            setIsLoggedIn(true);
          }}
        />
      )}

      {isLoggedIn && (
        <Dashboard 
          submissions={submissions} 
          onClose={() => setIsLoggedIn(false)} 
          onDelete={handleDeleteSubmission}
        />
      )}

      {/* Dynamic Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 w-16 h-16 bg-cyan-500 text-[#030712] rounded-2xl shadow-2xl shadow-cyan-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 z-50 group border-4 border-white/10 ${showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'}`}
      >
        <i className="fas fa-chevron-up text-2xl group-hover:-translate-y-1 transition-transform"></i>
      </button>
    </div>
  );
};

export default App;
