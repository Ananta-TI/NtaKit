import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text grid grid-cols-1 md:grid-cols-[14rem_1fr] xl:grid-cols-[14rem_1fr_18rem]">
      
      {/* LEFT SIDEBAR - Dibuat sticky agar diam saat di-scroll */}
      <aside className="hidden md:block sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT - Mengisi ruang 1fr secara penuh */}
      <main className="min-w-0 px-4 sm:px-6 md:px-8 lg:px-12 pt-24 pb-12 w-full">
        <Outlet />
      </main>

      {/* RIGHT SIDEBAR - Dibuat sticky */}
      <aside className="hidden xl:block sticky top-0 h-screen overflow-y-auto">
        <PromoSidebar />
      </aside>

    </div>
  );
}