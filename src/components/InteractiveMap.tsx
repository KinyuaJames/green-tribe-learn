
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Indigenous design locations
const locations = [
  {
    id: 1,
    name: 'Dogon',
    position: [14.3, -3.6],
    country: 'Mali',
    description: 'The Dogon people are known for their distinctive mud brick architecture, including sacred togunas (low-ceiling meeting places) and granaries with thatched, conical roofs.',
    features: [
      'Mud brick construction',
      'Astronomically aligned villages',
      'Use of symbolic sculptures in architecture',
      'Cliff-side building techniques'
    ]
  },
  {
    id: 2,
    name: 'Ndebele',
    position: [-25.8, 29.2],
    country: 'South Africa',
    description: 'The Ndebele are renowned for their vibrant, geometric patterns painted on houses. These colorful designs evolved as a form of cultural resistance and identity preservation.',
    features: [
      'Geometric painted patterns',
      'Bright, contrasting colors',
      'Beadwork-inspired designs',
      'Symbolic cultural messaging'
    ]
  },
  {
    id: 3,
    name: 'Maasai',
    position: [-2.9, 37.5],
    country: 'Kenya & Tanzania',
    description: 'Maasai enkaji (houses) are built by women using a framework of timber poles, interwoven with a lattice of smaller branches, covered with a mixture of mud, grass, cow dung, and ash.',
    features: [
      'Circular layouts for environmental protection',
      'Natural, locally-sourced materials',
      'Low doorways for defense',
      'Central cattle enclosures'
    ]
  },
  {
    id: 4,
    name: 'Asante',
    position: [6.7, -1.6],
    country: 'Ghana',
    description: 'Traditional Ashanti architecture features shrines and palaces with intricate symbolic adinkra symbols, using a post-and-beam system with walls filled with clay and palm branches.',
    features: [
      'Carved wooden support posts',
      'Symbolic adinkra patterning',
      'Courtyard-centered designs',
      'Natural cooling ventilation techniques'
    ]
  },
  {
    id: 5,
    name: 'Nubian',
    position: [21.8, 31.3],
    country: 'Sudan & Egypt',
    description: 'Nubian architecture uses thick mudbrick walls for thermal mass. The distinctive vaulted dome roofs and geometric patterns reflect ancient design techniques for desert climate adaptation.',
    features: [
      'Vaulted dome roofs',
      'Thick thermal walls',
      'Interior courtyards for cooling',
      'White reflective exteriors'
    ]
  },
  {
    id: 6,
    name: 'Hausa',
    position: [12.0, 8.5],
    country: 'Nigeria & Niger',
    description: 'Hausa architecture includes distinctive earth and adobe buildings with elaborate facades. The architecture incorporates geometric patterns, mihrabs (prayer niches), and flat roofs with water spouts.',
    features: [
      'Adobe construction',
      'Elaborate façade decorations',
      'Tubali (dried earth) reinforcement',
      'Symbolic entrance designs'
    ]
  },
  {
    id: 7,
    name: 'Swahili',
    position: [-2.1, 40.9],
    country: 'Kenya',
    description: 'Swahili architecture along the East African coast combines African, Arab, and Indian influences. Stone buildings feature carved doors, inner courtyards, and coral rag limestone construction.',
    features: [
      'Intricately carved wooden doors',
      'Coral stone construction',
      'Ventilated inner courtyards',
      'Barazas (stone benches)'
    ]
  },
  {
    id: 8,
    name: 'Zulu',
    position: [-28.5, 31.4],
    country: 'South Africa',
    description: 'Traditional Zulu dwellings are dome-shaped structures called indlu, built using a framework of pliable branches covered with thatch and woven mats, arranged in a circular homestead.',
    features: [
      'Dome-shaped beehive huts',
      'Circular protective village layouts',
      'Natural thatch waterproofing',
      'Central cattle enclosure (isibaya)'
    ]
  },
];

// Create custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const InteractiveMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  useEffect(() => {
    if (activeLocation !== null && mapRef.current) {
      const location = locations.find(loc => loc.id === activeLocation);
      if (location) {
        mapRef.current.flyTo(location.position, 8, {
          duration: 1.5
        });
      }
    }
  }, [activeLocation]);

  const setMapRef = (map: L.Map) => {
    mapRef.current = map;
  };

  return (
    <div className="relative">
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold text-biophilic-earth mb-3">Indigenous Design Traditions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {locations.map(location => (
            <button
              key={location.id}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                activeLocation === location.id 
                  ? 'bg-biophilic-earth text-white' 
                  : 'bg-biophilic-sand/20 hover:bg-biophilic-sand/30'
              }`}
              onClick={() => setActiveLocation(location.id)}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '600px', width: '100%' }} className="rounded-lg overflow-hidden shadow-xl">
        <MapContainer 
          ref={setMapRef}
          center={[5, 20]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location) => (
            <Marker 
              key={location.id}
              position={location.position}
              eventHandlers={{
                click: () => {
                  setActiveLocation(location.id);
                }
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-semibold text-biophilic-earth">{location.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{location.country}</p>
                  <p className="text-sm mb-2">{location.description}</p>
                  <div className="text-xs">
                    <strong>Key Features:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      {location.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
