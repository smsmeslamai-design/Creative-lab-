import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Rocket, 
  Video, 
  Megaphone, 
  PenTool, 
  Palette, 
  Share2, 
  BarChart3, 
  Zap, 
  Target, 
  Lightbulb, 
  DollarSign,
  Mail,
  Phone,
  Facebook,
  MessageCircle,
  Plus,
  ExternalLink,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  desc: string;
  type: 'video' | 'ads' | 'design';
  link: string;
  emoji: string;
}

// --- Data ---
const services = [
  {
    id: '01',
    icon: <Video className="w-10 h-10 text-cyan-400" />,
    title: "تصميم فيديو بالذكاء الاصطناعي",
    desc: "فيديوهات احترافية مذهلة في وقت قياسي. نستخدم أحدث نماذج الذكاء الاصطناعي لإنتاج محتوى فيديو عالي الجودة.",
    tag: "AI VIDEO GEN"
  },
  {
    id: '02',
    icon: <Megaphone className="w-10 h-10 text-cyan-400" />,
    title: "إعلانات بالذكاء الاصطناعي",
    desc: "إعلانات مستهدفة وفعّالة تصل لجمهورك الصح. نصمم حملات ذكية تزيد من معدلات التحويل وتحقق أفضل عائد.",
    tag: "AI ADS"
  },
  {
    id: '03',
    icon: <PenTool className="w-10 h-10 text-cyan-400" />,
    title: "كتابة محتوى إعلاني",
    desc: "نصوص إعلانية مقنعة وجذابة تتحدث بلغة عملائك. محتوى مخصص لكل منصة بأسلوب يحقق التفاعل.",
    tag: "AI COPYWRITING"
  },
  {
    id: '04',
    icon: <Palette className="w-10 h-10 text-cyan-400" />,
    title: "تصميم هوية بصرية",
    desc: "هوية بصرية متكاملة تعكس شخصية علامتك التجارية. شعارات وألوان تترك أثراً لا يُنسى.",
    tag: "AI DESIGN"
  },
  {
    id: '05',
    icon: <Share2 className="w-10 h-10 text-cyan-400" />,
    title: "محتوى سوشيال ميديا",
    desc: "محتوى إبداعي يومي لمنصاتك. ريلز، ستوريز، وبوستات تزيد من تفاعل متابعيك وتبني مجتمعاً.",
    tag: "SOCIAL MEDIA"
  },
  {
    id: '06',
    icon: <BarChart3 className="w-10 h-10 text-cyan-400" />,
    title: "تحليل وتحسين الحملات",
    desc: "نراقب أداء حملاتك بشكل مستمر ونحسّنها باستخدام البيانات لضمان أفضل النتائج باستمرار.",
    tag: "AI ANALYTICS"
  }
];

