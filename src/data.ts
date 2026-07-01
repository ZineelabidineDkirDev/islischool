import { SchoolData } from './types';

const heroImage = new URL('../assets/isli_hero.jpg', import.meta.url).href;
const aboutImage = new URL('../assets/isli_dig.jpg', import.meta.url).href;
const frenchCourseImage = new URL('../assets/isli_fr.jpg', import.meta.url).href;
const englishCourseImage = new URL('../assets/isli_eng.jpg', import.meta.url).href;
const examCourseImage = new URL('../assets/isli_prepa.jpg', import.meta.url).href;
const bureautiqueCourseImage = new URL('../assets/isli_buro.jpg', import.meta.url).href;
const newsImageOne = new URL('../assets/isli_act1.jpg', import.meta.url).href;
const newsImageTwo = new URL('../assets/isli_act2.jpg', import.meta.url).href;
const newsImageThree = new URL('../assets/isli_act3.jpg', import.meta.url).href;

export const defaultSchoolData: SchoolData = {
  name: "Isli School",
  slogan: "Un excellent endroit pour votre éducation",
  description: "Notre école de langues et de formation est reconnue pour ses programmes d'études de haute qualité dans le monde entier. Nous travaillons avec les meilleurs enseignants pour garantir votre réussite académique et professionnelle.",
  aboutTitle: "Commençons votre éducation !",
  aboutText: "Nous proposons une approche d'apprentissage moderne adaptée à chaque profil d'étudiant. Notre large gamme d'options de formation permet à chacun de choisir le rythme et les objectifs les plus pertinents pour son avenir.",
  email: "contact@isli-school.fr",
  phone: "05 37 74 76 02",
  address: " Isli_Qahira – Témara, Maroc",
  heroImage,
  aboutImage,
  features: [
    {
      id: "f1",
      title: "Approche Simple d'Étude",
      description: "Des cours structurés étape par étape avec des objectifs hebdomadaires clairs pour un progrès mesurable.",
      iconName: "book"
    },
    {
      id: "f2",
      title: "Supports Gratuits",
      description: "Accédez à une bibliothèque numérique complète de manuels, d'exercices et d'enregistrements audio.",
      iconName: "shield"
    },
    {
      id: "f3",
      title: "App Mobile Intégrée",
      description: "Entraînez-vous n'importe où et n'importe quand grâce à notre application d'apprentissage sur iOS et Android.",
      iconName: "smartphone"
    },
    {
      id: "f4",
      title: "École Certifiée",
      description: "Tous nos diplômes et certifications sont reconnus internationalement et valident vos compétences.",
      iconName: "award"
    }
  ],
  courses: [
    {
      id: "c1",
      title: "Langue Française & Communication",
      level: "Débutant à Avancé",
      price: 1400,
      duration: "12 Semaines",
      description: "Maîtrisez la grammaire française, enrichissez votre vocabulaire et exprimez-vous avec assurance au quotidien.",
      category: "Français",
      image: frenchCourseImage,
      hoursPerWeek: 6
    },
    {
      id: "c2",
      title: "Anglais Intensif Professionnel",
      level: "Intermédiaire",
      price: 1600,
      duration: "14 Semaines",
      description: "Idéal pour les professionnels et chefs d'entreprise souhaitant négocier, présenter et manager en anglais.",
      category: "Anglais",
      image: englishCourseImage,
      hoursPerWeek: 8
    },
    {
      id: "c3",
      title: "Préparation Examens de Langue",
      level: "Avancé",
      price: 1800,
      duration: "16 Semaines",
      description: "Une préparation intensive aux examens du TOEFL, IELTS, DALF ou DELF avec des examens blancs réguliers.",
      category: "Préparation",
      image: examCourseImage,
      hoursPerWeek: 10
    },
    {
      id: "c4",
      title: "Soutien Scolaire Global & Méthodes",
      level: "Primaire à Lycée",
      price: 1200,
      duration: "8 Semaines",
      description: "Un accompagnement ciblé en mathématiques, sciences et méthodologie pour redonder confiance à chaque élève.",
      category: "Soutien",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
      hoursPerWeek: 4
    },
    {
      id: "c5",
      title: "Bureautique et Compétences Numériques",
      level: "Études Supérieures & Professionnels",
      price: 1000,
      duration: "4 Semaines",
      description: "Maîtrisez les outils de bureautique et développez vos compétences numériques pour réussir dans le monde professionnel.",
      category: "Bureautique",
      image: bureautiqueCourseImage,
      hoursPerWeek: 2
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sabrina Alami",
      role: "Étudiante en Langue Française",
      quote: "L'École Isli a complètement changé ma façon de voir l'apprentissage. Les cours sont dynamiques et très axés sur la pratique orale. Je me sens beaucoup plus à l'aise désormais !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t2",
      name: "Thomas Dubois",
      role: "Directeur Marketing",
      quote: "Le programme d'anglais professionnel m'a permis d'obtenir une promotion internationale. L'enseignant était fantastique et comprenait parfaitement les enjeux d'affaires modernes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ],
  pricingPlans: [
    {
      id: "p1",
      title: "Éducation Standard",
      price: "1500",
      period: "par mois",
      description: "Idéal pour démarrer l'apprentissage d'une langue à votre rythme.",
      features: [
        "4 heures de cours en direct par semaine",
        "Accès complet à la plateforme web",
        "Supports de cours numériques gratuits",
        "Correction des exercices hebdomadaires"
      ]
    },
    {
      id: "p2",
      title: "Programme Avancé",
      price: "2500",
      period: "par mois",
      description: "Pour ceux qui recherchent des résultats d'apprentissage accélérés.",
      features: [
        "10 heures de cours par semaine",
        "Outils d'apprentissage avancés",
        "Sessions individuelles de mentorat (1h)",
        "Préparation certifiée aux examens officiels",
        "Accès prioritaire à l'assistance technique"
      ],
      isPopular: true
    },
    {
      id: "p3",
      title: "Programme Individuel",
      price: "3500",
      period: "par mois",
      description: "Parfait pour un accompagnement sur mesure selon votre emploi du temps.",
      features: [
        "Cours 100% individuels personnalisés",
        "Horaires flexibles modifiables 24h à l'avance",
        "Programme de cours adapté à vos objectifs",
        "Rapports de progression bimensuels",
        "Contact direct avec votre formateur dédié"
      ]
    }
  ],
  news: [
    {
      id: "n1",
      title: "Guide complet pour éviter les erreurs de prononciation",
      date: "28 Juin 2026",
      category: "Astuces Linguistiques",
      excerpt: "Découvrez notre nouveau guide interactif rédigé par nos enseignants experts pour corriger instantanément vos habitudes de prononciation.",
      image: newsImageOne,
      commentsCount: 12,
    },
    {
      id: "n2",
      title: "Preparer votre baccalauréat avec des verbes d'action puissants",
      date: "15 Juin 2026",
      category: "Carrière",
      excerpt: "Remplacez les verbes d'action basiques par des synonymes puissants et valorisants pour attirer l'attention des recruteurs internationaux.",
      image: newsImageTwo,
      commentsCount: 8
    },
    {
      id: "n3",
      title: "Preparation aux concours de L'ENA et de l'ENCG : Stratégies et Ressources",
      date: "04 Juin 2026",
      category: "Développement Personnel",
      excerpt: "Nos astuces d'expression pour prendre la parole de manière sereine, fluide et captivante dans n'importe quelle langue étrangère.",
      image: newsImageThree,
      commentsCount: 15
    }
  ]
};
