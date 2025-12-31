"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimezoneInfo {
  offset: number;
  name: string;
  label: string;
}

const getIndonesianTimezone = (): TimezoneInfo => {
  const date = new Date();
  
  // Buat formatter untuk setiap timezone Indonesia
  const witFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jayapura",
  });
  const witTime = new Date(
    witFormatter.format(date).replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)\s([AP]M)/, 
    (match, month, day, year, hours, minutes, seconds, period) => {
      if (period === "PM" && hours !== "12") hours = String(parseInt(hours) + 12);
      if (period === "AM" && hours === "12") hours = "00";
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}`;
    })
  ).getTime();
  const witOffset = (witTime - date.getTime()) / (1000 * 60 * 60);

  const witaFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar",
  });
  const witaTime = new Date(
    witaFormatter.format(date).replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)\s([AP]M)/, 
    (match, month, day, year, hours, minutes, seconds, period) => {
      if (period === "PM" && hours !== "12") hours = String(parseInt(hours) + 12);
      if (period === "AM" && hours === "12") hours = "00";
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}`;
    })
  ).getTime();
  const witaOffset = (witaTime - date.getTime()) / (1000 * 60 * 60);

  const wibFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
  });
  const wibTime = new Date(
    wibFormatter.format(date).replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)\s([AP]M)/, 
    (match, month, day, year, hours, minutes, seconds, period) => {
      if (period === "PM" && hours !== "12") hours = String(parseInt(hours) + 12);
      if (period === "AM" && hours === "12") hours = "00";
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}`;
    })
  ).getTime();
  const wibOffset = (wibTime - date.getTime()) / (1000 * 60 * 60);

  // Deteksi timezone lokal user
  const userOffset = -date.getTimezoneOffset() / 60;

  // Cari yang paling dekat dengan timezone user
  const timezones = [
    { offset: 9, name: "WIT", label: "Indonesia Timur", actualOffset: witOffset },
    { offset: 8, name: "WITA", label: "Indonesia Tengah", actualOffset: witaOffset },
    { offset: 7, name: "WIB", label: "Indonesia Barat", actualOffset: wibOffset },
  ];

  const closest = timezones.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.actualOffset - userOffset);
    const currDiff = Math.abs(curr.actualOffset - userOffset);
    return currDiff < prevDiff ? curr : prev;
  });

  return {
    offset: closest.offset,
    name: closest.name,
    label: closest.label,
  };
};

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [timezoneInfo, setTimezoneInfo] = useState<TimezoneInfo>({
    offset: 7,
    name: "WIB",
    label: "Indonesia Barat",
  });

  useEffect(() => {
    setMounted(true);
    const tz = getIndonesianTimezone();
    setTimezoneInfo(tz);

    const updateCountdown = () => {
      const tz = getIndonesianTimezone();
      const now = new Date();
      const offset = tz.offset * 60 * 60 * 1000;
      const localTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + offset;
      const newYear = new Date("2026-01-01T00:00:00").getTime() + (new Date("2026-01-01T00:00:00").getTimezoneOffset() * 60 * 1000) + offset;
      const distance = newYear - localTime;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const CountdownItem = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-xl p-3 md:p-4 min-w-16 md:min-w-20">
        <p className="text-2xl md:text-3xl font-bold text-amber-300">
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <p className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center space-y-8 px-6 relative z-10 max-w-2xl"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block"
          >
            <span className="text-sm font-semibold text-amber-400 tracking-widest">
              REFLEKSI AKHIR TAHUN
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-orange-100 to-amber-300 bg-clip-text text-transparent">
            Goodbye 2025
          </h1>
          <p className="text-gray-400 text-lg">
            Sambut 2026 dengan Hati yang Lapang
          </p>
        </div>

        {/* Countdown */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-950/30 via-slate-800/40 to-orange-950/30 backdrop-blur border border-amber-500/30 rounded-2xl p-6 md:p-8"
          >
            <p className="text-sm text-gray-400 mb-4">Waktu menjelang 2026 ({timezoneInfo.name} - {timezoneInfo.label})</p>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              <CountdownItem value={countdown.days} label="Hari" />
              <CountdownItem value={countdown.hours} label="Jam" />
              <CountdownItem value={countdown.minutes} label="Menit" />
              <CountdownItem value={countdown.seconds} label="Detik" />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur border border-slate-700/30 rounded-2xl p-8 space-y-6"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            Sebelum 2026 dimulai, luangkan waktu sejenak untuk menutup tahun ini dengan tenang dan penuh gratitude.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">✨</span>
              <p className="text-sm">Refleksikan hal yang patut disyukuri</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">🪶</span>
              <p className="text-sm">Lepaskan beban yang tidak perlu dibawa</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">💫</span>
              <p className="text-sm">Terima narasi penutup tahun mu</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/refleksi">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition duration-300 transform hover:scale-105 w-full">
              Mulai Refleksi
            </button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-gray-500 pt-1"
        >
          Waktu tempuh: ~5 menit | Refleksi pribadi & aman
        </motion.p>
         <p className="text-center text-xs text-gray-600 border-t border-slate-700/50 pt-4 mt-4">
            Developer by <span className="text-amber-400 font-semibold">Wandy</span>
          </p>
      </motion.div>
    </main>
  );
}
