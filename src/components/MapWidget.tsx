import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Location {
  latitude: number;
  longitude: number;
  label: string;
  activity: number;
}

interface MapWidgetProps {
  data: {
    dashboardData: {
      map: {
        locations: Location[];
      };
    };
  };
  className?: string;
}

type MapStyle = 'style1' | 'style2' | 'style3';

const offsetLocation = (location: Location, index: number) => {
  const offsetFactor = 0.0002; // Adjust this factor as needed
  return {
    latitude: location.latitude + index * offsetFactor,
    longitude: location.longitude + index * offsetFactor,
  };
};

const MapWidget: React.FC<MapWidgetProps> = ({ data, className }) => {
  const [isClient, setIsClient] = useState(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>('style1');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://img.freepik.com/free-vector/location_53876-25530.jpg?size=626&ext=jpg',
        iconUrl: 'https://img.freepik.com/free-vector/location_53876-25530.jpg?size=626&ext=jpg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'leaflet/dist/images/marker-shadow.png',
        shadowSize: [21, 21],
      });
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const locations = data.dashboardData.map.locations;

  return (
    <div className={`bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl rounded-xl p-8 ${className}`}>
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Activity Map</h2>

      <div className="flex justify-center mb-6">
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 ${
            mapStyle === 'style1' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-600 text-gray-300 hover:bg-blue-700 hover:text-white'
          }`}
          onClick={() => setMapStyle('style1')}
        >
          Style 1
        </button>
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 ${
            mapStyle === 'style2' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-600 text-gray-300 hover:bg-green-700 hover:text-white'
          }`}
          onClick={() => setMapStyle('style2')}
        >
          Style 2
        </button>
        <button
          className={`px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 ${
            mapStyle === 'style3' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-600 text-gray-300 hover:bg-red-700 hover:text-white'
          }`}
          onClick={() => setMapStyle('style3')}
        >
          Style 3
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border-4 border-gray-700">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url={
              mapStyle === 'style1'
                ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
                : mapStyle === 'style2'
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
                : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            }
          />
          {locations.map((location, index) => {
            const adjustedLocation = offsetLocation(location, index);
            return (
              <Marker
                key={index}
                position={[adjustedLocation.latitude, adjustedLocation.longitude]}
              >
                <Popup>
                  <div style={{ color: '#000000', backgroundColor: '#ffffff', padding: '5px', borderRadius: '5px' }}>
                    <strong>{location.label}</strong>
                    <br />
                    Activity: <span style={{ color: '#00ff00' }}>{location.activity}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapWidget;
