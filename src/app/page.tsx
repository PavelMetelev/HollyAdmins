import AdminForm from "@/components/AdminForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHK Admin Helper",
  description: "Система выдачи наказаний",
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* 
         Здесь больше нет картинок и градиентов, 
         теперь всё берется из globals.css 
      */}
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 transform -rotate-3 border-2 border-indigo-400">
            <span className="text-white font-black text-2xl tracking-tighter text-center block w-full uppercase">
              AHK HELPER
            </span>
          </div>
        </div>
        
        <AdminForm />
        
        <div className="mt-8 text-center text-white/70 text-sm font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          &copy; {new Date().getFullYear()} AHK Admin Helper. Все права защищены.
        </div>
      </div>
    </main>
  );
}
