import { PlaceType } from "@/hooks/useAuth";
interface MarkerProps {
  place: PlaceType;
}

export function PlaceCard ({ place }: MarkerProps) {

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