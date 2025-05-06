
import { caseStudiesData } from './mock-data';
import { CaseStudy } from './types';

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
