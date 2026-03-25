
const { useState, useEffect, useRef, useCallback } = React;

// ==========================================
// INLINE SVGS (Replaces failing lucide-react CDN)
// ==========================================
const Icons = {
  Cpu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>,
  MonitorPlay: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10 7 5 3-5 3Z"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>,
  MemoryStick: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z"/><path d="M10 6v15"/><path d="M14 6v15"/><path d="M6 10h12"/><path d="M6 14h12"/><path d="M6 18h12"/></svg>,
  HardDrive: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>,
  Network: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></svg>,
  Zap: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  ChevronDown: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Moon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Flame: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
  Sun: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>,
  Diamond: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path></svg>,
  Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Play: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  ArrowRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>,
  Server: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  Database: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
  Terminal: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
  FastForward: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>,
  CheckCircle2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
};

const { 
  Cpu, MonitorPlay, MemoryStick, HardDrive, Network, Zap, 
  ChevronDown, Moon, Flame, Sun, Diamond, Activity, Play, 
  ArrowRight, Server, Database, Terminal, FastForward, CheckCircle2 
} = Icons;

// ==========================================
// 1. THEME ENGINE & DATA SYSTEMS
// ==========================================

const THEMES = {
  dark: {
    id: 'dark', name: 'Dark Matter', icon: Moon,
    vars: {
      '--bg-base': '#030712', '--bg-surface': 'rgba(15, 23, 42, 0.4)', '--bg-surface-solid': '#0a0f1e',
      '--text-main': '#f8fafc', '--text-muted': '#94a3b8',
      '--border-light': 'rgba(255, 255, 255, 0.08)', '--border-glow': 'rgba(56, 189, 248, 0.2)',
      '--glass-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.6)', '--accent': '#00d4ff', '--accent2': '#7c3aed'
    }
  },
  neon: {
    id: 'neon', name: 'Overdrive', icon: Flame,
    vars: {
      '--bg-base': '#050000', '--bg-surface': 'rgba(40, 0, 0, 0.5)', '--bg-surface-solid': '#1a0000',
      '--text-main': '#ffffff', '--text-muted': '#ff4444',
      '--border-light': 'rgba(255, 0, 0, 0.3)', '--border-glow': 'rgba(255, 0, 0, 0.6)',
      '--glass-shadow': '0 0 50px 0 rgba(255, 0, 0, 0.3)', '--accent': '#ff003c', '--accent2': '#ff00ff'
    }
  },
  light: {
    id: 'light', name: 'Aero Glass', icon: Sun,
    vars: {
      '--bg-base': '#f8f9ff', '--bg-surface': 'rgba(255, 255, 255, 0.6)', '--bg-surface-solid': '#eef0fa',
      '--text-main': '#0f172a', '--text-muted': '#64748b',
      '--border-light': 'rgba(0, 0, 0, 0.08)', '--border-glow': 'rgba(99, 102, 241, 0.1)',
      '--glass-shadow': '0 8px 32px 0 rgba(30, 41, 59, 0.1)', '--accent': '#4f46e5', '--accent2': '#7c3aed'
    }
  },
  quantum: {
    id: 'quantum', name: 'Golden Ratio', icon: Diamond,
    vars: {
      '--bg-base': '#050504', '--bg-surface': 'rgba(20, 20, 15, 0.6)', '--bg-surface-solid': '#141410',
      '--text-main': '#fdfbf7', '--text-muted': '#bfa75d',
      '--border-light': 'rgba(212, 175, 55, 0.15)', '--border-glow': 'rgba(212, 175, 55, 0.4)',
      '--glass-shadow': '0 12px 40px 0 rgba(0, 0, 0, 0.9)', '--accent': '#d4af37', '--accent2': '#f59e0b'
    }
  }
};

const componentsData = [
  {
    id: 'cpu', title: 'Central Processing Unit', short: 'CPU', icon: Cpu, color: '#0ea5e9',
    tagline: 'The Master Orchestrator',
    description: 'Operating at billions of cycles per second, the CPU fetches, decodes, and executes complex instructions. It relies on quantum-scale transistors to process logical workflows with ruthless efficiency.',
    stats: { Clock: '6.0 GHz', Cores: '64+', Transistors: '50 Billion' },
    progress: [{ label: 'IPC Performance', val: 94 }, { label: 'Power Efficiency', val: 78 }]
  },
  {
    id: 'ram', title: 'Random Access Memory', short: 'RAM', icon: MemoryStick, color: '#a855f7',
    tagline: 'Volatile Staging Ground',
    description: 'The relentless, high-speed workspace. RAM holds the instantaneous data required by the CPU. Operating in nanoseconds, it feeds the beast but forgets everything the moment power is severed.',
    stats: { Bandwidth: '100 GB/s', Latency: '10ns', Type: 'DDR5' },
    progress: [{ label: 'Bandwidth', val: 88 }, { label: 'Latency', val: 72 }]
  },
  {
    id: 'gpu', title: 'Graphics Processing Unit', short: 'GPU', icon: MonitorPlay, color: '#f59e0b',
    tagline: 'Parallel Leviathan',
    description: 'Where the CPU is a few elite generals, the GPU is an army of thousands. Designed for massive parallel matrix mathematics, it renders worlds and trains the neural networks driving modern AI.',
    stats: { Cores: '16,000+', VRAM: '24GB', TFLOPS: '80+' },
    progress: [{ label: 'Parallel Compute', val: 99 }, { label: 'AI Performance', val: 95 }]
  },
  {
    id: 'storage', title: 'Solid State Storage', short: 'NVMe', icon: HardDrive, color: '#10b981',
    tagline: 'The Persistent Vault',
    description: 'Abandoning mechanical platters, NVMe drives trap electrons within microscopic NAND gates. They provide permanent storage, communicating directly over high-speed PCIe lanes.',
    stats: { Read: '14,000 MB/s', Write: '12,000 MB/s', Protocol: 'Gen5' },
    progress: [{ label: 'Sequential Read', val: 92 }, { label: 'Endurance', val: 85 }]
  },
  {
    id: 'network', title: 'Network Controller', short: 'NIC', icon: Network, color: '#ef4444',
    tagline: 'Gateway to the Matrix',
    description: 'The crucial link connecting localized silicon to the global digital expanse. Translating electrical impulses into fiber-optic light or radio waves, binding the system to the internet.',
    stats: { Speed: '100 Gbps', Latency: '<1ms', Medium: 'Fiber/Wave' },
    progress: [{ label: 'Throughput', val: 90 }, { label: 'Latency', val: 82 }]
  }
];

