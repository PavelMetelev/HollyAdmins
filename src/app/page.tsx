import AdminForm from "@/components/AdminForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-slate-900">
      {/* Background Image - Бронированный вариант */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 transform -rotate-3">
            <span className="text-white font-black text-2xl tracking-tighter">AHK HELPER</span>
          </div>
        </div>
        
        <AdminForm />
        
        <div className="mt-8 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} AHK Admin Helper. Все права защищены.
        </div>
      </div>
    </main>
  );
}
