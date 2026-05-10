import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text grid grid-cols-1 md:grid-cols-[14rem_1fr] xl:grid-cols-[14rem_1fr_18rem]">
      
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-w-0 px-4 md:px-8 lg:px-10 pt-24 pb-10">
        <Outlet />
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden xl:block">
        <PromoSidebar />
      </aside>

    </div>
  );
}