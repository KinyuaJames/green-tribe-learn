
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';

// Fix for default marker icons in Leaflet with React
// This is needed because the default icons don't load properly in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Interface for tribe data
interface Tribe {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  country: string;
  description: string;
  architecturalFeatures: string[];
  materials: string[];
  spiritualSignificance?: string;
  imageUrl?: string;
  sustainablePractices?: string[];
}

// Sample tribe data
const tribes: Tribe[] = [
  {
    id: 'ndebele',
    name: 'Ndebele',
    location: { lat: -25.8, lng: 29.2 },
    country: 'South Africa',
    description: 'The Ndebele people are known for their distinctive and colorful geometric patterns used in their architecture and art.',
    architecturalFeatures: [
      'Geometric painted patterns',
      'Symmetrical designs',
      'Courtyard layout'
    ],
    materials: [
      'Clay',
      'Cow dung',
      'Natural pigments'
    ],
    spiritualSignificance: 'The colorful patterns and designs carry symbolic meanings related to family history, prayers, and communication with ancestors.',
    imageUrl: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
    sustainablePractices: [
      'Natural cooling through thick walls',
      'Local material sourcing',
      'Passive ventilation systems'
    ]
  },
  {
    id: 'dogon',
    name: 'Dogon',
    location: { lat: 14.5, lng: -3.5 },
    country: 'Mali',
    description: 'The Dogon people build their homes into the Bandiagara Escarpment, creating a unique cliff-dwelling architecture.',
    architecturalFeatures: [
      'Cliff-integrated structures',
      'Granaries with conical thatched roofs',
      'Toguna (meeting places) with thick wooden pillars'
    ],
    materials: [
      'Mud brick',
      'Stone',
      'Wood',
      'Thatch'
    ],
    spiritualSignificance: 'Architecture reflects cosmic beliefs, with home layouts representing the human body and the universe.',
    imageUrl: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
  },
  {
    id: 'zulu',
    name: 'Zulu',
    location: { lat: -28.8, lng: 31.5 },
    country: 'South Africa',
    description: 'The Zulu people create beehive-shaped dwellings known as "indlu" arranged in circular homesteads.',
    architecturalFeatures: [
      'Domed "beehive" structures',
      'Circular layout of homesteads',
      'Central cattle enclosure'
    ],
    materials: [
      'Flexible saplings',
      'Grass thatching',
      'Woven grass mats'
    ],
    imageUrl: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
  },
  {
    id: 'maasai',
    name: 'Maasai',
    location: { lat: -3.2, lng: 37.5 },
    country: 'Kenya/Tanzania',
    description: 'The Maasai build enkang - circular compounds enclosed by acacia thorn bushes, with small homes made by women.',
    architecturalFeatures: [
      'Circular layout of villages',
      'Low, small dwellings',
      'Protective thorn bush fencing'
    ],
    materials: [
      'Wooden frames',
      'Mixture of mud, sticks, grass',
      'Cow dung and urine (as waterproofing)'
    ],
    imageUrl: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
  },
  {
    id: 'ashanti',
    name: 'Ashanti',
    location: { lat: 6.7, lng: -1.6 },
    country: 'Ghana',
    description: 'Traditional Ashanti buildings feature rectangular designs with steep thatch roofs and intricate symbolic decorations.',
    architecturalFeatures: [
      'Rectangular floor plans',
      'Steep four-sided roofs',
      'Central courtyard layouts',
      'Carved wooden decoration'
    ],
    materials: [
      'Wood frame',
      'Wattle and daub walls',
      'Palm frond or grass thatch'
    ],
    imageUrl: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
  }
];

const InteractiveMap: React.FC = () => {
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const handleMarkerClick = (tribe: Tribe) => {
    setSheetOpen(true);
    setSelectedTribe(tribe);
  };

  // Center position for the map
  const center: [number, number] = [4.0, 19.0]; // Center on Africa
  
  return (
    <div className="relative w-full min-h-[70vh] bg-muted/20">
      {/* Map Container */}
      <div className="w-full h-[70vh] rounded-lg shadow-lg overflow-hidden">
        <MapContainer 
          center={center} 
          zoom={2.5} 
          style={{ height: '100%', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {tribes.map((tribe) => (
            <Marker 
              key={tribe.id}
              position={[tribe.location.lat, tribe.location.lng]}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(tribe);
                },
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{tribe.name}</h3>
                  <p className="text-xs text-muted-foreground">{tribe.country}</p>
                  <Button 
                    variant="link" 
                    size="sm"
                    className="p-0 h-auto text-xs mt-1"
                    onClick={() => {
                      handleMarkerClick(tribe);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Tribe Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          {selectedTribe && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl text-biophilic-earth">{selectedTribe.name}</SheetTitle>
                <SheetDescription className="text-base text-foreground">{selectedTribe.country}</SheetDescription>
              </SheetHeader>
              
              <div className="mt-6">
                <div className="mb-6 rounded-lg overflow-hidden">
                  {selectedTribe.imageUrl && (
                    <img 
                      src={selectedTribe.imageUrl} 
                      alt={`${selectedTribe.name} architecture`}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-foreground/80">{selectedTribe.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Architectural Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTribe.architecturalFeatures.map((feature, i) => (
                        <li key={i} className="text-foreground/80">{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Building Materials</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTribe.materials.map((material, i) => (
                        <li key={i} className="text-foreground/80">{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedTribe.spiritualSignificance && (
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Spiritual Significance</h3>
                      <p className="text-foreground/80">{selectedTribe.spiritualSignificance}</p>
                    </div>
                  )}
                  
                  {selectedTribe.sustainablePractices && (
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-biophilic-earth">Sustainable Practices</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedTribe.sustainablePractices.map((practice, i) => (
                          <li key={i} className="text-foreground/80">{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InteractiveMap;