const timelineData = [
  { year: '1971', title: 'Intel 4004', desc: 'The first commercial microprocessor. 2,300 transistors, 740kHz. The spark that ignited the silicon revolution.', side: 'left' },
  { year: '1983', title: 'DRAM Evolution', desc: '256Kb DRAM chips. Memory becomes affordable, enabling personal computers to process real workloads.', side: 'right' },
  { year: '1993', title: 'Pentium Era', desc: '60MHz, 3.1M transistors. Mass market computing becomes reality. PC revolution ignites.', side: 'left' },
  { year: '2007', title: 'SSD Revolution', desc: 'Flash storage replaces spinning disks. 1000x faster access reshapes operating system design.', side: 'right' },
  { year: '2017', title: 'GPU AI Breakthrough', desc: 'NVIDIA Volta with Tensor Cores. GPUs redefine intelligence itself, powering the deep learning era.', side: 'left' },
  { year: '2024', title: '3nm Silicon', desc: 'Over 20 billion transistors per chip. Physics pushed to near-atomic limits. What comes next?', side: 'right' }
];

// ==========================================
// 2. ADVANCED HOOKS
// ==========================================

const useMousePosition = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0, px: 0, py: 0 });
  useEffect(() => {
    const update = (e) => {
      setMouse({
        x: e.clientX, y: e.clientY,
        px: (e.clientX / window.innerWidth) * 2 - 1,
        py: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);
  return mouse;
};

const useDecryptText = (text, isVisible, speed = 30) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  
  useEffect(() => {
    if (!isVisible) return;
    let iteration = 0;
    let interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, isVisible, speed]);

  return displayText || text.replace(/./g, '0');
};

const useRevealObserver = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

// ==========================================
// 3. CORE BACKGROUND & WIDGETS
// ==========================================

const LiveTerminal = ({ currentLog }) => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    if (currentLog) {
      setLogs(prev => [...prev.slice(-5), currentLog]);
      return;
    }
    const ops = ['ALLOC', 'FETCH', 'DECODE', 'EXEC', 'FLUSH', 'SYNC'];
    const addLog = () => {
      const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
      const op = ops[Math.floor(Math.random() * ops.length)];
      const ms = (Math.random() * 2).toFixed(2);
      setLogs(prev => [...prev.slice(-5), `[0x${hex}] ${op} ... ${ms}ms`]);
    };
    const int = setInterval(addLog, 1200);
    return () => clearInterval(int);
  }, [currentLog]);

  return (
    <div className="fixed bottom-6 left-6 z-[80] glass-panel p-4 rounded-xl font-mono text-[10px] text-[var(--accent)] w-72 hidden lg:flex flex-col gap-1 pointer-events-none opacity-90 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[var(--accent)]/20">
      <div className="flex justify-between border-b border-[var(--border-light)] pb-2 mb-2 items-center">
         <span className="flex items-center gap-2 font-bold"><Terminal className="w-3 h-3" /> SYS.MONITOR</span>
         <span className="animate-pulse text-[var(--accent2)]">● REC</span>
      </div>
      <div className="flex flex-col gap-1.5 h-[100px] overflow-hidden justify-end">
        {logs.map((log, i) => (
          <div key={i} className="opacity-80 break-words leading-tight" style={{ opacity: (i + 1) / logs.length }}>{log}</div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-[var(--border-light)] text-[var(--text-muted)] flex justify-between">
         <span>CPU: {(40 + Math.random() * 10).toFixed(1)}°C</span>
         <span>MEM: {(30 + Math.random() * 5).toFixed(1)}%</span>
      </div>
    </div>
  );
};

const ThreeHeroBackground = ({ themeId }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let scene, camera, renderer, torusKnot, wireKnot, particles;

    const init = () => {
      if (!window.THREE || !mountRef.current) return;
      const W = window.innerWidth;
      const H = window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      if (mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);
      mountRef.current.appendChild(renderer.domElement);

      const accentColor = THEMES[themeId].vars['--accent'];
      const accent2Color = THEMES[themeId].vars['--accent2'];
      const hex1 = parseInt(accentColor.replace('#', '0x'));
      const hex2 = parseInt(accent2Color.replace('#', '0x'));

      // Torus
      const geom = new THREE.TorusKnotGeometry(1.8, 0.45, 200, 20, 2, 3);
      const mat = new THREE.MeshPhongMaterial({
        color: hex1, emissive: 0x001122,
        wireframe: false, transparent: true, opacity: 0.85, shininess: 100
      });
      torusKnot = new THREE.Mesh(geom, mat);
      scene.add(torusKnot);

      const wireMat = new THREE.MeshBasicMaterial({
        color: hex2, wireframe: true, transparent: true, opacity: 0.15
      });
      wireKnot = new THREE.Mesh(geom, wireMat);
      scene.add(wireKnot);

      // Lights
      const light1 = new THREE.PointLight(hex1, 2, 20);
      scene.add(light1);
      const light2 = new THREE.PointLight(hex2, 1.5, 20);
      light2.position.set(-3, -2, 2);
      scene.add(light2);
      scene.add(new THREE.AmbientLight(0x111122, 0.5));

      // Particles
      const partGeom = new THREE.BufferGeometry();
      const count = 300;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 12;
      partGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const partMat = new THREE.PointsMaterial({ color: hex1, size: 0.03, transparent: true, opacity: 0.5 });
      particles = new THREE.Points(partGeom, partMat);
      scene.add(particles);

      let mouseX = 0, mouseY = 0;
      const onMouseMove = (e) => {
        mouseX = (e.clientX / W - 0.5) * 2;
        mouseY = (e.clientY / H - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        torusKnot.rotation.x = t * 0.3 + mouseY * 0.3;
        torusKnot.rotation.y = t * 0.4 + mouseX * 0.3;
        wireKnot.rotation.copy(torusKnot.rotation);
        light1.position.set(Math.sin(t) * 4, Math.cos(t * 0.7) * 3, 3);
        particles.rotation.y = t * 0.05;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    };

    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;
      script.onload = init;
      document.head.appendChild(script);
    } else {
      init();
    }

    return () => cancelAnimationFrame(animationId);
  }, [themeId]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-70" />;
};

const InteractiveParticleCanvas = ({ theme, mouse }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef(mouse);
  
  useEffect(() => { mouseRef.current = mouse; }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.8;
        this.baseVy = (Math.random() - 0.5) * 0.8;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.size = Math.random() * 1.5 + 0.5;
      }
      update(mx, my) {
        const dx = mx - this.x, dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx -= (dx / dist) * force * 0.5;
          this.vy -= (dy / dist) * force * 0.5;
        }
        this.vx += (this.baseVx - this.vx) * 0.05;
        this.vy += (this.baseVy - this.vy) * 0.05;

        this.x += this.vx; this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const isLight = theme.id === 'light';
    const baseColor = isLight ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    const lineColor = isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.05)';

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach((p, i) => {
        p.update(mx, my); p.draw(ctx, baseColor);
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.strokeStyle = lineColor; ctx.lineWidth = 1 - dist/150;
            ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50" />;
};

const TiltModel = ({ children, mouse, depth = 35 }) => {
  const rotateX = mouse.py * -depth;
  const rotateY = mouse.px * depth;
  return (
    <div className="perspective-[2000px] w-full h-full flex items-center justify-center">
      <div className="relative preserve-3d transition-transform duration-[400ms] ease-out will-change-transform" style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 4. ADVANCED CSS 3D MODELS 
// ==========================================

const ModelCPU = () => (
  <div className="relative w-56 h-56 preserve-3d group">
    <div className="absolute inset-0 bg-[#0f172a] rounded-xl border-2 border-[#0ea5e9]/40 transform-gpu translate-z-[-20px] shadow-[0_0_60px_rgba(14,165,233,0.3)]">
       <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5 p-1 opacity-20">
          {Array.from({length: 144}).map((_, i) => <div key={i} className="bg-[#0ea5e9]" />)}
       </div>
    </div>
    <div className="absolute inset-6 bg-[#0ea5e9]/10 backdrop-blur-xl rounded-lg border border-[#0ea5e9]/80 transform-gpu translate-z-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#0ea5e9]/50 to-transparent -translate-y-full animate-[scan-y_3s_ease-in-out_infinite]" />
       <div className="w-[70%] h-[70%] grid grid-cols-4 grid-rows-4 gap-2 preserve-3d transform-gpu translate-z-[15px]">
          {Array.from({length: 16}).map((_, i) => (
             <div key={i} className="bg-[#0ea5e9]/20 border border-[#0ea5e9]/50 relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-[#0ea5e9] animate-[pulse-fast_2s_infinite]" style={{ opacity: Math.random() > 0.5 ? 0.9 : 0.2, animationDelay: `${i*0.1}s` }} />
             </div>
          ))}
       </div>
    </div>
    <div className="absolute -inset-4 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-md transform-gpu translate-z-[80px] pointer-events-none flex items-start justify-end p-4 shadow-2xl">
      <span className="font-mono text-[8px] text-[#0ea5e9] tracking-[0.4em] opacity-80">QUANTUM_LITHOGRAPHY</span>
    </div>
  </div>
);

const ModelGPU = () => (
  <div className="relative w-80 h-44 preserve-3d rotate-z-[15deg] rotate-x-[20deg]">
    <div className="absolute inset-0 bg-[#0a0f1c] rounded-lg border-2 border-[#f59e0b]/60 transform-gpu translate-z-[-30px] shadow-[0_0_80px_rgba(245,158,11,0.4)] flex justify-between p-2">
       <div className="w-10 h-full border-r border-[#f59e0b]/30 grid grid-rows-12 gap-1 opacity-50">
          {Array.from({length: 12}).map((_, i) => <div key={i} className="w-full h-full bg-[#f59e0b]" />)}
       </div>
    </div>
    <div className="absolute inset-2 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded border border-gray-600 transform-gpu translate-z-[20px] shadow-2xl flex items-center justify-around px-4">
      {[1, 2, 3].map((fan) => (
        <div key={fan} className="relative w-20 h-20 rounded-full border-2 border-gray-700 bg-black flex items-center justify-center preserve-3d shadow-inner overflow-hidden">
           <div className="absolute w-[150%] h-[150%] animate-[spin_0.3s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(245,158,11,0.3) 60deg, transparent 120deg, rgba(245,158,11,0.3) 180deg, transparent 240deg, rgba(245,158,11,0.3) 300deg)' }} />
           <div className="absolute w-full h-full border-[6px] border-dashed border-[#f59e0b]/80 rounded-full animate-[spin_1s_linear_infinite_reverse]" />
           <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#f59e0b] z-10 shadow-[0_0_15px_#f59e0b]" />
        </div>
      ))}
    </div>
    <div className="absolute -inset-x-2 -inset-y-6 border-y-4 border-x border-[#f59e0b]/40 rounded-xl bg-white/5 backdrop-blur-[2px] transform-gpu translate-z-[70px] pointer-events-none flex items-end justify-center pb-2">
       <span className="font-mono text-[10px] text-[#f59e0b] tracking-widest opacity-90 drop-shadow-md">TENSOR_CORE_ARRAY</span>
    </div>
  </div>
);

const ModelRAM = () => (
  <div className="relative w-64 h-64 preserve-3d flex justify-center gap-6 rotate-x-[25deg] rotate-y-[-20deg]">
    {[0, 1].map((stick) => (
      <div key={stick} className="relative w-14 h-60 preserve-3d group" style={{ transform: `translateZ(${stick * -50}px)` }}>
        <div className="absolute inset-0 bg-[#2e1065] rounded-sm border border-[#a855f7]/60 flex flex-col justify-between py-2 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <div className="absolute -bottom-2 w-full h-2 flex gap-[1px] px-1">
             {Array.from({length: 16}).map((_, i) => <div key={i} className="flex-1 bg-yellow-500/80" />)}
          </div>
          <div className="flex-1 flex flex-col gap-2 px-1.5 pt-2">
             {Array.from({length: 8}).map((_, i) => (
                <div key={i} className="flex-1 bg-black rounded-sm border border-[#a855f7]/40 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7] to-transparent opacity-50 animate-[scan-y_1.5s_linear_infinite]" style={{ animationDelay: `${(stick*0.5) + (i*0.1)}s` }} />
                </div>
             ))}
          </div>
        </div>
        <div className="absolute inset-x-[-3px] inset-y-0 bg-white/10 backdrop-blur-md border border-[#a855f7]/60 transform-gpu translate-z-[15px] rounded-sm overflow-hidden flex justify-center">
            <div className="w-full h-3 bg-[#a855f7] shadow-[0_0_30px_#a855f7] animate-[pulse-fast_1s_infinite]" style={{ animationDelay: `${stick * 0.5}s` }} />
        </div>
      </div>
    ))}
  </div>
);

const ModelStorage = () => (
  <div className="relative w-80 h-28 preserve-3d rotate-x-[35deg] rotate-z-[-25deg]">
     <div className="absolute inset-0 bg-[#064e3b] rounded-md border-2 border-[#10b981]/60 transform-gpu translate-z-[-10px] shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center gap-6 px-6">
        <div className="w-14 h-14 bg-black/90 rounded border-2 border-[#10b981] relative flex items-center justify-center shadow-inner overflow-hidden">
           <div className="absolute inset-0 border-[4px] border-dashed border-[#10b981]/30 rounded animate-[spin_4s_linear_infinite]" />
           <div className="w-4 h-4 rounded-full bg-[#10b981] animate-ping shadow-[0_0_20px_#10b981]" />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3 h-20">
           {Array.from({length: 4}).map((_, i) => (
             <div key={i} className="bg-[#0f172a] rounded border border-gray-600 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 bottom-0 w-2 bg-gradient-to-r from-transparent via-[#10b981] to-transparent shadow-[0_0_20px_#10b981] animate-[scan-x_1.2s_linear_infinite]" style={{ animationDelay: `${i * 0.25}s` }} />
             </div>
           ))}
        </div>
     </div>
     <div className="absolute inset-x-2 inset-y-[-15px] bg-white/5 backdrop-blur-xl border border-[#10b981]/40 rounded transform-gpu translate-z-[40px] flex items-center justify-center pointer-events-none shadow-2xl">
        <h3 className="text-[#10b981] font-black text-3xl tracking-[0.6em] opacity-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">NAND_FLASH</h3>
     </div>
  </div>
);

const ModelNetwork = () => (
  <div className="relative w-64 h-64 preserve-3d">
    <div className="absolute inset-0 flex items-center justify-center transform-gpu">
       <div className="w-20 h-20 rounded-full bg-[#ef4444]/20 border-2 border-[#ef4444] shadow-[0_0_60px_rgba(239,68,68,0.8)] animate-[pulse-fast_2s_infinite]" />
    </div>
    {[0, 45, 90, 135].map((deg, i) => (
       <div key={deg} className="absolute inset-0 rounded-full border-2 border-dashed border-[#ef4444]/60"
         style={{ transform: `rotateX(75deg) rotateY(${deg}deg)`, animation: `spin ${10 + i * 2}s linear infinite` }}>
          <div className="absolute top-0 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-[#ef4444] rounded-full shadow-[0_0_20px_#ef4444] flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
       </div>
    ))}
    <div className="absolute inset-[-10%] transform-gpu translate-z-[60px] pointer-events-none rounded-full border border-white/20 bg-white/5 backdrop-blur-[4px] shadow-2xl" />
  </div>
);

// ==========================================
// 5. MAIN NARRATIVE SECTIONS
// ==========================================

const HeroSection = ({ themeId }) => {
  const [ref, isVisible] = useRevealObserver(0.1);
  const title1 = useDecryptText('SILICON', isVisible, 50);
  const title2 = useDecryptText('MIND', isVisible, 60);

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
      <ThreeHeroBackground themeId={themeId} />
      
      <div className="z-10 text-center max-w-5xl relative mt-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-xs font-bold tracking-widest uppercase mb-10 border border-[var(--border-light)] hover:scale-105 transition-transform duration-300 cursor-default shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-[pulse-fast_1.5s_infinite] shadow-[0_0_10px_var(--accent)]" /> 
          Architecture Diagnostics
        </div>
        
        <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-black tracking-tighter mb-4 leading-[0.85] flex flex-col glitch-container">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-main)] to-[var(--text-muted)] drop-shadow-2xl relative z-10" data-text={title1}>
            {title1}
          </span>
          <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px var(--accent)', backgroundImage: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
            {title2}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-[var(--text-muted)] font-light leading-relaxed mb-16 max-w-3xl mx-auto opacity-0 animate-[fade-in_1.5s_ease-out_1s_both]">
          An immersive journey through the core components that power modern computing — from silicon transistors to neural networks.
        </p>

        <div className="animate-[bounce_2s_infinite] text-[var(--text-muted)] opacity-0 animate-[fade-in_2s_ease-out_1.5s_both]">
          <span className="text-xs uppercase tracking-[0.4em] block mb-3 font-mono">Scroll to Initialize</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--accent)] to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};

const IntroSection = () => {
  const [ref, isVisible] = useRevealObserver(0.3);
  const title = useDecryptText('Anatomy of Compute.', isVisible, 40);
  
  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center px-6 py-24 z-10 bg-[var(--bg-surface-solid)] border-t border-[var(--border-light)]">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'}`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-4 flex items-center gap-3">
             <div className="w-8 h-px bg-[var(--accent)]" /> Chapter 01
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
            The {title.split(' ')[0]} <br/><span className="text-[var(--accent)]">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light leading-relaxed mb-8">
            Beneath the smooth glass and cold aluminum lies a chaotic, heavily orchestrated dance of electrons. Billions of components working in absolute unison.
          </p>
          <div className="border-l-4 border-[var(--accent)] pl-6 py-2 glass-panel rounded-r-xl shadow-lg">
             <p className="text-lg text-[var(--text-main)] font-medium leading-relaxed">
               We break down the five pillars of architecture, transforming abstract concepts into tangible interactive models rendered in real-time.
             </p>
          </div>
        </div>
        
        <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
          {[
            { icon: Activity, title: 'Processing', desc: 'Logic & Mathematics' },
            { icon: Database, title: 'Storage', desc: 'Non-Volatile Persistence' },
            { icon: Zap, title: 'Memory', desc: 'Volatile Execution Cache' },
            { icon: Server, title: 'Networking', desc: 'Global I/O Routing' }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group cursor-default border border-[var(--border-light)] hover:border-[var(--accent)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <item.icon className="w-10 h-10 text-[var(--accent)] mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="font-bold text-xl mb-2 text-[var(--text-main)]">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExplorationSection = ({ mouse }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = height - windowHeight;
      const currentScroll = -top;
      
      let progress = currentScroll / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPanels = componentsData.length;
  const translateX = -(scrollProgress * ((totalPanels - 1) * 100));

  return (
    <section ref={containerRef} className="relative bg-[var(--bg-base)]" style={{ height: `${totalPanels * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[var(--bg-base)]">
        
        {/* Dynamic Nav Indicators */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-3 z-50 glass-panel px-6 py-3 rounded-full shadow-2xl">
           {componentsData.map((_, i) => {
             const isActive = Math.round(scrollProgress * (totalPanels - 1)) === i;
             return <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? 'w-16 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]' : 'w-4 bg-[var(--border-light)] hover:bg-[var(--text-muted)]'}`} />
           })}
        </div>

        <div className="flex h-full transition-transform duration-100 ease-out will-change-transform" style={{ width: `${totalPanels * 100}vw`, transform: `translateX(${translateX}vw)` }}>
          {componentsData.map((comp, index) => {
            const panelProgress = scrollProgress * (totalPanels - 1);
            const isVisible = Math.abs(panelProgress - index) < 0.8;
            const parallaxOffset = (panelProgress - index) * 200;

            return (
              <div key={comp.id} className="w-screen h-full flex items-center justify-center px-6 md:px-24 relative overflow-hidden">
                <div 
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[25vw] font-black uppercase whitespace-nowrap opacity-[0.03] pointer-events-none select-none transition-transform duration-75"
                  style={{ color: comp.color, transform: `translate(calc(-50% + ${parallaxOffset}px), -50%)` }}
                >
                  {comp.short}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] transition-opacity duration-1000 pointer-events-none mix-blend-screen"
                  style={{ backgroundColor: comp.color, opacity: isVisible ? 0.15 : 0 }} />

                <div className={`w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center transition-all duration-[800ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                  
                  {/* Left: 3D Showcase */}
                  <div className="glass-panel rounded-[2.5rem] p-8 relative h-[450px] lg:h-[650px] flex items-center justify-center group overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, ${comp.color} 2px, transparent 2px)`, backgroundSize: '30px 30px' }} />
                    <TiltModel mouse={mouse} depth={40}>
                      {comp.id === 'cpu' && <ModelCPU />}
                      {comp.id === 'gpu' && <ModelGPU />}
                      {comp.id === 'ram' && <ModelRAM />}
                      {comp.id === 'storage' && <ModelStorage />}
                      {comp.id === 'network' && <ModelNetwork />}
                    </TiltModel>
                  </div>

                  {/* Right: Typography & Data */}
                  <div className="flex flex-col z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="p-5 rounded-2xl glass-panel border shadow-lg" style={{ borderColor: `${comp.color}50` }}>
                        <comp.icon className="w-10 h-10" style={{ color: comp.color }} />
                      </div>
                      <h4 className="text-lg font-black tracking-[0.4em] uppercase" style={{ color: comp.color }}>{comp.short}</h4>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black mb-4 tracking-tight drop-shadow-lg text-[var(--text-main)] leading-none">{comp.title}</h2>
                    <h3 className="text-2xl text-[var(--text-main)] font-medium mb-8 opacity-90 border-l-4 pl-4" style={{ borderColor: comp.color }}>{comp.tagline}</h3>
                    <p className="text-xl text-[var(--text-muted)] leading-relaxed font-light mb-10">{comp.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-10">
                      {Object.entries(comp.stats).map(([key, value], i) => (
                        <div key={key} className={`glass-panel p-4 rounded-xl border-t-2 transition-all duration-500 hover:-translate-y-2`} 
                             style={{ borderTopColor: comp.color, transitionDelay: `${i * 100}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                          <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1 font-bold">{key}</div>
                          <div className="font-mono text-sm md:text-lg font-bold text-[var(--text-main)]">{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                      {comp.progress.map((prog, i) => (
                        <div key={i} className="w-full">
                          <div className="flex justify-between text-xs font-mono text-[var(--text-muted)] tracking-widest mb-2 uppercase">
                            <span>{prog.label}</span>
                            <span style={{ color: comp.color }}>{prog.val}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[var(--border-light)] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px]" 
                                 style={{ width: isVisible ? `${prog.val}%` : '0%', backgroundColor: comp.color, transitionDelay: `${400 + i * 200}ms` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EnhancedSimulation = ({ onLogEmit }) => {
  const [ref, isVisible] = useRevealObserver(0.2);
  const [simMode, setSimMode] = useState('idle');

  const modes = [
    { id: 'boot', label: 'System Boot', icon: Play, color: '#00d4ff', flow: ['SSD', 'RAM', 'CPU', 'NET'], log: '▶ SYSTEM BOOT: CPU initializing POST... Loading UEFI from NVMe... Handshaking DDR5... System ready.' },
    { id: 'render', label: '3D Render', icon: MonitorPlay, color: '#f59e0b', flow: ['CPU', 'GPU', 'RAM'], log: '▶ 3D RENDER: CPU draw calls → GPU 4M polygons → VRAM loads textures → Frame composited at 240Hz.' },
    { id: 'ai', label: 'AI Inference', icon: Activity, color: '#a855f7', flow: ['SSD', 'RAM', 'GPU'], log: '▶ AI INFERENCE: Dataset to VRAM → 16k CUDA cores exec matrix math → Tensor FP8 active → Result: 99.2%.' },
    { id: 'transfer', label: 'File Transfer', icon: FastForward, color: '#10b981', flow: ['NET', 'SSD'], log: '▶ FILE TRANSFER: TCP/IP 10Gbps → DMA bypasses CPU → NAND cells written → Integrity SHA-256 OK.' }
  ];

  const handleSimTrigger = (mode) => {
    setSimMode(mode.id);
    onLogEmit(mode.log);
  };

  const getStrokeColor = () => {
    const active = modes.find(m => m.id === simMode);
    return active ? active.color : 'var(--border-light)';
  };

  const isActiveFlow = (source, target) => {
    const active = modes.find(m => m.id === simMode);
    if (!active) return false;
    const sIdx = active.flow.indexOf(source);
    const tIdx = active.flow.indexOf(target);
    return sIdx !== -1 && tIdx !== -1 && Math.abs(sIdx - tIdx) === 1;
  };

  return (
    <section ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 relative bg-[var(--bg-surface-solid)] border-y border-[var(--border-light)] overflow-hidden">
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${simMode !== 'idle' ? 'opacity-10' : 'opacity-0'}`} 
           style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, ${getStrokeColor()} 25%, ${getStrokeColor()} 26%, transparent 27%, transparent 74%, ${getStrokeColor()} 75%, ${getStrokeColor()} 76%, transparent 77%, transparent)`, backgroundSize: '100% 50px', animation: 'scan-y 2s linear infinite' }} />

      <div className={`max-w-5xl w-full text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="font-mono text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-4 flex items-center justify-center gap-3">
             <div className="w-8 h-px bg-[var(--accent)]" /> Chapter 03
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6">Live Simulation</h2>
        <p className="text-[var(--text-muted)] text-xl max-w-3xl mx-auto font-light">
          Watch the components communicate in real time. Select a scenario to visualize data flow execution across the motherboard fabric.
        </p>
      </div>

      <div className={`w-full max-w-[1000px] aspect-[16/10] lg:aspect-[2/1] glass-panel rounded-[2rem] p-8 lg:p-12 relative overflow-hidden transition-all duration-1000 delay-300 shadow-2xl border-2 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ borderColor: simMode !== 'idle' ? getStrokeColor() : 'var(--border-light)' }}>
        
        <div className="w-full h-full relative grid grid-cols-3 grid-rows-2 gap-4 lg:gap-8 items-center justify-items-center z-10">
          
          {/* NET */}
          <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 bg-[var(--bg-base)] ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('NET') ? `border-[${getStrokeColor()}] shadow-[0_0_40px_${getStrokeColor()}66] scale-110 z-20` : 'border-[var(--border-light)]'}`}>
             <Network className={`w-8 h-8 lg:w-10 lg:h-10 ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('NET') ? `text-[${getStrokeColor()}]` : 'text-[var(--text-muted)]'}`} />
             <span className="text-[10px] lg:text-xs font-mono mt-2 uppercase tracking-widest font-bold">NET</span>
          </div>

          {/* RAM (Center Top) */}
          <div className={`col-start-2 w-32 h-24 lg:w-40 lg:h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 bg-[var(--bg-base)] ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('RAM') ? `border-[${getStrokeColor()}] shadow-[0_0_40px_${getStrokeColor()}66] scale-110 z-20` : 'border-[var(--border-light)]'}`}>
             <MemoryStick className={`w-8 h-8 lg:w-10 lg:h-10 ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('RAM') ? `text-[${getStrokeColor()}]` : 'text-[var(--text-muted)]'}`} />
             <span className="text-[10px] lg:text-xs font-mono mt-2 uppercase tracking-widest font-bold">RAM</span>
          </div>

          {/* GPU */}
          <div className={`col-start-3 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 bg-[var(--bg-base)] ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('GPU') ? `border-[${getStrokeColor()}] shadow-[0_0_40px_${getStrokeColor()}66] scale-110 z-20` : 'border-[var(--border-light)]'}`}>
             <MonitorPlay className={`w-8 h-8 lg:w-10 lg:h-10 ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('GPU') ? `text-[${getStrokeColor()}]` : 'text-[var(--text-muted)]'}`} />
             <span className="text-[10px] lg:text-xs font-mono mt-2 uppercase tracking-widest font-bold">GPU</span>
          </div>

          {/* SSD */}
          <div className={`row-start-2 col-start-1 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 bg-[var(--bg-base)] ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('SSD') ? `border-[${getStrokeColor()}] shadow-[0_0_40px_${getStrokeColor()}66] scale-110 z-20` : 'border-[var(--border-light)]'}`}>
             <HardDrive className={`w-8 h-8 lg:w-10 lg:h-10 ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('SSD') ? `text-[${getStrokeColor()}]` : 'text-[var(--text-muted)]'}`} />
             <span className="text-[10px] lg:text-xs font-mono mt-2 uppercase tracking-widest font-bold">SSD</span>
          </div>

          {/* CPU (Center Bottom) */}
          <div className={`row-start-2 col-start-2 w-32 h-24 lg:w-40 lg:h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 bg-[var(--bg-base)] ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('CPU') ? `border-[${getStrokeColor()}] shadow-[0_0_60px_${getStrokeColor()}88] scale-110 z-20` : 'border-[var(--border-light)]'}`}>
             <Cpu className={`w-10 h-10 lg:w-12 lg:h-12 ${simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('CPU') ? `text-[${getStrokeColor()}]` : 'text-[var(--text-muted)]'}`} />
             <span className="text-[10px] lg:text-xs font-mono mt-2 uppercase tracking-widest font-bold">CPU</span>
             {simMode !== 'idle' && modes.find(m=>m.id===simMode).flow.includes('CPU') && <div className="absolute inset-0 bg-current opacity-20 animate-ping rounded-2xl pointer-events-none" style={{ color: getStrokeColor() }}/>}
          </div>
        </div>

        {/* Dynamic SVG Data Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
           <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
           
           {/* NET to SSD */}
           <path d="M 16% 25% L 16% 75%" stroke="var(--border-light)" strokeWidth="2" fill="none" />
           {isActiveFlow('NET', 'SSD') && <path d="M 16% 25% L 16% 75%" stroke={getStrokeColor()} strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[data-flow_0.5s_linear_infinite]" filter="url(#glow)" />}
           
           {/* SSD to RAM */}
           <path d="M 16% 75% L 50% 25%" stroke="var(--border-light)" strokeWidth="2" fill="none" />
           {isActiveFlow('SSD', 'RAM') && <path d="M 16% 75% L 50% 25%" stroke={getStrokeColor()} strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[data-flow_0.5s_linear_infinite]" filter="url(#glow)" />}

           {/* RAM to CPU */}
           <path d="M 50% 25% L 50% 75%" stroke="var(--border-light)" strokeWidth="2" fill="none" />
           {isActiveFlow('RAM', 'CPU') && <path d="M 50% 25% L 50% 75%" stroke={getStrokeColor()} strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[data-flow_0.3s_linear_infinite]" filter="url(#glow)" />}

           {/* CPU to GPU */}
           <path d="M 50% 75% L 84% 25%" stroke="var(--border-light)" strokeWidth="2" fill="none" />
           {isActiveFlow('CPU', 'GPU') && <path d="M 50% 75% L 84% 25%" stroke={getStrokeColor()} strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[data-flow_0.4s_linear_infinite]" filter="url(#glow)" />}
           
           {/* GPU to RAM */}
           <path d="M 84% 25% L 50% 25%" stroke="var(--border-light)" strokeWidth="2" fill="none" />
           {isActiveFlow('GPU', 'RAM') && <path d="M 84% 25% L 50% 25%" stroke={getStrokeColor()} strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[data-flow_0.4s_linear_infinite]" filter="url(#glow)" />}
        </svg>

      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 z-20">
        {modes.map(mode => (
          <button 
            key={mode.id}
            onClick={() => handleSimTrigger(mode)} 
            data-magnetic
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 border-2
              ${simMode === mode.id ? 'bg-[var(--text-main)] text-[var(--bg-base)] scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent)]'}
            `}
            style={{ borderColor: simMode === mode.id ? mode.color : undefined }}
          >
            <mode.icon className="w-4 h-4" />
            {mode.label}
          </button>
        ))}
      </div>
    </section>
  );
};

const EvolutionSection = () => {
  const [ref, isVisible] = useRevealObserver(0.2);

  return (
    <section ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 relative bg-[var(--bg-base)]">
      <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="font-mono text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-4 flex items-center justify-center gap-3">
             <div className="w-8 h-px bg-[var(--accent)]" /> Chapter 04
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6">The Evolution</h2>
        <p className="text-[var(--text-muted)] text-xl max-w-3xl mx-auto font-light">
          From vacuum tubes to 3nm silicon — a half-century sprint to the future.
        </p>
      </div>

      <div className="relative max-w-5xl w-full">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent -translate-x-1/2 rounded-full hidden md:block opacity-50" />

        <div className="flex flex-col gap-12 md:gap-0">
          {timelineData.map((item, index) => {
            const isLeft = item.side === 'left';
            return (
              <div key={index} className={`relative flex items-center md:h-40 w-full transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                 {/* Node */}
                 <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-[var(--accent)] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_var(--accent)] z-10 border-4 border-[var(--bg-base)]" />
                 
                 <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:text-left md:ml-auto'}`}>
                    <div className="glass-panel p-6 rounded-2xl hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-2 cursor-default group shadow-lg">
                       <div className="font-mono text-xs tracking-[0.2em] text-[var(--accent)] mb-2 font-bold group-hover:animate-pulse">{item.year}</div>
                       <h3 className="text-2xl font-black mb-3 text-[var(--text-main)]">{item.title}</h3>
                       <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

const ConclusionSection = () => {
  const [ref, isVisible] = useRevealObserver(0.5);
  const title = useDecryptText('The Future is Silicon.', isVisible, 60);
  
  return (
    <footer ref={ref} className="relative min-h-[70vh] w-full flex flex-col items-center justify-center px-6 py-24 z-10 overflow-hidden bg-[var(--bg-surface-solid)] border-t border-[var(--border-light)]">
      
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] to-transparent opacity-80 z-0 pointer-events-none" />

      <div className={`z-10 text-center max-w-4xl glass-panel p-12 md:p-20 rounded-[3rem] border border-[var(--border-light)] shadow-2xl transition-all duration-1000 transform relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
        
        <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_at_center,var(--border-glow),transparent_60%)] animate-[spin_10s_linear_infinite] pointer-events-none opacity-50" />

        <h2 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)] relative z-10">
          {title}
        </h2>
        <p className="text-[var(--text-muted)] text-xl leading-relaxed font-light mb-12 relative z-10">
          Five components. Infinite possibilities. As transistors approach the physical limits of atoms, the next chapter of computing promises to rewrite every rule we know.
        </p>
        <button 
          data-magnetic
          className="relative z-10 inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[#000] px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--border-glow)]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Initialize Restart <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      </div>
      
      <div className="absolute bottom-8 flex justify-between w-full px-12 text-[10px] font-mono text-[var(--text-muted)] opacity-50 uppercase tracking-widest z-10">
         <span>© 2026 SILICON MIND ARCHITECTURE</span>
         <span>[ SYSTEM.HALT ]</span>
      </div>
    </footer>
  );
};

// ==========================================
// 6. BOOT LOADER & MAIN APP ROOT
// ==========================================

const BootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const logs = [
    "INITIALIZING KERNEL...", "MOUNTING VIRTUAL DOM...", "INJECTING CSS 3D ENGINE...", 
    "ESTABLISHING QUANTUM CANVAS...", "SYSTEM ARCHITECTURE READY."
  ];

  useEffect(() => {
    let p = 0;
    const int = setInterval(() => {
      p += Math.random() * 12;
      if (p >= 100) { p = 100; clearInterval(int); setTimeout(onComplete, 800); }
      setProgress(p);
      setText(logs[Math.min(Math.floor(p / 25), logs.length - 1)]);
    }, 80);
    return () => clearInterval(int);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center text-[#00d4ff] font-mono selection:bg-transparent">
      <div className="relative mb-12">
         <div className="text-4xl font-black tracking-tighter glitch-container mb-6" data-text="SILICON MIND">SILICON MIND</div>
         <Activity className="w-16 h-16 animate-[pulse-fast_1s_infinite] drop-shadow-[0_0_30px_#00d4ff] mx-auto" />
      </div>
      <div className="w-80 h-1 bg-gray-900 rounded overflow-hidden mb-8 relative">
        <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] shadow-[0_0_15px_#00d4ff] transition-all duration-75 ease-out relative" style={{ width: `${progress}%` }}>
        </div>
      </div>
      <p className="text-xs tracking-[0.3em] uppercase h-6 font-bold text-[#94a3b8]">{text}</p>
    </div>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [themeId, setThemeId] = useState('dark');
  const [isHoveringMagnetic, setIsHoveringMagnetic] = useState(false);
  const [globalLog, setGlobalLog] = useState(null);
  const mouse = useMousePosition();
  const theme = THEMES[themeId];

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [theme]);

  useEffect(() => {
    const handleMouseOver = (e) => { if (e.target.closest('[data-magnetic]')) setIsHoveringMagnetic(true); };
    const handleMouseOut = (e) => { if (e.target.closest('[data-magnetic]')) setIsHoveringMagnetic(false); };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => { document.removeEventListener('mouseover', handleMouseOver); document.removeEventListener('mouseout', handleMouseOut); };
  }, []);

  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-main)] font-sans selection:bg-[var(--accent)] selection:text-[#000] transition-colors duration-1000 min-h-screen">
      
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      <InteractiveParticleCanvas theme={theme} mouse={mouse} />
      
      {/* Hybrid Dual Cursor */}
      <div className={`fixed rounded-full pointer-events-none z-[9999] border-[1.5px] border-[var(--accent)] mix-blend-difference transition-all duration-150 ease-out flex items-center justify-center hidden md:flex shadow-[0_0_15px_var(--accent)]
        ${isHoveringMagnetic ? 'w-16 h-16 bg-[var(--accent)] opacity-20 scale-125' : 'w-10 h-10 scale-100 opacity-50'}
      `} style={{ transform: `translate(${mouse.x - (isHoveringMagnetic ? 32 : 20)}px, ${mouse.y - (isHoveringMagnetic ? 32 : 20)}px)` }}>
        <div className={`w-2 h-2 bg-[var(--accent)] rounded-full transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isHoveringMagnetic ? 'opacity-0' : 'opacity-100'}`} style={{ transform: 'none' }} />
      </div>
      {/* Instant Core Dot */}
      <div className="fixed w-2 h-2 bg-[var(--accent)] rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block" style={{ left: mouse.x - 4, top: mouse.y - 4 }} />

      <LiveTerminal currentLog={globalLog} />

      {/* Main Navigation UI */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-center z-[90] pointer-events-none">
        <div data-magnetic className="flex items-center gap-4 pointer-events-auto group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center overflow-hidden relative shadow-lg border-[var(--accent)]/30">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <Cpu className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-black tracking-[0.2em] text-xs uppercase hidden md:block drop-shadow-md text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-300">
            Silicon<span className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-300">Mind</span>
          </span>
        </div>

        <div className="flex gap-1.5 p-1.5 glass-panel rounded-full pointer-events-auto shadow-xl border border-[var(--border-light)]">
          {Object.values(THEMES).map(t => (
            <button
              key={t.id} data-magnetic onClick={() => setThemeId(t.id)} title={t.name}
              className={`p-2.5 rounded-full transition-all duration-300 relative overflow-hidden group
                ${themeId === t.id ? 'bg-[var(--text-main)] text-[var(--bg-base)] shadow-[0_0_15px_var(--border-glow)] scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10'}
              `}
            >
              {themeId === t.id && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
              <t.icon className="w-4 h-4 relative z-10" />
            </button>
          ))}
        </div>
      </nav>

      {/* Main Story Narrative */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection themeId={themeId} />
        <IntroSection />
        <ExplorationSection mouse={mouse} />
        <EnhancedSimulation onLogEmit={setGlobalLog} />
        <EvolutionSection />
        <ConclusionSection />
      </main>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);