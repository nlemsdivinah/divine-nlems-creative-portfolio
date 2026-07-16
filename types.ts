import type { Image, PortableTextBlock } from "sanity";

export interface SanityImageAsset extends Image {
  alt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImageAsset;
  rating?: number;
  quote: string;
}

export interface Project {
  _id: string;
  plateNumber: number;
  title: string;
  slug: { current: string };
  client?: string;
  industry?: string;
  year?: string;
  featured?: boolean;
  coverImage: SanityImageAsset;
  summary?: string;
  objectives?: string[];
  problem?: PortableTextBlock[];
  process?: (PortableTextBlock | SanityImageAsset)[];
  solution?: PortableTextBlock[];
  toolsUsed?: string[];
  brandStrategy?: PortableTextBlock[];
  typography?: string[];
  colorPalette?: string[];
  gallery?: SanityImageAsset[];
  beforeAfter?: { before?: SanityImageAsset; after?: SanityImageAsset };
  results?: string[];
  testimonial?: Testimonial;
  links?: { liveUrl?: string; behance?: string; dribbble?: string; github?: string };
}

export interface Service {
  _id: string;
  title: string;
  icon?: string;
  description: string;
  benefits?: string[];
  ctaLabel?: string;
  startingPrice?: string;
}

export interface SiteSettings {
  siteName?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroPortrait?: SanityImageAsset;
  availability?: string;
  resumeFile?: { asset: { url: string } };
  bio?: PortableTextBlock[];
  mission?: string;
  values?: string[];
  timeline?: { year: string; label: string }[];
  skills?: { name: string; level: number }[];
  process?: { title: string; description: string }[];
  stats?: { value: number; suffix?: string; label: string }[];
  clientLogos?: SanityImageAsset[];
  awards?: string[];
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  instagram?: string;
  behance?: string;
  dribbble?: string;
  calendlyUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}
