import dynamic from 'next/dynamic';
import { Location } from './Map';

// Dinamički import isključuje SSR za ovu komponentu
const MapWithNoSSR = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <p>Učitavam mapu...</p>, // Prikazuje se dok se mapa ne učita
});

const MapComponent = ({ locations }: { locations: Location[] }) => {
  return (
      <div className="w-full h-[500px] border-2 border-gray-300 rounded-lg overflow-hidden">
        <MapWithNoSSR locations={locations} />
      </div>
  );
}

export default MapComponent;