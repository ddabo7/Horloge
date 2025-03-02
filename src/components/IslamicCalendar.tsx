import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IslamicCalendarProps {
  currentIslamicDate?: string;
}

export default function IslamicCalendar({
  currentIslamicDate = "15 Sha'ban 1445",
}: IslamicCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(8); // Sha'ban is month 8 in Islamic calendar
  const [currentYear, setCurrentYear] = useState(1445);

  // Islamic month names
  const islamicMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  // Days of the week
  const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Generate calendar days (simplified - in a real app you'd use a proper Hijri calendar library)
  const generateCalendarDays = () => {
    // This is a simplified example - in a real app, use a proper Hijri calendar library
    // to calculate the correct days for each Islamic month
    const daysInMonth =
      currentMonth === 9 ? 30 : currentMonth % 2 === 0 ? 29 : 30;
    const firstDayOfMonth = 3; // Assuming Wednesday as first day (would be calculated in real app)

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if a day is the current day
  const isCurrentDay = (day: number) => {
    // Extract day from currentIslamicDate (e.g., "15 Sha'ban 1445" -> 15)
    const currentDay = parseInt(currentIslamicDate.split(" ")[0]);
    const currentMonthName = currentIslamicDate.split(" ")[1];

    return (
      day === currentDay &&
      islamicMonths[currentMonth - 1] === currentMonthName &&
      currentYear === parseInt(currentIslamicDate.split(" ")[2])
    );
  };

  return (
    <Card className="w-full max-w-md bg-[#00796b] text-white border-[#ffd700] border-2 rounded-2xl overflow-hidden">
      <CardHeader className="bg-[#004d40] border-b border-[#ffd700] text-center py-4">
        <CardTitle className="text-xl font-bold text-[#ffd700]">
          Calendrier Islamique
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMonth}
            className="bg-[#00695c] text-white border-[#ffd700] hover:bg-[#ffd700] hover:text-[#004d40]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h3 className="text-lg font-bold">
            {islamicMonths[currentMonth - 1]} {currentYear}
          </h3>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMonth}
            className="bg-[#00695c] text-white border-[#ffd700] hover:bg-[#ffd700] hover:text-[#004d40]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Days of week headers */}
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold p-1 text-[#ffd700]">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg ${
                day === null
                  ? ""
                  : isCurrentDay(day)
                    ? "bg-[#ffd700] text-[#004d40] font-bold"
                    : "bg-[#00695c] hover:bg-[#00695c]/80"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Important dates */}
        <div className="mt-4 p-2 bg-[#004d40] rounded-lg">
          <h4 className="font-bold text-[#ffd700] mb-2">Dates Importantes:</h4>
          <ul className="text-sm space-y-1">
            <li>• 1 Ramadan: Début du Ramadan</li>
            <li>• 27 Ramadan: Laylat al-Qadr (estimé)</li>
            <li>• 1 Shawwal: Aïd al-Fitr</li>
            <li>• 10 Dhu al-Hijjah: Aïd al-Adha</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
