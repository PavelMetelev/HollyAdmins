import AdminForm from "@/components/AdminForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHK Admin Helper",
  description: "Система выдачи наказаний",
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* ФОНОВАЯ КАРТИНКА - САМЫЙ НАДЕЖНЫЙ СПОСОБ */}
      <div className="fixed inset-0 z-0">
        <img
          src="/bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ backgroundColor: "#0f172a" }} // Запасной цвет, если картинка не загрузится
        />
        {/* Затемнение на 40%, чтобы форма была четкой */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ФОРМА (поверх фона) */}
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg border-2 border-indigo-400 transform -rotate-3">
            <span className="text-white font-black text-2xl uppercase tracking-tighter">
              AHK HELPER
            </span>
          </div>
        </div>
        
        <AdminForm />
        
        <div className="mt-8 text-center text-white/70 text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          &copy; {new Date().getFullYear()} AHK Admin Helper. Все права защищены.
        </div>
      </div>
    </main>
  );
}
