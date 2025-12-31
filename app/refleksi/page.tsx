"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Refleksi() {
  const router = useRouter();
  const [syukur, setSyukur] = useState("");
  const [lepas, setLepas] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!syukur.trim() || !lepas.trim()) {
      alert("Isi kedua field terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syukur, lepas }),
      });

      if (!res.ok) {
        throw new Error("Gagal generate refleksi");
      }

      const data = await res.json();
      const params = new URLSearchParams({
        syukur,
        lepas,
        result: data.teks,
      });
      router.push(`/hasil?${params}`);
    } catch (error) {
      alert("Terjadi kesalahan: " + error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-semibold text-amber-400 tracking-widest"
          >
            LANGKAH PERTAMA
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold">Refleksi 2025</h2>
          <p className="text-gray-400 mt-2">
            Sebelum bergerak maju, mari kita lihat ke belakang dengan tenang
          </p>
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 md:p-10 space-y-8"
        >
          {/* Syukur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <label className="block text-lg font-semibold text-amber-300">
              ✨ Satu hal yang kamu syukuri dari 2025
            </label>
            <textarea
              value={syukur}
              onChange={(e) => setSyukur(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-900/50 border border-slate-600 p-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none disabled:opacity-50"
              rows={4}
              placeholder="Aku bersyukur karena…"
            />
          </motion.div>

          {/* Lepas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <label className="block text-lg font-semibold text-orange-300">
              🪶 Satu hal yang ingin kamu lepaskan
            </label>
            <textarea
              value={lepas}
              onChange={(e) => setLepas(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-900/50 border border-slate-600 p-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 resize-none disabled:opacity-50"
              rows={4}
              placeholder="Aku memilih untuk melepaskan…"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            {loading ? "Memproses..." : "Lihat Penutup 2025"}
          </motion.button>
        </motion.div>

        <p className="text-center text-sm text-gray-500">
          Refleksi ini pribadi dan aman 🔐
        </p>
      </motion.div>
    </main>
  );
}
