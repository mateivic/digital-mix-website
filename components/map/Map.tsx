'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

export interface Location {
  id: number;
  number: number;
  position: [number, number];
  name: string;
}

const numberedIcon =(number: number) => (
  L.divIcon({
    className: 'custom-marker-pin', // Klasa koju smo definirali u CSS-u
    html: `<div>${number}</div>`, // Ovdje ubacujemo varijablu!
    iconAnchor: [15, 15], // Točka sidrenja (polovica veličine da bude centrirano)
    popupAnchor: [0, -15] // Gdje se otvara popup u odnosu na marker
}));

const FitBounds = ({ markers }: { markers: { position: [number, number] }[] }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      // 1. Izvuci samo koordinate iz svojih podataka
      const points = markers.map((marker) => marker.position);
      
      // 2. Kreiraj "okvir" (bounds) koji obuhvaća sve te točke
      const bounds = L.latLngBounds(points);
      
      // 3. Naredi mapi da se zumira i centrira na taj okvir
      map.fitBounds(bounds, {
        padding: [50, 50], // Dodaje malo "zraka" oko rubova (50px) da markeri nisu na samom rubu ekrana
        maxZoom: 15, // Sprječava da previše zumira ako imaš samo jednu točku
        animate: true // Lijepa animacija
      });
    }
  }, [map, markers]);

  return null; // Ova komponenta ne renderira ništa vizualno
};

const Map = ({ locations }: { locations: Location[] }) => {
  // Koordinate (npr. Zagreb)
  const position: [number, number] = [45.8150, 15.9819];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={false} 
      style={{ height: "100%", width: "100%" }} // OBAVEZNO: Mapi treba visina!
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds markers={locations.map((loc) => ({ position: loc.position }))} />
      {locations.map((loc) => (
        <Marker 
          key={loc.id} 
          position={loc.position} 
          icon={numberedIcon(loc.number)} // Pozivamo funkciju s varijablom
        >
          <Popup>
            <strong>{loc.name}</strong> <br />
            Broj projekata: {loc.number}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;