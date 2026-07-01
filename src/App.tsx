import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Smartphone, 
  Users, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Undo, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Menu,
  Settings, 
  MessageSquare, 
  Clock, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  X,
  PlusCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolData, Course, SchoolFeature, Testimonial, PricingPlan, SchoolNews, Registration, NewsletterContact } from './types';
import { defaultSchoolData } from './data';

const loadSchoolData = (): SchoolData => {
  if (typeof window === 'undefined') return defaultSchoolData;

  const saved = localStorage.getItem('isli_school_data');
  if (!saved) return defaultSchoolData;

  try {
    const parsed = JSON.parse(saved) as Partial<SchoolData>;
    const savedCourses = Array.isArray(parsed.courses) ? parsed.courses : [];
    const legacyPhones = ['+212 6 37 74 76 02', '+212 5 37 74 76 02', '+33 1 45 67 89 10'];
    const phone = typeof parsed.phone === 'string' && legacyPhones.includes(parsed.phone)
      ? defaultSchoolData.phone
      : parsed.phone ?? defaultSchoolData.phone;

    return {
      ...defaultSchoolData,
      ...parsed,
      phone,
      courses: [
        ...defaultSchoolData.courses,
        ...savedCourses.filter((course: Course) => !defaultSchoolData.courses.some((defaultCourse) => defaultCourse.id === course.id))
      ]
    };
  } catch (e) {
    console.error(e);
    return defaultSchoolData;
  }
};

const resetStoredSchoolData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isli_school_data');
  localStorage.setItem('isli_school_data', JSON.stringify(defaultSchoolData));
};

const SchoolLogo = () => (
  <div className="relative flex items-center justify-center shrink-0">
    <svg className="w-12 h-12 md:w-14 md:h-14 drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Circle Ring */}
      <circle cx="50" cy="50" r="46" fill="#1054A6" />
      <circle cx="50" cy="50" r="41" stroke="#FFDE00" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
      
      {/* Graduation Cap / Lamp of Knowledge */}
      <path d="M50 28L70 37L50 46L30 37L50 28Z" fill="#E52320" stroke="white" strokeWidth="1" />
      <path d="M40 42.5V52C40 55.5 44.5 58 50 58C55.5 58 60 55.5 60 52V42.5" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M64 40V55" stroke="#FFDE00" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="64" cy="56" r="2.5" fill="#FFDE00" />
      
      {/* Three success stars */}
      <polygon points="50,65 52,69 57,69 53,72 55,76 50,73 45,76 47,72 43,69 48,69" fill="#FFDE00" />
      <polygon points="35,60 37,63 41,63 38,65 39,69 35,67 31,69 32,65 29,63 33,63" fill="#FFDE00" />
      <polygon points="65,60 67,63 71,63 68,65 69,69 65,67 61,69 62,65 59,63 63,63" fill="#FFDE00" />
    </svg>
  </div>
);

