
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ImageWithFallback from './ImageWithFallback';
import L from 'leaflet';

// Fix default marker icon issue in React Leaflet
// This is needed because the default icons from leaflet can't be loaded in many build setups
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Tribal design data with updated image URLs
const tribalDesigns = [
  {
    id: 'dogon',
    name: 'Dogon',
    location: [13.9, 3.5] as [number, number], // Note: Leaflet uses [lat, lng] format, opposite of Mapbox
    country: 'Mali',
    description: 'The Dogon people are known for their stone and mud architecture, including cliff dwellings, granaries with thatched roofs, and meetinghouses with intricately carved wooden doors and posts.',
    materials: ['Clay', 'Stone', 'Thatch'],
    practices: ['Cliff-side construction', 'Toguna (meeting places)', 'Symbolic layout'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'ndebele',
    name: 'Ndebele',
    location: [-25.8, 29.4] as [number, number],
    country: 'South Africa',
    description: 'The Ndebele people create vivid geometric patterns on their homes, using bright colors derived from natural pigments. These designs are not only decorative but also communicate cultural identity and social status.',
    materials: ['Natural pigments', 'Clay', 'Adobe'],
    practices: ['Geometric painting', 'Symbolic patterns', 'Beadwork integration'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'zulu',
    name: 'Zulu',
    location: [-28.5, 31.5] as [number, number],
    country: 'South Africa',
    description: 'The Zulu people build domed structures (indlu) made from a framework of poles covered with thatch or grass mats. Their settlements (umuzi) are typically circular in layout with a central cattle kraal.',
    materials: ['Grass', 'Reeds', 'Wood'],
    practices: ['Dome construction', 'Circular settlement layout', 'Cattle kraal integration'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'maasai',
    name: 'Maasai',
    location: [-1.3, 36.8] as [number, number],
    country: 'Kenya & Tanzania',
    description: 'The Maasai build homes (inkajijik) using a frame of timber poles interwoven with a lattice of smaller branches, which is then plastered with a mix of mud, grass, cow dung, and ash.',
    materials: ['Wood frame', 'Cow dung', 'Clay', 'Ash'],
    practices: ['Circular layout', 'Practical construction', 'Natural insulation'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'ashanti',
    name: 'Ashanti',
    location: [6.7, -1.6] as [number, number],
    country: 'Ghana',
    description: 'The Ashanti people are known for their rectangular structures with steep thatched roofs. Traditional buildings feature intricate geometric designs and are built using a timber frame with mud filling.',
    materials: ['Timber frame', 'Clay', 'Thatch'],
    practices: ['Courtyard design', 'Intricate relief patterns', 'Symbolic motifs'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'somali',
    name: 'Somali',
    location: [2.0, 45.3] as [number, number],
    country: 'Somalia',
    description: 'The Somali nomadic hut (aqal) is a portable dome-shaped structure made with bent saplings covered with woven mats, grass, or hides. These structures can be dismantled and reassembled quickly as needed.',
    materials: ['Bent saplings', 'Woven mats', 'Animal hides', 'Grass'],
    practices: ['Portable architecture', 'Dome structure', 'Natural ventilation'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'nubian',
    name: 'Nubian',
    location: [22.0, 32.9] as [number, number],
    country: 'Egypt & Sudan',
    description: 'Nubian architecture is characterized by colorful geometric patterns on house facades and distinctive vault designs. Traditionally built using mud brick, these structures remain cool in hot climates.',
    materials: ['Mud brick', 'Natural pigments', 'Palm wood'],
    practices: ['Vault construction', 'Geometric facades', 'Climate adaptation'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  },
  {
    id: 'berber',
    name: 'Berber',
    location: [31.8, -5.8] as [number, number],
    country: 'Morocco & Algeria',
    description: 'The Berber people build earthen structures that blend into the landscape. Their homes often include flat roofs for sleeping in hot summer months and small windows for climate control.',
    materials: ['Rammed earth', 'Stone', 'Clay'],
    practices: ['Terraced construction', 'Climate adaptation', 'Communal spaces'],
    images: [
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
      '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    ]
  }
];

const InteractiveMap: React.FC = () => {
  const [selectedTribe, setSelectedTribe] = useState<typeof tribalDesigns[0] | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const handleMarkerClick = (tribe: typeof tribalDesigns[0]) => {
    setSelectedTribe(tribe);
  };

  // Center position for the map
  const defaultCenter: [number, number] = [4.0, 19.0]; // Center on Africa
  
  return (
    <div className="relative w-full min-h-[70vh] bg-muted/20">
      {/* Map Container */}
      <div className="w-full h-[70vh] rounded-lg shadow-lg overflow-hidden">
        <MapContainer 
          defaultCenter={defaultCenter}
          zoom={2.5} 
          style={{ height: '100%', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Markers for each tribal location */}
          {tribalDesigns.map((tribe) => (
            <Marker 
              key={tribe.id} 
              position={tribe.location}
              eventHandlers={{
                click: () => handleMarkerClick(tribe),
              }}
            >
              <Popup>
                <strong>{tribe.name}</strong><br/>{tribe.country}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
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

      {/* Comment out the original Mapbox code for reference */}
      {/* 
      // Original Mapbox implementation
      useEffect(() => {
        if (mapContainer.current && !map.current) {
          try {
            console.log("Initializing Mapbox map with token...");
            mapboxgl.accessToken = MAPBOX_TOKEN;
            console.log("Mapbox token set:", mapboxgl.accessToken);
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/outdoors-v12',
              center: [19.0, 4.0],
              zoom: 2.5,
              projection: 'mercator'
            });

            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
            map.current.on('load', () => {
              setMapReady(true);
              if (map.current) {
                map.current.resize();
                tribalDesigns.forEach(tribe => {
                  try {
                    const marker = document.createElement('div');
                    marker.className = 'cursor-pointer w-6 h-6 rounded-full bg-biophilic-earth border-2 border-white flex items-center justify-center text-white hover:bg-biophilic-clay transition-colors';
                    new mapboxgl.Marker(marker)
                      .setLngLat(tribe.location)
                      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${tribe.name}</strong><br>${tribe.country}`))
                      .addTo(map.current!);
                    marker.addEventListener('click', () => {
                      setSelectedTribe(tribe);
                    });
                  } catch (err) {
                    console.error(`Error creating marker for ${tribe.name}:`, err);
                  }
                });
              }
            });
            map.current.on('error', (e) => {
              console.error("Map error:", e);
              setMapError("Failed to initialize map. Please check your connection and try again.");
            });
          } catch (error) {
            console.error("Error initializing map:", error);
            setMapError("Failed to initialize map. Please check your connection and try again.");
          }
        }
        return () => {
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        };
      }, []);
      */}
    </div>
  );
};

export default InteractiveMap;
