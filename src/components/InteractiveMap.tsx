
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ImageWithFallback from './ImageWithFallback';

// Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiamlta20iLCJhIjoiY21hZTloMDE3MDR5ZTJxczU5b2Y2Z2QwNSJ9.e_f21CLkuIeY6fLQ4fuSkA';

// Tribal design data
const tribalDesigns = [
  {
    id: 'dogon',
    name: 'Dogon',
    location: [3.5, 13.9] as [number, number], // Mali
    country: 'Mali',
    description: 'The Dogon people are known for their stone and mud architecture, including cliff dwellings, granaries with thatched roofs, and meetinghouses with intricately carved wooden doors and posts.',
    materials: ['Clay', 'Stone', 'Thatch'],
    practices: ['Cliff-side construction', 'Toguna (meeting places)', 'Symbolic layout'],
    images: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216',
      'https://images.unsplash.com/photo-1495562569060-2eec283d3391',
      'https://images.unsplash.com/photo-1497106636505-4f8520681cb5'
    ]
  },
  {
    id: 'ndebele',
    name: 'Ndebele',
    location: [29.4, -25.8], // South Africa
    country: 'South Africa',
    description: 'The Ndebele people create vivid geometric patterns on their homes, using bright colors derived from natural pigments. These designs are not only decorative but also communicate cultural identity and social status.',
    materials: ['Natural pigments', 'Clay', 'Adobe'],
    practices: ['Geometric painting', 'Symbolic patterns', 'Beadwork integration'],
    images: [
      'https://images.unsplash.com/photo-1612196808214-b40db0fb3d0b',
      'https://images.unsplash.com/photo-1518709911915-712d5fd04677',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856'
    ]
  },
  {
    id: 'zulu',
    name: 'Zulu',
    location: [31.5, -28.5], // South Africa, Lesotho
    country: 'South Africa',
    description: 'The Zulu people build domed structures (indlu) made from a framework of poles covered with thatch or grass mats. Their settlements (umuzi) are typically circular in layout with a central cattle kraal.',
    materials: ['Grass', 'Reeds', 'Wood'],
    practices: ['Dome construction', 'Circular settlement layout', 'Cattle kraal integration'],
    images: [
      'https://images.unsplash.com/photo-1484318571209-661cf29a69c3',
      'https://images.unsplash.com/photo-1528109966604-5a6a3a567e89',
      'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5'
    ]
  },
  {
    id: 'maasai',
    name: 'Maasai',
    location: [36.8, -1.3], // Kenya, Tanzania
    country: 'Kenya & Tanzania',
    description: 'The Maasai build homes (inkajijik) using a frame of timber poles interwoven with a lattice of smaller branches, which is then plastered with a mix of mud, grass, cow dung, and ash.',
    materials: ['Wood frame', 'Cow dung', 'Clay', 'Ash'],
    practices: ['Circular layout', 'Practical construction', 'Natural insulation'],
    images: [
      'https://images.unsplash.com/photo-1489493887464-892be6d1daae',
      'https://images.unsplash.com/photo-1524778880162-1b5ddf91c3ae',
      'https://images.unsplash.com/photo-1504432842032-3361de0fcb69'
    ]
  },
  {
    id: 'ashanti',
    name: 'Ashanti',
    location: [-1.6, 6.7], // Ghana
    country: 'Ghana',
    description: 'The Ashanti people are known for their rectangular structures with steep thatched roofs. Traditional buildings feature intricate geometric designs and are built using a timber frame with mud filling.',
    materials: ['Timber frame', 'Clay', 'Thatch'],
    practices: ['Courtyard design', 'Intricate relief patterns', 'Symbolic motifs'],
    images: [
      'https://images.unsplash.com/photo-1603203040743-24aced9d6c78',
      'https://images.unsplash.com/photo-1604918108792-bb5cf51b8ea3',
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0'
    ]
  },
  {
    id: 'somali',
    name: 'Somali',
    location: [45.3, 2.0], // Somalia
    country: 'Somalia',
    description: 'The Somali nomadic hut (aqal) is a portable dome-shaped structure made with bent saplings covered with woven mats, grass, or hides. These structures can be dismantled and reassembled quickly as needed.',
    materials: ['Bent saplings', 'Woven mats', 'Animal hides', 'Grass'],
    practices: ['Portable architecture', 'Dome structure', 'Natural ventilation'],
    images: [
      'https://images.unsplash.com/photo-1590422749897-47726da9fa7d',
      'https://images.unsplash.com/photo-1531219572328-a0171b4448a3',
      'https://images.unsplash.com/photo-1600596863672-56a0e15371a9'
    ]
  },
  {
    id: 'nubian',
    name: 'Nubian',
    location: [32.9, 22.0], // Egypt, Sudan
    country: 'Egypt & Sudan',
    description: 'Nubian architecture is characterized by colorful geometric patterns on house facades and distinctive vault designs. Traditionally built using mud brick, these structures remain cool in hot climates.',
    materials: ['Mud brick', 'Natural pigments', 'Palm wood'],
    practices: ['Vault construction', 'Geometric facades', 'Climate adaptation'],
    images: [
      'https://images.unsplash.com/photo-1601823984263-b87b59798b70',
      'https://images.unsplash.com/photo-1529313052929-fd9ca394b378',
      'https://images.unsplash.com/photo-1586191582151-f73872dfd183'
    ]
  },
  {
    id: 'berber',
    name: 'Berber',
    location: [-5.8, 31.8], // Morocco, Algeria
    country: 'Morocco & Algeria',
    description: 'The Berber people build earthen structures that blend into the landscape. Their homes often include flat roofs for sleeping in hot summer months and small windows for climate control.',
    materials: ['Rammed earth', 'Stone', 'Clay'],
    practices: ['Terraced construction', 'Climate adaptation', 'Communal spaces'],
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada',
      'https://images.unsplash.com/photo-1548013155-f59ffba33b92',
      'https://images.unsplash.com/photo-1531761535209-180857b5464f'
    ]
  }
];

