import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text pt-14">
      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_18rem]">
        <aside className="hidden md:block sticky top-14 h-[calc(100vh-56px)] overflow-hidden">
          <Sidebar />
        </aside>

        <main className="min-w-0 px-4 py-8 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        <aside className="hidden xl:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-l border-brand-border bg-brand-bg custom-scrollbar">
          <PromoSidebar />
        </aside>
      </div>
    </div>
  );
}