const initialProjects: Project[] = [
  {
    id: 1,
    title: "عشب الشمال - المملكة العربية السعودية",
    desc: "فيديو إعلاني احترافي يبرز جودة المنتجات والخدمات بأسلوب عصري.",
    type: "video",
    link: "https://drive.google.com/file/d/1T37paYixmK0z6dZoKDuq7k2mBpeWtJhL/view?usp=drivesdk",
    emoji: "🎬"
  },
  {
    id: 2,
    title: "عشب الشمال - عرض خاص",
    desc: "تصميم إعلان ترويجي للعروض الحصرية باستخدام تقنيات الذكاء الاصطناعي.",
    type: "video",
    link: "https://drive.google.com/file/d/1rp9CNWDpkeyZ9xI4HOmEqK3llnvCdS2y/view?usp=drivesdk",
    emoji: "🎬"
  },
  {
    id: 3,
    title: "عشب الشمال - جودة استثنائية",
    desc: "فيديو تسويقي يركز على التفاصيل والجودة العالية التي تقدمها الشركة.",
    type: "video",
    link: "https://drive.google.com/file/d/1yjkXW9ZgFOAdcFj-Hb-ymdlC4GsFFBru/view?usp=drivesdk",
    emoji: "🎬"
  },
  {
    id: 4,
    title: "عشب الشمال - حلول متكاملة",
    desc: "استعراض شامل للخدمات والحلول المبتكرة في مجال الديكور والتشطيب.",
    type: "video",
    link: "https://drive.google.com/file/d/1DlZPE8Goc-JpaIHWm5mQAp5SqNyrkIjj/view?usp=drivesdk",
    emoji: "🎬"
  },
  {
    id: 5,
    title: "عشب الشمال - رؤية عصرية",
    desc: "إعلان يجسد الرؤية العصرية والتطور في تنفيذ المشاريع.",
    type: "video",
    link: "https://drive.google.com/file/d/12VLukgRQNYel4YmmCA9vn245VfarPi6e/view?usp=drivesdk",
    emoji: "🎬"
  },
  {
    id: 6,
    title: "عشب الشمال - التميز",
    desc: "فيديو إبداعي يعكس روح التميز والاحترافية في العمل.",
    type: "video",
    link: "https://drive.google.com/file/d/12swkUHb1jE-MANRKe5Mv5XlAfqwO20Eo/view?usp=drivesdk",
    emoji: "🎬"
  }
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: position.x - 6, y: position.y - 6, scale: isPointer ? 2.5 : 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/50 rounded-full pointer-events-none z-[9998]"
        animate={{ x: position.x - 20, y: position.y - 20, scale: isPointer ? 1.5 : 1, opacity: isPointer ? 0.8 : 0.4 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form State for new project
  const [newProject, setNewProject] = useState({
    title: '',
    desc: '',
    type: 'video' as const,
    link: '',
    emoji: '🎬'
  });

  const handleAddProject = () => {
    if (!newProject.title || !newProject.link) return;
    const project: Project = {
      ...newProject,
      id: Date.now()
    };
    setProjects([project, ...projects]);
    setIsModalOpen(false);
    setNewProject({ title: '', desc: '', type: 'video', link: '', emoji: '🎬' });
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-400 selection:text-slate-900 noise-bg" dir="rtl">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-16 py-5 flex justify-between items-center bg-slate-950/70 backdrop-blur-xl border-b border-cyan-400/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,231,0.3)]">
            <Rocket className="text-slate-950 w-6 h-6" />
          </div>
          <span className="font-mono text-xl font-black tracking-tighter text-cyan-400">CREATIVE<span className="text-pink-500">LAB</span></span>
        </div>

        <ul className="hidden md:flex gap-10">
          {['الخدمات', 'أعمالنا', 'لماذا نحن', 'تواصل معنا'].map((item, i) => (
            <li key={i}>
              <a 
                href={`#${['services', 'portfolio', 'why', 'contact'][i]}`} 
                className="text-white/60 hover:text-cyan-400 transition-colors font-semibold text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block px-6 py-2 border border-cyan-400 text-cyan-400 font-bold text-sm clip-path-polygon hover:bg-cyan-400 hover:text-slate-950 transition-all"
          >
            ابدأ مشروعك
          </button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-slate-950 pt-24 px-10 md:hidden"
          >
            <ul className="flex flex-col gap-8 text-2xl font-bold">
              {['الخدمات', 'أعمالنا', 'لماذا نحن', 'تواصل معنا'].map((item, i) => (
                <li key={i}>
                  <a 
                    href={`#${['services', 'portfolio', 'why', 'contact'][i]}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-cyan-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            AI-POWERED CREATIVE STUDIO
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black leading-[1.1] mb-8"
          >
            إبداع بلا <span className="text-cyan-400">حدود</span> <br />
            مع <span className="text-pink-500">الذكاء</span> الاصطناعي
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-12"
          >
            نصمم فيديوهات احترافية وإعلانات مبتكرة باستخدام أحدث تقنيات الذكاء الاصطناعي — أسرع، أذكى، وبجودة استثنائية تفوق التوقعات.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black text-lg clip-path-polygon hover:scale-105 transition-transform"
            >
              🚀 ابدأ مشروعك الآن
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border border-white/20 text-white font-bold text-lg clip-path-polygon hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              استكشف خدماتنا
            </button>
          </motion.div>
        </div>

        {/* Floating Element */}
        <motion.div 
          className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 w-[450px] h-[450px] items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-cyan-400/20 rounded-full" />
          <div className="absolute inset-10 border border-dashed border-purple-500/30 rounded-full" />
          <div className="absolute inset-24 border border-pink-500/20 rounded-full" />
          <div className="w-40 h-40 bg-slate-900 border border-cyan-400/30 rounded-full flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,231,0.1)]">
             <div className="text-center font-mono text-[10px] text-cyan-400 leading-tight">
               AI VIDEO<br/>&<br/>AI ADS<br/>STUDIO
             </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-10 border-y border-cyan-400/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "+500", l: "مشروع منجز" },
            { n: "98%", l: "رضا العملاء" },
            { n: "3x", l: "أسرع من التقليدي" },
            { n: "24/7", l: "دعم متواصل" }
          ].map((s, i) => (
            <div key={i} className="text-center md:text-right md:border-r border-cyan-400/10 last:border-0 pr-0 md:pr-8">
              <div className="text-3xl md:text-5xl font-mono font-bold text-cyan-400 mb-2">{s.n}</div>
              <div className="text-xs md:text-sm text-white/40 font-semibold uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-16 py-32">
        <div className="mb-20">
          <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-4">
            <span className="text-pink-500">//</span> خدماتنا
          </div>
          <h2 className="text-4xl md:text-6xl font-black">ما نقدمه لك بـ<span className="text-cyan-400">الذكاء الاصطناعي</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cyan-400/10 border border-cyan-400/10">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: 'rgba(0, 255, 231, 0.03)' }}
              className="bg-slate-950 p-10 relative group transition-colors"
            >
              <span className="absolute top-6 left-6 font-mono text-[10px] text-white/20 group-hover:text-cyan-400/40 transition-colors">{s.id}</span>
              <div className="mb-8">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">{s.desc}</p>
              <div className="inline-block px-3 py-1 bg-cyan-400/5 border border-cyan-400/20 text-[10px] font-mono text-cyan-400">
                {s.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="px-6 md:px-16 py-32 bg-cyan-400/[0.02]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-4">
              <span className="text-pink-500">//</span> أعمالنا
            </div>
            <h2 className="text-4xl md:text-6xl font-black">نماذج من <span className="text-cyan-400">شغلنا</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['all', 'video', 'ads', 'design'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 text-xs font-bold clip-path-polygon transition-all border ${filter === f ? 'bg-cyan-400 text-slate-950 border-cyan-400' : 'text-white/40 border-white/10 hover:border-cyan-400/50'}`}
              >
                {f === 'all' ? 'الكل' : f === 'video' ? 'فيديوهات AI' : f === 'ads' ? 'إعلانات' : 'تصميمات'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={p.id}
                className="glass group overflow-hidden"
              >
                <div className="h-56 bg-gradient-to-br from-purple-900/40 to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      className="px-6 py-2 bg-cyan-400 text-slate-950 font-black text-sm clip-path-polygon flex items-center gap-2"
                    >
                      <ExternalLink size={14} /> شاهد العمل
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-white/40 text-xs mb-6 line-clamp-2">{p.desc}</p>
                  <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 inline-block">
                    {p.type.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Add Project Card */}
            <motion.div 
              layout
              className="border-2 border-dashed border-cyan-400/20 flex flex-col items-center justify-center p-10 cursor-pointer hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all group"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-12 h-12 text-white/20 group-hover:text-cyan-400 mb-4 transition-colors" />
              <span className="font-bold text-white/40 group-hover:text-white transition-colors">أضف مشروع جديد</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-4">
              <span className="text-pink-500">//</span> لماذا نحن
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-12">نقدم لك <span className="text-cyan-400">الفرق الحقيقي</span></h2>
            
            <div className="space-y-8">
              {[
                { i: <Zap />, t: "سرعة لا مثيل لها", d: "ننجز مشروعك في أيام بدل أسابيع. الذكاء الاصطناعي يضاعف سرعتنا." },
                { i: <Target />, t: "دقة في الاستهداف", d: "إعلاناتنا تصل للعميل الصح في الوقت الصح — نتائج حقيقية مضمونة." },
                { i: <Lightbulb />, t: "إبداع بلا حدود", d: "مع الذكاء الاصطناعي، خيالنا هو الحد الوحيد. أفكار جديدة دائماً." },
                { i: <DollarSign />, t: "تكلفة معقولة", d: "جودة عالمية بأسعار تناسب السوق المصري. استثمر أقل واحصل على أكثر." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 flex-shrink-0 glass flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all">
                    {item.i}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.t}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square glass flex flex-col items-center justify-center p-20 text-center clip-path-polygon relative z-10">
              <div className="px-4 py-1 border border-cyan-400 text-[10px] font-mono text-cyan-400 mb-8">POWERED BY AI</div>
              <div className="text-[120px] font-mono font-black text-cyan-400/10 leading-none mb-4">AI</div>
              <div className="text-2xl font-black">مستقبل التسويق <br/> بين يديك الآن</div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-400/10 blur-[80px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-16 py-32">
        <div className="glass p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 clip-path-polygon">
          <div>
            <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-4">
              <span className="text-pink-500">//</span> تواصل معنا
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">جاهز تبدأ <br/> <span className="text-cyan-400">مشروعك؟</span></h2>
            <p className="text-white/50 mb-12 leading-relaxed">تواصل معنا الآن واحصل على استشارة مجانية. فريقنا جاهز لتحويل أفكارك لمحتوى إبداعي يحقق نتائج حقيقية.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/70">
                <Mail className="text-cyan-400" /> <a href="mailto:dotaai740@gmail.com">dotaai740@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Phone className="text-cyan-400" /> <span>01107118654</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <MessageCircle className="text-cyan-400" /> <a href="https://wa.me/201107118654" target="_blank" className="hover:text-cyan-400 transition-colors">واتساب — اضغط للتواصل الآن</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">الاسم</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400 transition-colors" placeholder="اكتب اسمك هنا" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">الموبايل</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400 transition-colors" placeholder="رقم واتساب" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">الخدمة</label>
              <select className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400 transition-colors appearance-none">
                <option className="bg-slate-900">اختار الخدمة</option>
                <option className="bg-slate-900">تصميم فيديو AI</option>
                <option className="bg-slate-900">إعلانات AI</option>
                <option className="bg-slate-900">سوشيال ميديا</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">التفاصيل</label>
              <textarea className="w-full bg-white/5 border border-white/10 p-4 h-32 outline-none focus:border-cyan-400 transition-colors" placeholder="احكيلنا أكتر عن مشروعك..."></textarea>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black text-lg clip-path-polygon hover:opacity-90 transition-opacity">
              🚀 ابعت رسالتك
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
            <Rocket className="text-slate-950 w-5 h-5" />
          </div>
          <span className="font-mono text-lg font-black text-cyan-400">CREATIVE<span className="text-pink-500">LAB</span></span>
        </div>

        <div className="flex gap-6">
          <a href="https://www.facebook.com/share/1CYcsB3vJH/" target="_blank" className="text-white/40 hover:text-cyan-400 transition-colors"><Facebook /></a>
          <a href="https://wa.me/201107118654" target="_blank" className="text-white/40 hover:text-green-500 transition-colors"><MessageCircle /></a>
          <a href="mailto:dotaai740@gmail.com" className="text-white/40 hover:text-pink-500 transition-colors"><Mail /></a>
        </div>

        <div className="text-[10px] font-mono text-white/20">
          © 2025 Creative Lab. All rights reserved. Powered by AI ⚡
        </div>
      </footer>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-slate-950/95 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass p-10 max-w-lg w-full relative clip-path-polygon"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 left-6 text-white/40 hover:text-white"><X /></button>
              <h2 className="text-2xl font-black mb-8 text-cyan-400">إضافة مشروع جديد</h2>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="اسم المشروع" 
                  className="w-full bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400"
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="وصف قصير" 
                  className="w-full bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400"
                  value={newProject.desc}
                  onChange={e => setNewProject({...newProject, desc: e.target.value})}
                />
                <select 
                  className="w-full bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400"
                  value={newProject.type}
                  onChange={e => setNewProject({...newProject, type: e.target.value as any})}
                >
                  <option value="video">فيديو إعلاني AI</option>
                  <option value="ads">إعلان سوشيال</option>
                  <option value="design">تصميم</option>
                </select>
                <input 
                  type="url" 
                  placeholder="رابط العمل (Google Drive)" 
                  className="w-full bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400"
                  value={newProject.link}
                  onChange={e => setNewProject({...newProject, link: e.target.value})}
                />
                <button 
                  onClick={handleAddProject}
                  className="w-full py-3 bg-cyan-400 text-slate-950 font-black clip-path-polygon mt-4"
                >
                  ✅ أضف المشروع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/201107118654" 
        target="_blank"
        className="fixed bottom-8 left-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20 z-[200] hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle size={30} />
      </a>
    </div>
  );
}
