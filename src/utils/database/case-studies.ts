
import { caseStudiesData } from './mock-data';
import { CaseStudy } from './types';

// Add the mock case studies
const biomimicryExamples: Omit<CaseStudy, "id" | "createdAt">[] = [
  {
    title: "Eastgate Centre: Termite-Inspired Climate Control",
    description: "This shopping center in Harare, Zimbabwe, uses passive cooling inspired by termite mounds. The building maintains a stable temperature without conventional air conditioning by mimicking the ventilation techniques of termite colonies.",
    images: ["https://images.unsplash.com/photo-1566699261058-f05173dcba21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
    tags: ["biomimicry", "passive cooling", "commercial architecture", "energy efficiency"],
    author: "Mick Pearce",
    authorId: "admin1",
    featured: true,
    published: true,
    location: "Harare, Zimbabwe",
    year: 1996
  },
  {
    title: "Sahara Forest Project: Desert Ecosystem Restoration",
    description: "Inspired by the Namibian desert beetle's ability to harvest water from air, this project combines solar power and seawater to create freshwater and grow crops in arid regions. The integrated system mimics natural cycles to regenerate degraded landscapes.",
    images: ["https://images.unsplash.com/photo-1609945161237-3244725058f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
    tags: ["biomimicry", "water harvesting", "agriculture", "desert restoration"],
    author: "Jordan Research Team",
    authorId: "admin1",
    featured: false,
    published: true,
    location: "Jordan",
    year: 2012
  },
  {
    title: "Lotus-Inspired Self-Cleaning Surfaces",
    description: "The Lotus Building in Wuxi, China incorporates self-cleaning surfaces inspired by the lotus leaf's microstructure, which causes water to bead and carry away dirt particles. This biomimetic design reduces maintenance costs and water usage.",
    images: ["https://images.unsplash.com/photo-1561361058-c24e02642df0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
    tags: ["biomimicry", "material science", "water efficiency", "maintenance reduction"],
    author: "Studio 505",
    authorId: "admin1",
    featured: true,
    published: true,
    location: "Wuxi, China",
    year: 2013
  },
  {
    title: "PAX Water Mixer: Lily-Inspired Water Treatment",
    description: "This water treatment technology uses impeller designs inspired by the shape of calla lily flowers to efficiently mix water in storage tanks. The biomimetic design reduces energy use by 80% compared to conventional mixers while improving water quality.",
    images: ["https://images.unsplash.com/photo-1543074071-64c7044cc15b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
    tags: ["biomimicry", "water treatment", "energy efficiency", "fluid dynamics"],
    author: "PAX Scientific",
    authorId: "admin1",
    featured: false,
    published: true,
    location: "California, USA",
    year: 2006
  },
  {
    title: "BioLonia Community Housing: Plant-Inspired Structures",
    description: "This residential community in Kenya features homes designed using principles from plant structures. The buildings incorporate natural ventilation systems inspired by termite mounds and structural elements that mimic plant cellular patterns for strength with minimal material.",
    images: ["https://images.unsplash.com/photo-1582699011340-21e531949c3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
    tags: ["biomimicry", "residential design", "sustainable housing", "community planning"],
    author: "Nairobi Green Architects",
    authorId: "admin1",
    featured: true,
    published: true,
    location: "Nairobi, Kenya",
    year: 2019
  }
];

// Initialize case studies if needed
const initializeCaseStudies = () => {
  if (caseStudiesData.length <= 1) {
    // Add mock case studies
    biomimicryExamples.forEach((example, index) => {
      const newCaseStudy: CaseStudy = {
        id: `cs${caseStudiesData.length + index + 1}`,
        ...example,
        createdAt: new Date().toISOString()
      };
      
      caseStudiesData.push(newCaseStudy);
    });
  }
};

// Initialize the case studies
initializeCaseStudies();

// Case Study Functions
export const getCaseStudies = (): CaseStudy[] => {
  return caseStudiesData;
};

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find(study => study.id === id);
};

export const addCaseStudy = (caseStudy: Omit<CaseStudy, "id" | "featured" | "published" | "createdAt">): CaseStudy => {
  const newCaseStudy: CaseStudy = {
    id: `cs${caseStudiesData.length + 1}`,
    ...caseStudy,
    featured: false,
    published: false, // Needs instructor review before publishing
    createdAt: new Date().toISOString()
  };
  
  caseStudiesData.push(newCaseStudy);
  return newCaseStudy;
};

export const publishCaseStudy = (id: string, publish: boolean = true): boolean => {
  const caseStudy = caseStudiesData.find(study => study.id === id);
  if (caseStudy) {
    caseStudy.published = publish;
    return true;
  }
  return false;
};