interface InteractiveMapProps {
  mapboxToken?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedTribe, setSelectedTribe] = useState<typeof tribalDesigns[0] | null>(null);
  const [isMapTokenDialogOpen, setIsMapTokenDialogOpen] = useState<boolean>(false);
  const [userMapToken, setUserMapToken] = useState<string>(mapboxToken || '');
  const [activeMapToken, setActiveMapToken] = useState<string>(mapboxToken || MAPBOX_TOKEN);
  
  // Initialize map when container is available and token is set
  useEffect(() => {
    if (mapContainer.current && activeMapToken) {
      mapboxgl.accessToken = activeMapToken;
      
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [19.0, 4.0], // Center on Africa
          zoom: 2.5,
          projection: 'globe'
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add atmosphere and terrain
        map.current.on('style.load', () => {
          map.current?.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });
        });

        // Add markers for each tribal design
        tribalDesigns.forEach(tribe => {
          const marker = document.createElement('div');
          marker.className = 'cursor-pointer w-6 h-6 rounded-full bg-biophilic-earth border-2 border-white flex items-center justify-center text-white hover:bg-biophilic-clay transition-colors';
          
          // Create a new marker with the coordinates as a tuple to satisfy TypeScript
          new mapboxgl.Marker(marker)
            .setLngLat([tribe.location[0], tribe.location[1]] as [number, number])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<strong>${tribe.name}</strong><br>${tribe.country}`)
            )
            .addTo(map.current!);
            
          // Add click listener to the marker
          marker.addEventListener('click', () => {
            setSelectedTribe(tribe);
          });
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        // Reset token if there's an error
        setIsMapTokenDialogOpen(true);
      }
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [activeMapToken]);
  
  // Handle token submission from dialog (rarely needed since we now have a default token)
  const handleTokenSubmit = () => {
    if (userMapToken) {
      setActiveMapToken(userMapToken);
      setIsMapTokenDialogOpen(false);
    }
  };
  
  return (
    <div className="relative w-full min-h-[70vh] bg-muted/20">
      {/* Map Token Dialog - only shown if there's an issue with the default token */}
      <Dialog open={isMapTokenDialogOpen} onOpenChange={setIsMapTokenDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mapbox API Token Required</DialogTitle>
            <DialogDescription>
              Please enter your Mapbox public token to enable the interactive map.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can find this in your Mapbox account dashboard.
            </p>
            <input
              type="text"
              value={userMapToken}
              onChange={(e) => setUserMapToken(e.target.value)}
              placeholder="Enter your Mapbox token"
              className="w-full px-3 py-2 border rounded-md"
            />
            <Button onClick={handleTokenSubmit} className="w-full">
              Apply Token
            </Button>
            <p className="text-xs text-muted-foreground">
              Visit <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                mapbox.com
              </a> to create an account and get your free token.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-[70vh] rounded-lg shadow-lg"
        style={{ display: activeMapToken ? 'block' : 'none' }}
      />
      
      {/* No Token Warning - unlikely to be shown now */}
      {!activeMapToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 rounded-lg">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4 text-center">
              <h3 className="text-lg font-medium">Map Requires API Token</h3>
              <p className="text-sm text-muted-foreground">
                Please provide a Mapbox token to view the interactive map.
              </p>
              <Button onClick={() => setIsMapTokenDialogOpen(true)}>
                Enter API Token
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Selected Tribe Information */}
      {selectedTribe && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedTribe(null)}>
          <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-biophilic-earth">{selectedTribe.name} Design</h2>
                  <p className="text-muted-foreground">{selectedTribe.country}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTribe(null)}>
                  ✕
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="aspect-video overflow-hidden rounded-lg mb-6">
                  <ImageWithFallback
                    src={selectedTribe.images[0]}
                    fallbackSrc1={selectedTribe.images[1]}
                    fallbackSrc2={selectedTribe.images[2]}
                    alt={`${selectedTribe.name} architecture`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-foreground/80 mb-6">
                  <p>{selectedTribe.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Materials</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTribe.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Practices</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTribe.practices.map((practice, idx) => (
                        <li key={idx}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-biophilic-earth">Gallery</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedTribe.images.map((image, idx) => (
                      <div key={idx} className="aspect-square rounded-md overflow-hidden">
                        <ImageWithFallback
                          src={image}
                          alt={`${selectedTribe.name} architecture example ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
