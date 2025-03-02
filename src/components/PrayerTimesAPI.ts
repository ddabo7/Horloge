// This is a mock API service for prayer times
// In a real application, you would connect to an actual prayer times API
// such as Aladhan API (https://aladhan.com/prayer-times-api)

export interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
}

export interface PrayerTimesResponse {
  date: string;
  islamicDate: string;
  prayerTimes: PrayerTime[];
}

// Mock data for different cities
const prayerTimesByCity: Record<string, PrayerTimesResponse> = {
  Paris: {
    date: new Date().toLocaleDateString("fr-FR"),
    islamicDate: "15 Sha'ban 1445",
    prayerTimes: [
      { name: "Fajr", arabicName: "الفجر", time: "05:30" },
      { name: "Dhuhr", arabicName: "الظهر", time: "12:45" },
      { name: "Asr", arabicName: "العصر", time: "16:15" },
      { name: "Maghrib", arabicName: "المغرب", time: "19:30" },
      { name: "Isha", arabicName: "العشاء", time: "21:00" },
    ],
  },
  Lyon: {
    date: new Date().toLocaleDateString("fr-FR"),
    islamicDate: "15 Sha'ban 1445",
    prayerTimes: [
      { name: "Fajr", arabicName: "الفجر", time: "05:35" },
      { name: "Dhuhr", arabicName: "الظهر", time: "12:50" },
      { name: "Asr", arabicName: "العصر", time: "16:20" },
      { name: "Maghrib", arabicName: "المغرب", time: "19:35" },
      { name: "Isha", arabicName: "العشاء", time: "21:05" },
    ],
  },
  Marseille: {
    date: new Date().toLocaleDateString("fr-FR"),
    islamicDate: "15 Sha'ban 1445",
    prayerTimes: [
      { name: "Fajr", arabicName: "الفجر", time: "05:40" },
      { name: "Dhuhr", arabicName: "الظهر", time: "12:55" },
      { name: "Asr", arabicName: "العصر", time: "16:25" },
      { name: "Maghrib", arabicName: "المغرب", time: "19:40" },
      { name: "Isha", arabicName: "العشاء", time: "21:10" },
    ],
  },
};

// Function to get prayer times for a specific city
export const getPrayerTimes = (
  city: string = "Paris",
): Promise<PrayerTimesResponse> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(prayerTimesByCity[city] || prayerTimesByCity["Paris"]);
    }, 500);
  });
};

// Function to get available cities
export const getAvailableCities = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.keys(prayerTimesByCity));
    }, 300);
  });
};
