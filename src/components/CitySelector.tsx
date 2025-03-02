import { useState, useEffect } from "react";
import { getAvailableCities } from "./PrayerTimesAPI";
import { Button } from "@/components/ui/button";

interface CitySelectorProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

export default function CitySelector({
  currentCity = "Paris",
  onCityChange,
}: CitySelectorProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const availableCities = await getAvailableCities();
        setCities(availableCities);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load cities:", error);
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) {
    return <div className="text-center p-2">Chargement des villes...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 p-2">
      {cities.map((city) => (
        <Button
          key={city}
          variant={city === currentCity ? "default" : "outline"}
          className={
            city === currentCity
              ? "bg-[#ffd700] text-[#004d40] hover:bg-[#ffd700]/90"
              : "bg-[#00695c] text-white border-[#ffd700] hover:bg-[#ffd700] hover:text-[#004d40]"
          }
          onClick={() => onCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
}
