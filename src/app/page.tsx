import AdminForm from "@/components/AdminForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
      {/* Картинка из интернета - сработает сразу везде */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 transform -rotate-3 border-2 border-indigo-400">
            <span className="text-white font-black text-2xl tracking-tighter text-center block w-full">AHK HELPER</span>
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
