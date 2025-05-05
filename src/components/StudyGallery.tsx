
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface StudyItem {
  id: string;
  title: string;
  type: 'image' | 'note' | 'voice';
  content: string;
  thumbnail?: string;
  createdAt: string;
}

interface StudyGalleryProps {
  items: StudyItem[];
  onDeleteItem?: (itemId: string) => void;
}

const StudyGallery: React.FC<StudyGalleryProps> = ({ 
  items = [], 
  onDeleteItem 
}) => {
  const [selectedItem, setSelectedItem] = useState<StudyItem | null>(null);
  
  const handleOpenItem = (item: StudyItem) => {
    setSelectedItem(item);
  };
  
  const handleDeleteItem = (itemId: string) => {
    if (onDeleteItem) {
      onDeleteItem(itemId);
      
      // If we're deleting the currently selected item, close the modal
      if (selectedItem?.id === itemId) {
        setSelectedItem(null);
      }
      
      toast.success('Item removed from gallery');
    }
  };
  
  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <p className="text-lg text-biophilic-earth mb-2">Your Study Gallery is Empty</p>
          <p className="text-foreground/70">
            Upload images, notes, or voice recordings from your course work to build your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div 
                className="aspect-square bg-muted cursor-pointer" 
                onClick={() => handleOpenItem(item)}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.content} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                ) : item.type === 'voice' ? (
                  <div className="flex items-center justify-center h-full bg-biophilic-sand/20">
                    <div className="p-6 rounded-full bg-biophilic-earth/10 text-biophilic-earth">
                      🎤
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-biophilic-leaf/10">
                    <div className="p-6 rounded-full bg-biophilic-leaf/20 text-biophilic-leaf">
                      📝
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Modal for viewing selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">{selectedItem.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              {selectedItem.type === 'image' ? (
                <img 
                  src={selectedItem.content} 
                  alt={selectedItem.title}
                  className="max-w-full max-h-[60vh] mx-auto"
                />
              ) : selectedItem.type === 'voice' ? (
                <div className="text-center">
                  <audio controls className="w-full mb-4">
                    <source src={selectedItem.content} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-muted-foreground text-sm">
                    Recorded on {new Date(selectedItem.createdAt).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p>{selectedItem.content}</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex justify-end">
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGallery;
