import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Sidebar />

      <main className="pl-0 md:pl-56 xl:pr-64 px-4 md:px-8 lg:px-10 pt-24 pb-10">
        <Outlet />
      </main>

      <PromoSidebar />
    </div>
  );
}