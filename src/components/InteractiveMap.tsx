
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from './ImageWithFallback';

// Hardcoded Mapbox token - in production, this should be in an environment variable
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiamlta20iLCJhIjoiY21hZTloMDE3MDR5ZTJxczU5b2Y2Z2QwNSJ9.e_f21CLkuIeY6fLQ4fuSkA';

// Tribal design data with updated image URLs
const tribalDesigns = [
  {
    id: 'dogon',
    name: 'Dogon',
    location: [3.5, 13.9],
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
    location: [29.4, -25.8],
    country: 'South Africa',
    description: 'The Ndebele people create vivid geometric patterns on their homes, using bright colors derived from natural pigments. These designs are not only decorative but also communicate cultural identity and social status.',
    materials: ['Natural pigments', 'Clay', 'Adobe'],
    practices: ['Geometric painting', 'Symbolic patterns', 'Beadwork integration'],
    images: [
      'https://images.unsplash.com/photo-1541972082277-0f5df35bb58a',
      'https://images.unsplash.com/photo-1536590158209-dd9755229bbe',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856'
    ]
  },
  {
    id: 'zulu',
    name: 'Zulu',
    location: [31.5, -28.5],
    country: 'South Africa',
    description: 'The Zulu people build domed structures (indlu) made from a framework of poles covered with thatch or grass mats. Their settlements (umuzi) are typically circular in layout with a central cattle kraal.',
    materials: ['Grass', 'Reeds', 'Wood'],
    practices: ['Dome construction', 'Circular settlement layout', 'Cattle kraal integration'],
    images: [
      'https://images.unsplash.com/photo-1562733881-b06bfa74e807',
      'https://images.unsplash.com/photo-1575999502951-4ab25b5ca889',
      'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5'
    ]
  },
  {
    id: 'maasai',
    name: 'Maasai',
    location: [36.8, -1.3],
    country: 'Kenya & Tanzania',
    description: 'The Maasai build homes (inkajijik) using a frame of timber poles interwoven with a lattice of smaller branches, which is then plastered with a mix of mud, grass, cow dung, and ash.',
    materials: ['Wood frame', 'Cow dung', 'Clay', 'Ash'],
    practices: ['Circular layout', 'Practical construction', 'Natural insulation'],
    images: [
      'https://images.unsplash.com/photo-1604840633086-3a92662c8f84',
      'https://images.unsplash.com/photo-1596470377364-8e604346e1b4',
      'https://images.unsplash.com/photo-1504432842032-3361de0fcb69'
    ]
  },
  {
    id: 'ashanti',
    name: 'Ashanti',
    location: [-1.6, 6.7],
    country: 'Ghana',
    description: 'The Ashanti people are known for their rectangular structures with steep thatched roofs. Traditional buildings feature intricate geometric designs and are built using a timber frame with mud filling.',
    materials: ['Timber frame', 'Clay', 'Thatch'],
    practices: ['Courtyard design', 'Intricate relief patterns', 'Symbolic motifs'],
    images: [
      'https://images.unsplash.com/photo-1578761617597-5e8082f68be1',
      'https://images.unsplash.com/photo-1598018553943-5650d5c0b82f',
      'https://images.unsplash.com/photo-1547480053-7d174f67b557'
    ]
  },
  {
    id: 'somali',
    name: 'Somali',
    location: [45.3, 2.0],
    country: 'Somalia',
    description: 'The Somali nomadic hut (aqal) is a portable dome-shaped structure made with bent saplings covered with woven mats, grass, or hides. These structures can be dismantled and reassembled quickly as needed.',
    materials: ['Bent saplings', 'Woven mats', 'Animal hides', 'Grass'],
    practices: ['Portable architecture', 'Dome structure', 'Natural ventilation'],
    images: [
      'https://images.unsplash.com/photo-1563889958749-625da26ed355',
      'https://images.unsplash.com/photo-1590422749897-47726da9fa7d',
      'https://images.unsplash.com/photo-1531219572328-a0171b4448a3'
    ]
  },
  {
    id: 'nubian',
    name: 'Nubian',
    location: [32.9, 22.0],
    country: 'Egypt & Sudan',
    description: 'Nubian architecture is characterized by colorful geometric patterns on house facades and distinctive vault designs. Traditionally built using mud brick, these structures remain cool in hot climates.',
    materials: ['Mud brick', 'Natural pigments', 'Palm wood'],
    practices: ['Vault construction', 'Geometric facades', 'Climate adaptation'],
    images: [
      'https://images.unsplash.com/photo-1583248127512-c7a73206249c',
      'https://images.unsplash.com/photo-1529313052929-fd9ca394b378',
      'https://images.unsplash.com/photo-1548248823-ce16a73b6d49'
    ]
  },
  {
    id: 'berber',
    name: 'Berber',
    location: [-5.8, 31.8],
    country: 'Morocco & Algeria',
    description: 'The Berber people build earthen structures that blend into the landscape. Their homes often include flat roofs for sleeping in hot summer months and small windows for climate control.',
    materials: ['Rammed earth', 'Stone', 'Clay'],
    practices: ['Terraced construction', 'Climate adaptation', 'Communal spaces'],
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada',
      'https://images.unsplash.com/photo-1604169359756-3296e4137194',
      'https://images.unsplash.com/photo-1531761535209-180857b5464f'
    ]
  }
];

const InteractiveMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedTribe, setSelectedTribe] = useState<typeof tribalDesigns[0] | null>(null);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Initialize map when container is available
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      try {
        console.log("Initializing Mapbox map with token...");
        
        // Set the access token directly
        mapboxgl.accessToken = MAPBOX_TOKEN;
        
        // Create new map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [19.0, 4.0], // Center on Africa
          zoom: 2.5,
          projection: 'mercator' // Use mercator instead of globe for better compatibility
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add markers when map loads
        map.current.on('load', () => {
          console.log("Map loaded successfully");
          setMapReady(true);
          
          if (map.current) {
            // Add markers for each tribal design
            tribalDesigns.forEach(tribe => {
              // Create marker element
              const marker = document.createElement('div');
              marker.className = 'cursor-pointer w-6 h-6 rounded-full bg-biophilic-earth border-2 border-white flex items-center justify-center text-white hover:bg-biophilic-clay transition-colors';
              
              // Create a new marker
              new mapboxgl.Marker(marker)
                .setLngLat(tribe.location)
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
          }
        });

        // Handle map errors
        map.current.on('error', (e) => {
          console.error("Map error:", e);
          setMapError("Failed to initialize map. Please check your connection and try again.");
        });
        
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize map. Please check your connection and try again.");
      }
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  return (
    <div className="relative w-full min-h-[70vh] bg-muted/20">
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-[70vh] rounded-lg shadow-lg"
        style={{ opacity: mapReady ? 1 : 0.7 }} // Visual indication that map is loading
      />
      
      {/* Loading indicator */}
      {!mapReady && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-biophilic-earth border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 p-8 rounded-lg shadow-lg text-center max-w-md">
            <p className="text-red-500 mb-4">{mapError}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      )}
      
      {/* Selected Tribe Information */}
      {selectedTribe && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedTribe(null)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <div 
            className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-up" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-biophilic-earth">{selectedTribe.name} Design</h2>
                  <p className="text-muted-foreground">{selectedTribe.country}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTribe(null)} className="transition-transform hover:scale-110">
                  ✕
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="aspect-video overflow-hidden rounded-lg mb-6">
                  <ImageWithFallback
                    src={selectedTribe.images[0]}
                    fallbackSrc1={selectedTribe.images[1]}
                    fallbackSrc2={selectedTribe.images[2]}
                    defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
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
                          defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
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
