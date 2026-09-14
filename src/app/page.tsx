import AdminForm from "@/components/AdminForm";

export default function Home() {
  return (
    // Мы убрали все дополнительные фоны здесь, чтобы видеть только картинку из CSS
    <main className="min-h-screen flex items-center justify-center p-4">
      
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 transform -rotate-3 border-2 border-indigo-400">
            <span className="text-white font-black text-2xl tracking-tighter text-center block w-full uppercase">
              AHK HELPER
            </span>
          </div>
        </div>
        
        <AdminForm />
        
        <div className="mt-8 text-center text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          &copy; {new Date().getFullYear()} AHK Admin Helper. Все права защищены.
        </div>
      </div>
    </main>
  );
}
