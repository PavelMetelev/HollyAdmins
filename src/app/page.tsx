import AdminForm from "@/components/AdminForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
      {/* Фоновый градиент вместо картинки (сработает везде) */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#0f172a_100%)]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 transform -rotate-3 border-2 border-indigo-400">
            <span className="text-white font-black text-2xl tracking-tighter">AHK HELPER</span>
          </div>
        </div>
        
        <AdminForm />
        
        <div className="mt-8 text-center text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} AHK Admin Helper. Все права защищены.
        </div>
      </div>
    </main>
  );
}
