import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useAuth, PlaceType } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/mapa"
)({
  component: MapaPage,
});

const markers = [
  {
    name: "Convento da Penha",
    lat: -20.3417,
    lng: -40.2875,
  },
  {
    name: "Pedra Azul",
    lat: -20.4167,
    lng: -41.0167,
  },
];
// componente 
interface MarkerProps {
  place: PlaceType;
}

const PlaceCard = ({ place }: MarkerProps) => {

  return (
    <div>
      <h2>{place.name}</h2>

      <p>{place.city}</p>

      <img
        src={place.image_url}
        alt={place.name}
        width={200}
      />
    </div>
  );
};
//

function MapaPage() {

  const {
    get_all_places,
    busca_places
  } = useAuth();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      busca_places(token);
    }

  }, []);

  return (

    <div className="relative h-screen w-full">

      <div className="absolute top-0 left-0 right-0 z-[1000]">
        <TopBar />
      </div>

      <MapContainer
        center={[-20.3155, -40.3128]}
        zoom={9}
        className="h-full w-full z-0"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {get_all_places.map((place) => (

          <Marker
            key={place.id}
            position={[
              Number(place.latitude),
              Number(place.longitude)
            ]}
          >

            <Popup>

              <PlaceCard place={place} />

            </Popup>

          </Marker>

        ))}

      </MapContainer>

      <div className="absolute bottom-0 left-0 right-0 z-[1000]">
        <BottomNav />
      </div>

    </div>
  );
}
