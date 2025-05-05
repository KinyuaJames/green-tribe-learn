
import React from 'react';
import { Resource } from '@/utils/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceVaultProps {
  resources: Resource[];
}

const ResourceVault: React.FC<ResourceVaultProps> = ({ resources }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'file-text':
        return <FileText className="w-5 h-5" />;
      case 'book':
        return <Book className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF Document';
      case 'video':
        return 'Video Resource';
      case 'audio':
        return 'Audio Resource';
      case 'link':
        return 'External Link';
      default:
        return 'Resource';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biophilic-earth">Resource Vault</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No resources available for this course.
            </p>
          ) : (
            resources.map((resource) => (
              <div key={resource.id} className="flex items-start p-4 border rounded-lg">
                <div className="bg-biophilic-earth/10 p-3 rounded-lg mr-4">
                  {getIcon(resource.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {getTypeLabel(resource.type)}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-biophilic-earth border-biophilic-earth hover:bg-biophilic-earth/10"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type === 'pdf' ? 'Download PDF' : 
                         resource.type === 'video' ? 'Watch Video' : 
                         resource.type === 'audio' ? 'Listen' : 'Open Link'}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceVault;
