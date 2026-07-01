export interface Course {
  id: string;
  title: string;
  level: string; // e.g. "Débutant", "Intermédiaire", "Avancé"
  price: number;
  duration: string; // e.g. "12 semaines"
  description: string;
  category: string; // e.g. "Anglais", "Français", "Soutien Scolaire"
  image: string;
  hoursPerWeek: number;
}

export interface SchoolFeature {
  id: string;
  title: string;
  description: string;
  iconName: 'book' | 'award' | 'smartphone' | 'users' | 'shield' | 'check';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface SchoolNews {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  commentsCount: number;
}

export interface SchoolData {
  name: string;
  slogan: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  email: string;
  phone: string;
  address: string;
  heroImage: string;
  aboutImage: string;
  courses: Course[];
  features: SchoolFeature[];
  testimonials: Testimonial[];
  pricingPlans: PricingPlan[];
  news: SchoolNews[];
}

export interface Registration {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'processed';
}

export interface NewsletterContact {
  id: string;
  email: string;
  timestamp: string;
}
