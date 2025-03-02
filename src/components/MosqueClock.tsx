import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar as CalendarIcon, Moon, MapPin } from "lucide-react";
import { getPrayerTimes, PrayerTime as PrayerTimeType } from "./PrayerTimesAPI";
import CitySelector from "./CitySelector";
import IslamicCalendar from "./IslamicCalendar";

interface MosqueClockProps {
  initialCity?: string;
  scrollingMessages?: string[];
}

export default function MosqueClock({
  initialCity = "Paris",
  scrollingMessages = [
    "Bienvenue à la mosquée",
    "Rappel: Cours de Coran après la prière d'Asr",
    "Vendredi: Khutbah à 13h30",
    "Ramadan commence le 10 mars",
  ],
}: MosqueClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMessage, setCurrentMessage] = useState(0);
  const [city, setCity] = useState(initialCity);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeType[]>([]);
  const [islamicDate, setIslamicDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Load prayer times for the selected city
  useEffect(() => {
    const loadPrayerTimes = async () => {
      setLoading(true);
      try {
        const data = await getPrayerTimes(city);
        setPrayerTimes(data.prayerTimes);
        setIslamicDate(data.islamicDate);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load prayer times:", error);
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, [city]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Rotate through scrolling messages
  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % scrollingMessages.length);
    }, 5000);

    return () => clearInterval(messageTimer);
  }, [scrollingMessages.length]);

  // Get next prayer time
  const getNextPrayer = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    for (const prayer of prayerTimes) {
      const [prayerHour, prayerMinute] = prayer.time.split(":").map(Number);
      const prayerTimeInMinutes = prayerHour * 60 + prayerMinute;

      if (prayerTimeInMinutes > currentTimeInMinutes) {
        return prayer;
      }
    }

    // If all prayers for today have passed, return the first prayer for tomorrow
    return prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="bg-[#004d40] text-white min-h-screen p-4 flex flex-col items-center">
      {/* Decorative mosque dome */}
      <div className="w-32 h-16 bg-[#ffd700] rounded-t-full mb-2 relative">
        <div className="absolute top-[-20px] left-[50%] transform translate-x-[-50%] w-8 h-8 bg-[#ffd700] rounded-full"></div>
      </div>

      {/* Main clock card */}
      <Card className="w-full max-w-3xl bg-[#00796b] text-white border-[#ffd700] border-2 rounded-2xl overflow-hidden">
        <CardHeader className="bg-[#004d40] border-b border-[#ffd700] text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-6 w-6 text-[#ffd700]" />
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#ffd700]">
              {city}
            </CardTitle>
          </div>
          <p className="text-lg">
            {currentTime.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-lg mt-1">{islamicDate}</p>

          {/* City selector */}
          <div className="mt-4">
            <CitySelector currentCity={city} onCityChange={setCity} />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Digital clock */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-8 w-8 text-[#ffd700]" />
              <h2 className="text-4xl md:text-5xl font-bold">
                {currentTime.toLocaleTimeString("fr-FR")}
              </h2>
            </div>
          </div>

          {/* Prayer times */}
          <div className="bg-[#004d40] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="h-6 w-6 text-[#ffd700]" />
              <h3 className="text-xl font-bold text-[#ffd700]">
                Heures de Prière
              </h3>
            </div>

            {loading ? (
              <div className="text-center p-4">
                Chargement des horaires de prière...
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {prayerTimes.map((prayer) => (
                  <div
                    key={prayer.name}
                    className={`text-center p-2 rounded-lg ${nextPrayer?.name === prayer.name ? "bg-[#ffd700] text-[#004d40]" : "bg-[#00695c]"}`}
                  >
                    <p className="font-bold">{prayer.name}</p>
                    <p className="text-sm">{prayer.arabicName}</p>
                    <p className="text-lg font-bold">{prayer.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendar section */}
          <div className="bg-[#004d40] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CalendarIcon className="h-6 w-6 text-[#ffd700]" />
              <h3 className="text-xl font-bold text-[#ffd700]">Calendrier</h3>
            </div>
            <div className="flex justify-center">
              <IslamicCalendar currentIslamicDate={islamicDate} />
            </div>
          </div>

          {/* Scrolling message */}
          <div className="bg-[#004d40] rounded-xl p-4 overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              <p className="text-lg font-bold text-[#ffd700] animate-pulse">
                {scrollingMessages[currentMessage]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
