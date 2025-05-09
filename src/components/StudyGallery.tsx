
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCaseStudies } from '@/utils/database';
import ImageWithFallback from './ImageWithFallback';
import '../styles/image-styles.css';

interface StudyGalleryProps {
  filter?: string;
}

const StudyGallery: React.FC<StudyGalleryProps> = ({ filter = 'all' }) => {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  
  useEffect(() => {
    const studies = getCaseStudies();
    
    if (filter === 'all') {
      setCaseStudies(studies);
    } else {
      const filtered = studies.filter(study => 
        study.tags.includes(filter)
      );
      setCaseStudies(filtered);
    }
  }, [filter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {caseStudies.map((study) => (
        <Link key={study.id} to={`/case-study/${study.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src={study.coverImage || study.images?.[0]}
                fallbackSrc1="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5"
                fallbackSrc2="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
                alt={study.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                {study.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-biophilic-sand/10">
                    {tag}
                  </Badge>
                ))}
                {study.tags.length > 3 && (
                  <Badge variant="outline" className="bg-biophilic-sand/10">
                    +{study.tags.length - 3}
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                by {study.author}
              </p>
              <p className="text-sm line-clamp-3 text-foreground/80">
                {study.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
      
      {caseStudies.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No case studies found for this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyGallery;
