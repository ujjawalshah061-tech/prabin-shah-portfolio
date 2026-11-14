// Shapes of everything that can be edited from the CMS (Sanity Studio at /studio).
// Image fields come in two forms: `xxxFile` is the bundled fallback image (a file name in
// src/assets/images) and `xxxUrl` is the image uploaded in the CMS (it wins when present).

export interface Stat {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface TitleSub {
  title: string;
  subtitle: string;
}

export interface SiteSettings {
  firstName: string;
  lastName: string;
  heroGreeting: string;
  availability: string;
  heroRoles: string[];
  heroDescription: string;
  heroStats: Stat[];
  marquee: string[];
  heroCards: TitleSub[];
  locationPin: string;
  portraitUrl?: string;
  toolkitCaption: string;
  toolkitImageUrl?: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  worksAt: string;
  mapEmbedUrl: string;
  mapLink: string;
  resumeUrl?: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  footerHeadline: string;
  footerHighlight: string;
  footerText: string;
  footerRole: string;
  footerLocation: string;
  firmName: string;
  firmUrl: string;
}

export interface About {
  lead: string;
  leadHighlight: string;
  paragraphs: string[];
  competencies: string[];
  photoCaption: string;
  photoUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  status?: string;
  focus: string;
}

export type Accent = "amber" | "cyan" | "violet";

export interface SkillCategory {
  title: string;
  subtitle: string;
  accent: Accent;
  skills: string[];
}

export interface PhotoCard {
  tag: string;
  title: string;
  caption: string;
  imageFile?: string;
  imageUrl?: string;
  focus: string;
}

export type WorkIcon = "building" | "flask" | "hardhat" | "compass";

export interface Work {
  badge: string;
  category: string;
  company: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  link?: string;
  icon: WorkIcon;
  thumbFile?: string;
  thumbUrl?: string;
  thumbIsLogo?: boolean;
}

export interface Leadership {
  period: string;
  role: string;
  entity: string;
  domain: string;
}

export interface Project {
  category: string;
  title: string;
  desc: string;
  tools: string[];
  capacity?: string;
}

export interface Spec {
  value: string;
  label: string;
}

export interface Featured {
  title: string;
  capacity: string;
  role: string;
  desc: string;
  specs: Spec[];
  tools: string[];
  imageFile?: string;
  imageUrl?: string;
}

export interface Content {
  settings: SiteSettings;
  about: About;
  education: Education[];
  skills: SkillCategory[];
  milestones: PhotoCard[];
  gallery: PhotoCard[];
  work: Work[];
  leadership: Leadership[];
  projects: Project[];
  featured: Featured;
}
