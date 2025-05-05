
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Mic, Link as LinkIcon, Download } from 'lucide-react';
import { Resource } from '@/utils/database';
import { toast } from 'sonner';

interface ResourceVaultProps {
  resources: Resource[];
}

const ResourceTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-biophilic-earth" />;
    case 'video':
      return <Video className="h-5 w-5 text-biophilic-earth" />;
    case 'audio':
      return <Mic className="h-5 w-5 text-biophilic-earth" />;
    case 'link':
      return <LinkIcon className="h-5 w-5 text-biophilic-earth" />;
    default:
      return <FileText className="h-5 w-5 text-biophilic-earth" />;
  }
};

const ResourceVault: React.FC<ResourceVaultProps> = ({ resources }) => {
  const handleResourceClick = (resource: Resource) => {
    // In a real application, this would navigate to the resource or download it
    toast.success(`Resource "${resource.title}" is now available in your Study Gallery`);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-biophilic-earth text-xl">Resource Vault</CardTitle>
            <CardDescription>Complementary learning materials for your journey</CardDescription>
          </div>
          <Badge variant="outline" className="bg-biophilic-sand/10">
            {resources.length} Resources
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-start border-b pb-4 last:border-0">
              <div className="p-2 bg-biophilic-sand/10 rounded-md mr-4">
                <ResourceTypeIcon type={resource.type} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {resource.type}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-biophilic-earth hover:bg-biophilic-earth/10 hover:text-biophilic-earth p-0 h-auto text-xs flex items-center"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {resources.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No resources available for this course.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceVault;
