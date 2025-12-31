"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function HasilContent() {
  const searchParams = useSearchParams();
  const [teks, setTeks] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const result = searchParams.get("result");
    if (result) {
      setTeks(decodeURIComponent(result));
    } else {
      setTeks("Hasil refleksi Anda akan ditampilkan di sini...");
    }
    setLoading(false);
  }, [searchParams]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 -right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl w-full space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-4xl mb-3"
            >
              ✨
            </motion.div>
          </div>
          <div>
            <span className="text-xs md:text-sm font-semibold text-amber-400 tracking-widest block mb-3">
              REFLEKSI AKHIR TAHUN
            </span>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-orange-100 to-amber-300 bg-clip-text text-transparent leading-tight mb-2">
              Selamat Datang, 2026
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Narasi penutup tahun Anda telah hadir
            </p>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-950/20 via-slate-800/40 to-orange-950/20 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl shadow-amber-950/20"
        >
          {/* Decorative line */}
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto" />

          {loading ? (
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="space-y-4"
            >
              <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-full" />
              <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-5/6" />
              <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-4/5" />
              <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-full mt-6" />
              <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-3/4" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl leading-relaxed text-gray-50 whitespace-pre-wrap font-light tracking-wide">
                {teks}
              </p>
              <div className="border-t border-amber-500/20 pt-6 flex items-center justify-between text-xs text-gray-500">
                <span>✓ Refleksi Anda</span>
                <span>2025 → 2026</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <p className="text-center text-sm text-gray-400">
            Bagikan refleksimu dengan orang-orang terdekat
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const text = encodeURIComponent(
                  `Refleksi 2025 saya:\n\n${teks}\n\nBagikan refleksimu juga di Goodbye 2025 💫`
                );
                window.open(`https://wa.me/?text=${text}`, "_blank");
              }}
              className="py-3 px-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-semibold transition duration-300 shadow-lg shadow-green-500/20 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span className="text-lg">💬</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.button>

            {/* Facebook */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const url = encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                );
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                  "_blank",
                  "width=600,height=400"
                );
              }}
              className="py-3 px-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition duration-300 shadow-lg shadow-blue-500/20 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span className="text-lg">f</span>
              <span className="hidden sm:inline">Facebook</span>
            </motion.button>

            {/* Instagram */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleCopy(
                  `Refleksi 2025 saya:\n\n${teks}\n\nBagikan refleksimu juga di Goodbye 2025 💫`
                );
              }}
              className="py-3 px-4 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl font-semibold transition duration-300 shadow-lg shadow-pink-500/20 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span className="text-lg">📷</span>
              <span className="hidden sm:inline">Instagram</span>
            </motion.button>

            {/* Copy */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCopy(teks)}
              className="py-3 px-4 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl font-semibold transition duration-300 shadow-lg shadow-amber-500/20 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span className="text-lg">{copied ? "✓" : "📋"}</span>
              <span className="hidden sm:inline">{copied ? "Disalin" : "Salin"}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4 pt-4"
        >
          <Link href="/refleksi">
            <button className="w-full py-3 px-6 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl font-semibold transition duration-300 text-sm">
              ← Buat Refleksi Baru
            </button>
          </Link>

          <p className="text-center text-xs text-gray-500">
            Terima kasih telah melewati 2025 dengan kehadiran diri yang jujur dan penuh makna.
          </p>

          <p className="text-center text-xs text-gray-600 border-t border-slate-700/50 pt-4 mt-4">
            Developer by <span className="text-amber-400 font-semibold">Wandy</span>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function Hasil() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
      }
    >
      <HasilContent />
    </Suspense>
  );
}
