import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { syukur, lepas } = await req.json();

  const prompt = `
Kamu adalah narator yang tenang dan penuh empati.

Tugasmu:
Buat refleksi singkat untuk menutup tahun 2025
dan menyambut 2026 dengan lembut.

Hal yang disyukuri:
${syukur}

Hal yang dilepaskan:
${lepas}

Gaya bahasa:
- Hangat
- Jujur
- Sederhana
- Tidak berlebihan
- Emosional tapi tenang

Gunakan Bahasa Indonesia.
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const response = completion.choices[0]?.message?.content || "";

  return NextResponse.json({ teks: response });
}