export default function App() {
  // Load data from localStorage or use defaults
  const [schoolData, setSchoolData] = useState<SchoolData>(() => loadSchoolData());

  useEffect(() => {
    resetStoredSchoolData();
    setSchoolData(loadSchoolData());
  }, []);

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('isli_school_registrations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "r1",
        studentName: "Mélanie Laurent",
        email: "melanie.l@gmail.com",
        phone: "+212 5 37 74 76 02",
        courseId: "c1",
        message: "Bonjour, je souhaite m'inscrire au cours de français intensif pour améliorer mon expression orale.",
        timestamp: "30 Juin 2026 à 11:22",
        status: "new"
      },
      {
        id: "r2",
        studentName: "Karim Benz",
        email: "karim.benz@outlook.com",
        phone: "+212 5 37 74 76 02",
        courseId: "c2",
        message: "Je suis très intéressé par le cours d'anglais professionnel. Proposez-vous des financements CPF ?",
        timestamp: "29 Juin 2026 à 16:45",
        status: "contacted"
      }
    ];
  });

  const [newsletters, setNewsletters] = useState<NewsletterContact[]>(() => {
    const saved = localStorage.getItem('isli_school_newsletter');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: "n1", email: "info@zainmawada.com", timestamp: "30 Juin 2026" },
      { id: "n2", email: "contact@isli-school.fr", timestamp: "29 Juin 2026" }
    ];
  });

  // UI States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [courseCarouselIndex, setCourseCarouselIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  
  // Enrollment Form State
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentMsg, setStudentMsg] = useState('');
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Admin Editors States
  const [activeAdminTab, setActiveAdminTab] = useState<'info' | 'courses' | 'registrations' | 'newsletters'>('info');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [sloganSuggestions, setSloganSuggestions] = useState<string[]>([]);
  const [generatingSlogan, setGeneratingSlogan] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('isli_school_data', JSON.stringify(schoolData));
  }, [schoolData]);

  useEffect(() => {
    localStorage.setItem('isli_school_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('isli_school_newsletter', JSON.stringify(newsletters));
  }, [newsletters]);

  // Extract unique categories for public tabs
  const categories = ["Tous", ...Array.from(new Set(schoolData.courses.map(c => c.category)))];

  // Public Actions
  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % schoolData.testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + schoolData.testimonials.length) % schoolData.testimonials.length);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !selectedCourseForEnroll) return;

    const newReg: Registration = {
      id: "reg_" + Math.random().toString(36).substring(2, 9),
      studentName,
      email: studentEmail,
      phone: studentPhone,
      courseId: selectedCourseForEnroll.id,
      message: studentMsg,
      timestamp: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) + " à " + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'new'
    };

    setRegistrations([newReg, ...registrations]);
    setEnrollmentSuccess(true);
    setTimeout(() => {
      setEnrollmentSuccess(false);
      setSelectedCourseForEnroll(null);
      setStudentName('');
      setStudentEmail('');
      setStudentPhone('');
      setStudentMsg('');
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    const exists = newsletters.some(n => n.email.toLowerCase() === newsletterEmail.toLowerCase());
    if (!exists) {
      const newSub: NewsletterContact = {
        id: "sub_" + Math.random().toString(36).substring(2, 9),
        email: newsletterEmail,
        timestamp: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setNewsletters([newSub, ...newsletters]);
    }
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 4000);
  };

  // AI Assistant Helpers
  const handleAiGenerateCourseDesc = async () => {
    if (!editingCourse || !editingCourse.title) {
      alert("Veuillez d'abord entrer un titre pour le cours.");
      return;
    }
    setAiGenerating(true);
    try {
      const res = await fetch("/api/gemini/generate-school-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "course",
          title: editingCourse.title,
          category: editingCourse.category,
          level: editingCourse.level
        })
      });
      const result = await res.json();
      if (result.content) {
        setEditingCourse({
          ...editingCourse,
          description: result.content
        });
      }
    } catch (e) {
      console.error(e);
      alert("Erreur de connexion avec l'IA. Veuillez réessayer.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAiGenerateSlogans = async () => {
    setGeneratingSlogan(true);
    try {
      const res = await fetch("/api/gemini/generate-school-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "slogan",
          title: schoolData.name,
          currentSlogan: schoolData.slogan
        })
      });
      const result = await res.json();
      if (result.content) {
        const list = result.content.split(",").map((s: string) => s.trim());
        setSloganSuggestions(list);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingSlogan(false);
    }
  };

  // Admin CRUD for Courses
  const startEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setIsAddingCourse(false);
  };

  const startAddCourse = () => {
    setEditingCourse({
      id: "course_" + Math.random().toString(36).substring(2, 9),
      title: "",
      level: "Tous niveaux",
      price: 1200,
      duration: "12 Semaines",
      description: "",
      category: "Anglais",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      hoursPerWeek: 6
    });
    setIsAddingCourse(true);
  };

  const saveCourseEdits = () => {
    if (!editingCourse) return;
    if (isAddingCourse) {
      setSchoolData({
        ...schoolData,
        courses: [...schoolData.courses, editingCourse]
      });
    } else {
      setSchoolData({
        ...schoolData,
        courses: schoolData.courses.map(c => c.id === editingCourse.id ? editingCourse : c)
      });
    }
    setEditingCourse(null);
    setIsAddingCourse(false);
  };

  const deleteCourse = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      setSchoolData({
        ...schoolData,
        courses: schoolData.courses.filter(c => c.id !== id)
      });
    }
  };

  const changeRegStatus = (id: string, newStatus: 'new' | 'contacted' | 'processed') => {
    setRegistrations(registrations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReg = (id: string) => {
    if (confirm("Supprimer cette inscription ?")) {
      setRegistrations(registrations.filter(r => r.id !== id));
    }
  };

  const deleteNewsletter = (id: string) => {
    if (confirm("Supprimer cette adresse e-mail ?")) {
      setNewsletters(newsletters.filter(n => n.id !== id));
    }
  };

  // Reset demo content
  const handleResetDemo = () => {
    if (confirm("Voulez-vous restaurer les données d'origine de l'École Isli ?")) {
      setSchoolData(defaultSchoolData);
      localStorage.removeItem('isli_school_data');
    }
  };

  const filteredCourses = selectedCategory === "Tous" 
    ? schoolData.courses 
    : schoolData.courses.filter(c => c.category === selectedCategory);

  useEffect(() => {
    setCourseCarouselIndex(0);
  }, [selectedCategory, filteredCourses.length]);

  const visibleCourses = filteredCourses.slice(courseCarouselIndex, courseCarouselIndex + 4);
  const canGoPrev = courseCarouselIndex > 0;
  const canGoNext = courseCarouselIndex + 4 < filteredCourses.length;

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#0C2E5C] font-sans antialiased">
      
      {/* GLOBAL BANNER / ADMIN TOGGLE BAR */}
      <div className="bg-[#0C2E5C] text-white py-2 px-6 flex justify-between items-center text-xs border-b border-[#0B2545] sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">HÉBERGEMENT ACTIF :</span>
          <span className="bg-[#E52320] text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded">
            isli-school.aistudio.run
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-zinc-300 font-medium">Bénéficiez d'une modification en temps réel</span>
        </div>
      </div>

      {/* ADMIN PANEL DRAWER / SPLIT SCREEN */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0A2244] text-white border-b-4 border-[#E52320] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-[#0F3560]">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2 text-[#FFCC00]">
                    <Settings size={20} className="text-[#E52320]" />
                    <span>Tableau de Bord Administratif & Personnalisation</span>
                  </h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Gérez vos formations, modifiez le slogan scolaire avec l'IA Gemini et suivez les demandes d'inscription.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleResetDemo}
                    className="px-3 py-1.5 bg-[#1054A6] hover:bg-[#0C2E5C] border border-[#0B2545] rounded text-xs text-zinc-300 transition-all cursor-pointer"
                  >
                    Réinitialiser Démo
                  </button>
                </div>
              </div>

              {/* Admin Tabs */}
              <div className="flex gap-2 border-b border-[#0F3560] mb-6 pb-px overflow-x-auto">
                <button 
                  onClick={() => setActiveAdminTab('info')}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    activeAdminTab === 'info' ? 'border-[#E52320] text-[#E52320]' : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  🏫 Informations de l'École
                </button>
                <button 
                  onClick={() => setActiveAdminTab('courses')}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    activeAdminTab === 'courses' ? 'border-[#E52320] text-[#E52320]' : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  📚 Catalogue des Cours ({schoolData.courses.length})
                </button>
                <button 
                  onClick={() => setActiveAdminTab('registrations')}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer relative ${
                    activeAdminTab === 'registrations' ? 'border-[#E52320] text-[#E52320]' : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  📥 Demandes d'Inscriptions
                  {registrations.filter(r => r.status === 'new').length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#E52320] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white scale-90">
                      {registrations.filter(r => r.status === 'new').length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveAdminTab('newsletters')}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    activeAdminTab === 'newsletters' ? 'border-[#E52320] text-[#E52320]' : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  ✉️ Abonnés Newsletter ({newsletters.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[250px]">
                
                {/* SCHOOL INFO EDITOR */}
                {activeAdminTab === 'info' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Nom de l'école</label>
                        <input 
                          type="text" 
                          value={schoolData.name}
                          onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                          className="w-full bg-[#06162D] border border-[#0F3560] rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E52320] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Slogan Scolaire</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={schoolData.slogan}
                            onChange={(e) => setSchoolData({ ...schoolData, slogan: e.target.value })}
                            className="flex-1 bg-[#06162D] border border-[#0F3560] rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E52320] outline-none"
                          />
                          <button 
                            onClick={handleAiGenerateSlogans}
                            disabled={generatingSlogan}
                            className="bg-[#E52320] hover:bg-[#C21614] px-3 rounded flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 text-white"
                          >
                            <Sparkles size={14} />
                            <span>{generatingSlogan ? 'Génération...' : 'IA Slogans'}</span>
                          </button>
                        </div>
                        {sloganSuggestions.length > 0 && (
                          <div className="mt-2 bg-[#06162D] p-3 rounded border border-[#0F3560] space-y-1.5">
                            <span className="text-[10px] text-[#FFCC00] uppercase font-bold tracking-wider block">Slogans suggérés par l'IA Gemini :</span>
                            {sloganSuggestions.map((s, idx) => (
                              <button 
                                key={idx}
                                onClick={() => {
                                  setSchoolData({ ...schoolData, slogan: s });
                                  setSloganSuggestions([]);
                                }}
                                className="block text-left text-xs text-zinc-200 hover:text-white hover:bg-[#1054A6]/40 w-full p-1.5 rounded transition-all"
                              >
                                {idx + 1}. "{s}"
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Titre d'introduction</label>
                        <input 
                          type="text" 
                          value={schoolData.aboutTitle}
                          onChange={(e) => setSchoolData({ ...schoolData, aboutTitle: e.target.value })}
                          className="w-full bg-[#06162D] border border-[#0F3560] rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E52320] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Texte de l'école (Description)</label>
                        <textarea 
                          rows={3}
                          value={schoolData.description}
                          onChange={(e) => setSchoolData({ ...schoolData, description: e.target.value })}
                          className="w-full bg-[#06162D] border border-[#0F3560] rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E52320] outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">E-mail de Contact</label>
                          <input 
                            type="email" 
                            value={schoolData.email}
                            onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
                            className="w-full bg-[#180c35] border border-violet-800 rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E62E72] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Téléphone</label>
                          <input 
                            type="text" 
                            value={schoolData.phone}
                            onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                            className="w-full bg-[#180c35] border border-violet-800 rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E62E72] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">Adresse</label>
                        <input 
                          type="text" 
                          value={schoolData.address}
                          onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                          className="w-full bg-[#180c35] border border-violet-800 rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E62E72] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">URL Image du Hero</label>
                        <input 
                          type="text" 
                          value={schoolData.heroImage}
                          onChange={(e) => setSchoolData({ ...schoolData, heroImage: e.target.value })}
                          className="w-full bg-[#180c35] border border-violet-800 rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-[#E62E72] outline-none font-mono text-xs"
                        />
                      </div>
                      <div className="p-3 bg-violet-950/50 rounded border border-violet-800 flex items-center gap-2">
                        <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                        <span className="text-xs text-zinc-300">Les modifications sont enregistrées localement et instantanément répercutées sur le site ci-dessous !</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* COURSES CATALOG EDITOR */}
                {activeAdminTab === 'courses' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Gérer les Formations & Prix</h3>
                      <button 
                        onClick={startAddCourse}
                        className="bg-[#F4AF23] text-[#2D1B5B] hover:bg-[#e09d16] px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle size={14} />
                        <span>Créer un Nouveau Cours</span>
                      </button>
                    </div>

                    {/* Course Editor Form Panel */}
                    {editingCourse && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#180c35] border border-[#E62E72]/50 rounded-xl p-5 space-y-4"
                      >
                        <div className="flex justify-between items-center pb-2 border-b border-violet-800">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#F4AF23]">
                            {isAddingCourse ? "✨ Création de Cours" : "✏️ Édition de Cours"}
                          </span>
                          <button onClick={() => setEditingCourse(null)} className="text-zinc-400 hover:text-white">
                            <X size={18} />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Titre de la formation</label>
                            <input 
                              type="text" 
                              placeholder="ex: Anglais Avancé Orateur"
                              value={editingCourse.title}
                              onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                              className="w-full bg-[#211347] border border-violet-800 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Catégorie</label>
                            <select 
                              value={editingCourse.category}
                              onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                              className="w-full bg-[#211347] border border-violet-800 rounded p-2 text-xs text-white outline-none"
                            >
                              <option value="Français">Français</option>
                              <option value="Anglais">Anglais</option>
                              <option value="Préparation">Préparation</option>
                              <option value="Soutien">Soutien Scolaire</option>
                              <option value="Allemand">Allemand</option>
                              <option value="Espagnol">Espagnol</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Niveau</label>
                            <input 
                              type="text" 
                              placeholder="ex: Débutant à Avancé"
                              value={editingCourse.level}
                              onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                              className="w-full bg-[#211347] border border-violet-800 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Tarif (€)</label>
                            <input 
                              type="number" 
                              value={editingCourse.price}
                              onChange={(e) => setEditingCourse({ ...editingCourse, price: parseInt(e.target.value) || 0 })}
                              className="w-full bg-[#211347] border border-violet-800 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Durée</label>
                            <input 
                              type="text" 
                              placeholder="ex: 12 Semaines"
                              value={editingCourse.duration}
                              onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                              className="w-full bg-[#211347] border border-violet-800 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Heures / Semaine</label>
                            <input 
                              type="number" 
                              value={editingCourse.hoursPerWeek}
                              onChange={(e) => setEditingCourse({ ...editingCourse, hoursPerWeek: parseInt(e.target.value) || 0 })}
                              className="w-full bg-[#0A2244] border border-[#0F3560] rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Image URL</label>
                            <input 
                              type="text" 
                              value={editingCourse.image}
                              onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                              className="w-full bg-[#0A2244] border border-[#0F3560] rounded p-2 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold uppercase text-zinc-300">Description du cours</label>
                            <button 
                              onClick={handleAiGenerateCourseDesc}
                              disabled={aiGenerating}
                              className="bg-[#E52320] hover:bg-[#C21614] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50 text-white"
                            >
                              <Sparkles size={11} />
                              <span>{aiGenerating ? 'Génération IA...' : 'Rédiger avec Gemini'}</span>
                            </button>
                          </div>
                          <textarea 
                            rows={3}
                            value={editingCourse.description}
                            onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                            placeholder="Entrez ou générez la description du cours..."
                            className="w-full bg-[#0A2244] border border-[#0F3560] rounded p-2 text-xs text-white outline-none resize-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button 
                            onClick={() => setEditingCourse(null)}
                            className="px-3 py-1.5 bg-[#1054A6] hover:bg-[#0C2E5C] rounded text-xs font-semibold cursor-pointer text-white"
                          >
                            Annuler
                          </button>
                          <button 
                            onClick={saveCourseEdits}
                            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded text-xs font-bold cursor-pointer"
                          >
                            Enregistrer le cours
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {schoolData.courses.map(course => (
                        <div key={course.id} className="bg-[#180c35] border border-violet-800/80 rounded-lg p-4 space-y-2 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-violet-900 rounded text-zinc-300">
                                {course.category}
                              </span>
                              <span className="text-xs font-extrabold text-[#F4AF23]">
                                {course.price} MAD
                              </span>
                            </div>
                            <h4 className="text-xs font-bold mt-2 text-white line-clamp-1">{course.title}</h4>
                            <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{course.description}</p>
                          </div>
                          
                          <div className="flex justify-end gap-1.5 pt-3 border-t border-violet-900">
                            <button 
                              onClick={() => startEditCourse(course)}
                              className="p-1.5 bg-violet-800 hover:bg-violet-700 rounded text-zinc-200 cursor-pointer"
                              title="Modifier"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button 
                              onClick={() => deleteCourse(course.id)}
                              className="p-1.5 bg-red-950/80 hover:bg-red-900 rounded text-red-400 cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REGISTRATIONS INBOX */}
                {activeAdminTab === 'registrations' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                      Inscriptions scolaires ({registrations.length})
                    </h3>

                    {registrations.length === 0 ? (
                      <div className="text-center py-8 text-zinc-400 text-xs">
                        Aucune demande d'inscription reçue pour le moment.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-zinc-300">
                          <thead className="bg-[#180c35] text-zinc-400 uppercase tracking-wider">
                            <tr>
                              <th className="p-3">Étudiant</th>
                              <th className="p-3">Contact</th>
                              <th className="p-3">Cours Demandé</th>
                              <th className="p-3">Message</th>
                              <th className="p-3">Date</th>
                              <th className="p-3">Statut</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-violet-900">
                            {registrations.map(reg => {
                              const course = schoolData.courses.find(c => c.id === reg.courseId);
                              return (
                                <tr key={reg.id} className="hover:bg-violet-950/40">
                                  <td className="p-3 font-semibold text-white">{reg.studentName}</td>
                                  <td className="p-3">
                                    <div className="space-y-0.5">
                                      <div>{reg.email}</div>
                                      <div className="text-[11px] text-zinc-500">{reg.phone}</div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-[#F4AF23] font-medium">{course ? course.title : "Cours inconnu"}</td>
                                  <td className="p-3 max-w-xs truncate" title={reg.message}>{reg.message}</td>
                                  <td className="p-3 text-zinc-400">{reg.timestamp}</td>
                                  <td className="p-3">
                                    <select 
                                      value={reg.status}
                                      onChange={(e) => changeRegStatus(reg.id, e.target.value as any)}
                                      className={`p-1 rounded font-bold uppercase text-[9px] outline-none ${
                                        reg.status === 'new' ? 'bg-[#E62E72]/20 text-[#E62E72] border border-[#E62E72]/40' :
                                        reg.status === 'contacted' ? 'bg-[#F4AF23]/20 text-[#F4AF23] border border-[#F4AF23]/40' :
                                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                      }`}
                                    >
                                      <option value="new" className="bg-[#211347]">Nouveau</option>
                                      <option value="contacted" className="bg-[#211347]">Contacté</option>
                                      <option value="processed" className="bg-[#211347]">Inscrit</option>
                                    </select>
                                  </td>
                                  <td className="p-3 text-right">
                                    <button 
                                      onClick={() => deleteReg(reg.id)}
                                      className="p-1.5 bg-red-950/80 hover:bg-red-900 rounded text-red-400 cursor-pointer"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* NEWSLETTER LIST */}
                {activeAdminTab === 'newsletters' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                      Liste de diffusion Newsletter ({newsletters.length})
                    </h3>

                    {newsletters.length === 0 ? (
                      <div className="text-center py-8 text-zinc-400 text-xs">
                        Aucun abonné pour le moment.
                      </div>
                    ) : (
                      <div className="max-w-md bg-[#180c35] rounded-xl border border-violet-800 p-4">
                        <div className="space-y-2 divide-y divide-violet-900">
                          {newsletters.map(n => (
                            <div key={n.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-semibold text-white block">{n.email}</span>
                                <span className="text-[10px] text-zinc-500">Inscrit le {n.timestamp}</span>
                              </div>
                              <button 
                                onClick={() => deleteNewsletter(n.id)}
                                className="p-1 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PUBLIC PREVIEW - THE PORTFOLIO WEBSITE HERO SCREEN */}
      <div className="relative">
        
        {/* TOP BAR / NAVIGATION DE L'ÉCOLE */}
        <div className="bg-[#0C2E5C] text-white py-2 px-6 text-xs border-b border-[#0B2545] hidden sm:block">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin size={13} className="text-[#FFCC00]" />
                {schoolData.address}
              </span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Phone size={13} className="text-[#FFCC00]" />
                {schoolData.phone}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-400">Suivez-nous</span>
              <span className="text-[#E52320] font-semibold">|</span>
              <span className="flex items-center gap-1.5">
                <span className="bg-[#E52320]/15 text-[#E52320] font-bold px-1.5 py-0.5 rounded text-[10px]">FR</span>
                <span className="text-zinc-400 hover:text-white cursor-pointer transition-all">EN</span>
                <span className="text-zinc-400 hover:text-white cursor-pointer transition-all">AR</span>
              </span>
            </div>
          </div>
        </div>

        <header className="sticky top-[37px] z-40 bg-white/95 backdrop-blur shadow-sm border-b border-sky-100">
          <div className="max-w-6xl mx-auto px-6 min-h-20 flex flex-wrap items-center justify-between gap-3 py-3">
            
            {/* School Logo */}
            <a href="#about" className="flex items-center gap-3 group">
              <SchoolLogo />
              <div>
                <h1 className="font-extrabold text-[#0C2E5C] tracking-tight text-xl leading-none group-hover:text-[#E52320] transition-colors duration-300">
                  {schoolData.name}
                </h1>
                <span className="text-[10px] uppercase tracking-wider text-[#FFCC00] bg-[#0C2E5C] px-1.5 py-0.5 rounded font-bold">École de Langues & Progrès</span>
              </div>
            </a>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center rounded-full border border-sky-200 bg-[#F4F8FC] p-2 text-[#0C2E5C] shadow-sm"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Nav Menu */}
            <nav className=" md:flex flex-wrap items-center justify-end gap-4 lg:gap-8 text-sm font-bold text-[#0C2E5C]">
              <a href="#about" className="hover:text-[#E52320] transition-colors">Accueil</a>
              <a href="#features" className="hover:text-[#E52320] transition-colors">Avantages</a>
              <a href="#courses" className="hover:text-[#E52320] transition-colors">Nos Cours</a>
              <a href="#testimonials" className="hover:text-[#E52320] transition-colors font-semibold">Témoignages</a>
              <a href="#pricing" className="hover:text-[#E52320] transition-colors">Tarifs</a>
              <a href="#news" className="hover:text-[#E52320] transition-colors">Actualités</a>
              
              <a 
                href="#contact" 
                className="bg-[#1245ea] text-white hover:bg-[#E6B800] hover:text-black px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-xs tracking-wider uppercase font-bold"
              >
                Inscriptions ouvertes
              </a>
            </nav>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-sky-100 bg-white/95 px-6 py-4 shadow-sm">
              <div className="flex flex-col gap-3 text-sm font-semibold text-[#0C2E5C]">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Accueil</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Avantages</a>
                <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Nos Cours</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Témoignages</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Tarifs</a>
                <a href="#news" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E52320] transition-colors">Actualités</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex w-fit items-center rounded-full bg-[#E52320] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Inscriptions ouvertes
                </a>
              </div>
            </div>
          )}
        </header>

        {/* HERO SECTION */}
        <section id="hero" className="relative py-16 md:py-24 bg-gradient-to-br from-[#F4F8FC] via-[#F9FBFD] to-white overflow-hidden border-b border-sky-50">
          
          {/* Accent colored spheres */}
          <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[#E62E72]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-[#FFCC00]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
            <div className="md:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#E52320]/10 text-[#E52320] font-extrabold text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-[#E52320]/20">
                <span>MEILLEUR APPRENTISSAGE</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C2E5C] leading-tight tracking-tight">
                {schoolData.slogan}
              </h2>

              <p className="text-base md:text-lg text-[#3B5A85] leading-relaxed max-w-xl font-medium">
                {schoolData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="#courses" 
                  className="bg-[#E52320] hover:bg-[#C21614] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
                >
                  <span>Découvrir nos cours</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#contact" 
                  className="bg-white hover:bg-zinc-50 text-[#0C2E5C] border-2 border-[#E5DFEF] font-bold text-sm px-8 py-4 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span>Prendre un rendez-vous</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center relative">
              
              {/* Overlap Cards inside Hero Image Grid */}
              <div className="relative w-full max-w-sm md:max-w-none">
                
                {/* Decorative golden badge */}
                <div className="absolute -top-6 -left-6 bg-[#FFCC00] text-[#0C2E5C] font-black text-xs p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center justify-center transform -rotate-6">
                  <span className="text-lg">99%</span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold">De Réussite</span>
                </div>

                <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative">
                  <img 
                    src={schoolData.heroImage} 
                    alt="Students at Isli School"
                    className="w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2E5C]/30 to-transparent" />
                </div>

                {/* Overlap card details */}
                <div className="absolute -bottom-6 -right-6 bg-white border border-stone-200/80 rounded-2xl p-5 shadow-2xl max-w-[240px] z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E52320]/10 rounded-lg flex items-center justify-center text-[#E52320]">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0C2E5C]">+500 Élèves</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Formés et certifiés par an</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* FEATURES GRID - YELLOW LABELS */}
        <section id="features" className="py-20 bg-white border-b border-sky-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#E52320] font-black tracking-widest text-xs uppercase block">NOTRE PROMESSE</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C2E5C]">Pourquoi apprendre avec l'École Isli ?</h3>
              <p className="text-sm text-[#3B5A85] font-medium">Un environnement sain, des outils de pointe et des formateurs triés sur le volet.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {schoolData.features.map((feat, idx) => (
                <div 
                  key={feat.id} 
                  className="bg-[#F4F8FC] border border-sky-100/70 rounded-2xl p-6 relative hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Big Numbers matching the image's style */}
                    <div className="w-10 h-10 bg-[#FFCC00] text-[#0C2E5C] rounded-full flex items-center justify-center font-black text-sm shadow-md">
                      {idx + 1}
                    </div>
                    <h4 className="font-extrabold text-base text-[#0C2E5C] tracking-tight">{feat.title}</h4>
                    <p className="text-xs text-[#3B5A85] leading-relaxed font-medium">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / BOOKING APPOINTMENT */}
        <section id="about-details" className="py-20 bg-gradient-to-r from-[#F4F8FC] to-white border-b border-sky-50">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E52320]/10 to-transparent rounded-2xl -z-10 transform translate-x-3 translate-y-3" />
                <img 
                  src={schoolData.aboutImage} 
                  alt="Education" 
                  className="w-full h-[380px] object-cover rounded-2xl border-4 border-white shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <span className="text-[#E52320] font-black tracking-widest text-xs uppercase block">EXCELLENCE QUALITÉ</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0C2E5C]">
                {schoolData.aboutTitle}
              </h3>
              <p className="text-base text-[#3B5A85] leading-relaxed font-medium">
                {schoolData.aboutText}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-1 shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#0C2E5C]">Horaires Flexibles</h5>
                    <p className="text-[11px] text-zinc-500">Matin, midi, soir & week-end</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-1 shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#0C2E5C]">Équipe Native</h5>
                    <p className="text-[11px] text-zinc-500">Enseignants natifs qualifiés</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="bg-[#E52320] hover:bg-[#C21614] text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl shadow-md inline-block transition-all transform hover:scale-102"
                >
                  Prendre Rendez-vous / Conseiller
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURED COURSES - FLAGS TABS */}
        <section id="courses" className="py-20 bg-[#0C2E5C] text-white relative overflow-hidden">
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-[#FFCC00] font-black tracking-widest text-xs uppercase block">TROUVEZ VOTRE FORMATION</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Nos Formations Vedettes</h3>
              <p className="text-sm text-zinc-300 font-medium">Explorez notre large gamme de cours de langues et soutien intensif pour tous âges.</p>
            </div>

            {/* Language filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-[#E52320] text-white border-[#E52320] shadow-lg' 
                      : 'bg-[#1054A6]/50 border-[#0F3560] text-zinc-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Courses carousel */}
            <div className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleCourses.map(course => (
                  <div 
                    key={course.id} 
                    className="bg-[#0A2244] border border-[#0F3560] rounded-2xl overflow-hidden hover:border-[#E52320]/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-44 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute top-3 right-3 w-20 h-20 rounded-full bg-[#E52320] border-4 border-[#0A2244] text-white flex flex-col items-center justify-center shadow-lg font-black leading-none">
                        <span className="text-xs">{course.price} DH</span>
                        <span className="text-[8px] uppercase tracking-wider font-extrabold">Tarif</span>
                      </div>

                      <div className="absolute bottom-3 left-3 bg-[#0C2E5C]/90 backdrop-blur text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                        {course.category}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="font-extrabold text-base text-white tracking-tight line-clamp-2">{course.title}</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed font-medium mt-2 line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#0F3560]/80 space-y-3">
                        <div className="flex justify-between text-[11px] text-zinc-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-[#FFCC00]" />
                            {course.duration}
                          </span>
                          <span>
                            {course.hoursPerWeek}h / semaine
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedCourseForEnroll(course)}
                          className="w-full bg-[#E52320] hover:bg-[#C21614] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                        >
                          S'inscrire à ce cours
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(canGoPrev || canGoNext) && (
                <div className="flex justify-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setCourseCarouselIndex((prev) => Math.max(0, prev - 4))}
                    disabled={!canGoPrev}
                    className={`inline-flex items-center justify-center rounded-full border p-2 transition-all ${canGoPrev ? 'border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#0C2E5C]' : 'border-[#0F3560] text-[#0F3560] cursor-not-allowed'}`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseCarouselIndex((prev) => prev + 4)}
                    disabled={!canGoNext}
                    className={`inline-flex items-center justify-center rounded-full border p-2 transition-all ${canGoNext ? 'border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#0C2E5C]' : 'border-[#0F3560] text-[#0F3560] cursor-not-allowed'}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section id="testimonials" className="py-20 bg-white border-b border-sky-50">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative">
            
            <span className="text-[#E52320] font-black tracking-widest text-xs uppercase">RÉPUTATION & SUCCÈS</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#0C2E5C]">Ce que disent nos apprenants</h3>

            <div className="relative min-h-[180px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-2xl"
                >
                  <p className="text-lg md:text-xl text-[#0C2E5C] italic font-semibold leading-relaxed">
                    "{schoolData.testimonials[testimonialIndex]?.quote}"
                  </p>
                  
                  <div className="flex justify-center items-center gap-1 text-[#FFCC00]">
                    {Array.from({ length: schoolData.testimonials[testimonialIndex]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <img 
                      src={schoolData.testimonials[testimonialIndex]?.avatar} 
                      alt={schoolData.testimonials[testimonialIndex]?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm text-[#0C2E5C]">{schoolData.testimonials[testimonialIndex]?.name}</h4>
                      <p className="text-[11px] text-zinc-500 font-bold">{schoolData.testimonials[testimonialIndex]?.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Left/Right Buttons */}
            <div className="flex justify-center gap-3 pt-4">
              <button 
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full border border-sky-100 bg-[#F4F8FC] text-[#0C2E5C] hover:bg-[#E52320] hover:text-white hover:border-[#E52320] transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full border border-sky-100 bg-[#F4F8FC] text-[#0C2E5C] hover:bg-[#E52320] hover:text-white hover:border-[#E52320] transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-[#F4F8FC] to-white border-b border-sky-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#E52320] font-black tracking-widest text-xs uppercase block">FORFAITS ET PRIX</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C2E5C]">Nos Tarifs Clairs et Sans Surprise</h3>
              <p className="text-sm text-[#3B5A85] font-medium">Bénéficiez de tarifs préférentiels d'apprentissage pour des résultats certifiés d'avance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {schoolData.pricingPlans.map(plan => (
                <div 
                  key={plan.id}
                  className={`bg-white border-2 rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    plan.isPopular 
                      ? 'border-[#E52320] shadow-xl md:scale-105 z-10' 
                      : 'border-sky-100 hover:border-sky-300 shadow-sm'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E52320] text-white font-extrabold uppercase tracking-widest text-[10px] px-4 py-1 rounded-full shadow">
                      LE PLUS POPULAIRE
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-extrabold text-lg text-[#0C2E5C] tracking-tight">{plan.title}</h4>
                      <p className="text-xs text-zinc-500 font-medium mt-1">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline text-[#0C2E5C]">
                      <span className="text-4xl font-black">{plan.price} MAD</span>
                      <span className="text-sm font-semibold text-zinc-500 ml-2">/ {plan.period}</span>
                    </div>

                    <div className="border-t border-sky-100 pt-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5 text-xs text-[#3B5A85] font-semibold">
                            <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a 
                      href="#contact"
                      className={`w-full block py-3 rounded-xl text-center font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        plan.isPopular 
                          ? 'bg-[#E52320] hover:bg-[#C21614] text-white shadow-md' 
                          : 'bg-[#0C2E5C] hover:bg-[#0A2244] text-white'
                      }`}
                    >
                      Choisir ce programme
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCHOOL BLOG / RECENT ARTICLES */}
        <section id="news" className="py-20 bg-white border-b border-sky-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#E52320] font-black tracking-widest text-xs uppercase block font-bold">BLOG ET CONSEILS</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C2E5C]">Derniers Articles sur Facebook </h3>
              <p className="text-sm text-[#3B5A85] font-medium">Développez vos compétences en autonomie avec nos dossiers, infographies et astuces.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {schoolData.news.map(item => (
                <article 
                  key={item.id} 
                  className="bg-[#F4F8FC] border border-sky-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#E52320] text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold">
                        <span>{item.date}</span>
                        
                      </div>
                      <h4 className="font-extrabold text-base text-[#0C2E5C] tracking-tight leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#3B5A85] leading-relaxed font-medium line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#E52320] hover:underline cursor-pointer font-extrabold">Lire la suite &rarr;</span>
                    <span className="text-zinc-500">{item.commentsCount} commentaires</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE NEWSLETTER BOX - DEEP BLUE */}
        <section id="newsletter" className="py-16 bg-[#0C2E5C] text-white relative overflow-hidden">
          <div className="absolute top-[-30%] left-[10%] w-[350px] h-[350px] bg-[#E52320]/15 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
            <span className="text-[#FFCC00] font-black tracking-widest text-xs uppercase block font-bold">ABONNEMENT</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Inscrivez-vous à notre Newsletter !</h3>
            <p className="text-sm text-zinc-200 font-medium max-w-lg mx-auto">
              Recevez chaque semaine des astuces gratuites d'apprentissage, des guides de prononciation et nos offres promotionnelles exclusives.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
              <input 
                type="email" 
                placeholder="Votre adresse e-mail" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 text-white placeholder-zinc-300 text-xs px-4 py-3 rounded-full border border-[#0F3560] outline-none focus:ring-1 focus:ring-[#E52320]"
              />
              <button 
                type="submit"
                className="bg-[#E52320] hover:bg-[#C21614] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full cursor-pointer transition-all duration-300"
              >
                S'abonner maintenant
              </button>
            </form>

            {newsletterSuccess && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 font-bold"
              >
                ✓ Merci ! Vous êtes bien inscrit(e). Vos données sont stockées dans le tableau de bord Admin.
              </motion.p>
            )}
          </div>
        </section>

    

        {/* ENROLLMENT & CONTACT FORM */}
        <section id="contact" className="py-20 bg-gradient-to-t from-[#F4F8FC] to-white">
          <div className="max-w-6xl mx-auto px-6">
            
            <div className="grid md:grid-cols-12 gap-12 items-start">
              
              <div className="md:col-span-5 space-y-6">
                <span className="text-[#E52320] font-black tracking-widest text-xs uppercase block font-bold">INSCRIPTIONS</span>
                <h3 className="text-3xl font-extrabold text-[#0C2E5C]">Inscrivez-vous dès aujourd'hui</h3>
                <p className="text-sm text-[#3B5A85] leading-relaxed font-medium">
                  Remplissez notre formulaire de candidature en ligne. Un conseiller d'orientation vous rappellera sous 24 heures ouvrées pour valider vos objectifs, planifier votre test de niveau gratuit et confirmer votre planning de cours.
                </p>

                <div className="space-y-4 pt-4 border-t border-sky-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0C2E5C]">
                    <Mail className="text-[#E52320]" size={16} />
                    <span>{schoolData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0C2E5C]">
                    <Phone className="text-[#E52320]" size={16} />
                    <span> 07 16 66 09 75</span>
                    <Phone className="text-[#E52320]" size={16} />
                    <span> 05 37 74 76 02</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0C2E5C]">
                    <MapPin className="text-[#E52320]" size={16} />
                    <span>{schoolData.address}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-3xl border-2 border-sky-100 p-8 shadow-xl">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Standard contact submission
                  const demoCourse = schoolData.courses[0];
                  if (!demoCourse) return;
                  const newReg: Registration = {
                    id: "reg_" + Math.random().toString(36).substring(2, 9),
                    studentName,
                    email: studentEmail,
                    phone: studentPhone,
                    courseId: demoCourse.id,
                    message: studentMsg,
                    timestamp: new Date().toLocaleDateString('fr-FR') + " " + new Date().toLocaleTimeString('fr-FR'),
                    status: 'new'
                  };
                  setRegistrations([newReg, ...registrations]);
                  setEnrollmentSuccess(true);
                  setTimeout(() => {
                    setEnrollmentSuccess(false);
                    setStudentName('');
                    setStudentEmail('');
                    setStudentPhone('');
                    setStudentMsg('');
                  }, 4000);
                }} className="space-y-4">
                  <h4 className="text-lg font-extrabold text-[#0C2E5C] pb-3 border-b border-sky-100">Formulaire de Contact & Candidature</h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0C2E5C] mb-1.5 uppercase">Votre nom complet</label>
                      <input 
                        type="text" 
                        placeholder="Jean Dupont"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        className="w-full bg-white border border-sky-100 text-[#0C2E5C] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E52320] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0C2E5C] mb-1.5 uppercase">Adresse e-mail</label>
                      <input 
                        type="email" 
                        placeholder="jean@example.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                        className="w-full bg-white border border-sky-100 text-[#0C2E5C] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E52320] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D1B5B] mb-1.5 uppercase">Numéro de téléphone</label>
                      <input 
                        type="text" 
                        placeholder="+212 6..."
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        required
                        className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E62E72] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D1B5B] mb-1.5 uppercase">Votre niveau estimé</label>
                      <select className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E62E72] outline-none font-semibold">
                        <option>Débutant complet (A1)</option>
                        <option>Intermédiaire modéré (B1 / B2)</option>
                        <option>Avancé (C1 / C2)</option>
                        <option>Soutien Scolaire (Scolarité standard)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D1B5B] mb-1.5 uppercase">Parlez-nous de vos objectifs d'études</label>
                    <textarea 
                      rows={4}
                      placeholder="Indiquez vos attentes scolaires, langues cibles et préférences..."
                      value={studentMsg}
                      onChange={(e) => setStudentMsg(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E62E72] outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#E52320] hover:bg-[#2262d1] text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-xl shadow-lg cursor-pointer transition-all duration-300"
                  >
                    Envoyer ma candidature
                  </button>

                  {enrollmentSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-xl text-xs font-semibold text-center"
                    >
                      ✓ Candidature envoyée avec succès ! Consultez-la à tout moment dans l'onglet "Gérer l'École & Contenu".
                    </motion.div>
                  )}
                </form>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* QUICK ENROLL MODAL */}
      <AnimatePresence>
        {selectedCourseForEnroll && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-[#E5DFEF] max-w-lg w-full p-6 space-y-4 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedCourseForEnroll(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-[#2D1B5B] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <span className="bg-[#E62E72]/10 text-[#E62E72] font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                  {selectedCourseForEnroll.category}
                </span>
                <h3 className="text-xl font-extrabold text-[#2D1B5B]">{selectedCourseForEnroll.title}</h3>
                <p className="text-xs text-zinc-500">Tarif : {selectedCourseForEnroll.price} € pour {selectedCourseForEnroll.duration}</p>
              </div>

              <form onSubmit={handleEnrollSubmit} className="space-y-3 pt-2 border-t border-violet-100">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D1B5B] mb-1">Votre Nom Complet</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Alice Bernard"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-2.5 text-xs outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D1B5B] mb-1">Adresse Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="alice@gmail.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-2.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D1B5B] mb-1">Téléphone</label>
                    <input 
                      type="text" 
                      required
                      placeholder="+212 6..."
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-2.5 text-xs outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2D1B5B] mb-1">Message optionnel</label>
                  <textarea 
                    rows={2}
                    placeholder="Des précisions à apporter ?"
                    value={studentMsg}
                    onChange={(e) => setStudentMsg(e.target.value)}
                    className="w-full bg-white border border-[#E5DFEF] text-[#2D1B5B] rounded-xl p-2.5 text-xs outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setSelectedCourseForEnroll(null)}
                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-[#2D1B5B] font-bold text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer"
                  >
                    Fermer
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#E62E72] hover:bg-[#d12260] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer shadow-md"
                  >
                    Valider l'Inscription
                  </button>
                </div>

                {enrollmentSuccess && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-center text-emerald-600 font-bold"
                  >
                    ✓ Inscription enregistrée ! Rendez-vous en haut dans "Gérer l'École".
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#101b42] text-[#A69CC8] py-16 border-t-2 border-violet-950">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-white font-black text-lg">{schoolData.name}</h4>
            <p className="text-xs leading-relaxed">
              Le meilleur endroit de formation pour vos enfants et vous-même. Apprenez en vous amusant avec notre corps professoral qualifié.
            </p>
          </div>
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">École</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Formations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Soutien</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><a href="#contact" className="hover:text-white transition-colors">Inscriptions</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Plan d'accès</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Contact direct</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li className="text-zinc-300">Centre Isli Qahira - Témara - Maroc</li>
              <li className="text-zinc-300">05 37 74 76 02 / +212 7 16 66 09 75</li>
              <li className="text-zinc-300">{schoolData.email}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-violet-900 text-center text-xs">
          <p>© {new Date().getFullYear()} {schoolData.name}. Tous droits réservés.</p>
          <p className="opacity-70 mt-1">Zayn ELmoubtakir.</p>
        </div>
      </footer>

    </div>
  );
}
