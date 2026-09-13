import AdminForm from "@/components/AdminForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-admin.jpg"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
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
